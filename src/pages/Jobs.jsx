
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Clock,
  Bookmark,
  ExternalLink,
  Sparkles,
  X,
  LoaderCircle,
  AlertCircle,
  RefreshCw,
  CheckCircle,
  FileText,
  Target,
} from "lucide-react";

import api from "../services/api";

const knownSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "React Native",
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Redux",
  "Next.js",
  "NestJS",
  "Python",
  "Java",
  "PHP",
  "Laravel",
  "AWS",
  "Firebase",
  "Git",
  "Docker",
  "REST API",
  "GraphQL",
  "Mongoose",
  "Redis",
  "Jest",
  "Cypress",
  "Vue.js",
  "Angular",
  "Bootstrap",
  "Material UI",
];

const extractSkills = (description = "") => {
  const text = description.toLowerCase();

  return knownSkills.filter((skill) => {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(
      `(^|[^a-z0-9+#.])${escaped.toLowerCase()}([^a-z0-9+#.]|$)`,
      "i"
    );

    return regex.test(text);
  });
};

const getExperienceLevel = (description = "") => {
  const range = description.match(
    /(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*\+?\s*years?/i
  );

  if (range) {
    const maximumYears = Number(range[2]);

    if (maximumYears <= 2) return "Junior";
    if (maximumYears <= 5) return "Mid-level";
    return "Senior";
  }

  const single = description.match(
    /(\d+(?:\.\d+)?)\s*\+?\s*years?\s+(?:of\s+)?(?:relevant\s+)?experience/i
  );

  if (single) {
    const years = Number(single[1]);

    if (years <= 2) return "Junior";
    if (years <= 5) return "Mid-level";
    return "Senior";
  }

  if (/junior|entry.level|fresher|graduate/i.test(description)) {
    return "Junior";
  }

  if (/senior|lead developer|principal developer/i.test(description)) {
    return "Senior";
  }

  if (/mid.level|intermediate/i.test(description)) {
    return "Mid-level";
  }

  return "Not specified";
};

const normalizeJob = (job) => {
  const description = job.description || "";

  let jobType = job.jobType || "Not specified";

  if (/دوام كامل|full.time|full time/i.test(jobType)) {
    jobType = "Full-time";
  } else if (/part.time|part time/i.test(jobType)) {
    jobType = "Part-time";
  } else if (/contract/i.test(jobType)) {
    jobType = "Contract";
  }

  if (job.isRemote) {
    jobType = "Remote";
  }

  return {
    id: String(job.id || `${job.title}-${job.company}`),
    title: job.title || "Untitled position",
    company: job.company || "Company not specified",
    location: job.location || "Location not specified",
    jobType,
    experience: getExperienceLevel(description),
    salary: job.salary || "Not disclosed",
    description,
    skills: extractSkills(description),
    url: job.url || "",
    postedAt: job.postedAt || "Recently posted",
    source: job.source || "Job provider",
    employerLogo: job.employerLogo || "",
  };
};

const getScoreStyle = (score) => {
  if (score >= 80) {
    return "bg-green-100 text-green-700";
  }

  if (score >= 60) {
    return "bg-blue-100 text-blue-700";
  }

  if (score >= 40) {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-red-100 text-red-700";
};

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [jobType, setJobType] = useState("All Types");
  const [experience, setExperience] = useState("All Levels");

  const [savedJobs, setSavedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [resumeText] = useState(
    () => localStorage.getItem("careerpilot_resume_text") || ""
  );

  const [matches, setMatches] = useState({});
  const [matchingLoading, setMatchingLoading] = useState(false);
  const [matchingError, setMatchingError] = useState("");

  // Fetch live jobs from the backend.
  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/jobs/search", {
          params: {
            keyword: search.trim(),
            location:
              location === "All Locations" ? "" : location,
            page,
          },
          signal: controller.signal,
        });

        const fetchedJobs = (response.data.jobs || []).map(normalizeJob);

        setJobs((previousJobs) =>
          page === 1
            ? fetchedJobs
            : [...previousJobs, ...fetchedJobs]
        );

        setNextPage(response.data.pagination?.nextPage ?? null);
      } catch (err) {
        if (err.name === "CanceledError" || err.name === "AbortError") {
          return;
        }

        console.error("Job search error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to fetch jobs. Please check your backend connection."
        );

        if (page === 1) {
          setJobs([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, location, page, refreshKey]);

  // Compare fetched jobs against the uploaded resume.
  useEffect(() => {
    const controller = new AbortController();

    const runMatching = async () => {
      if (!resumeText || jobs.length === 0) {
        setMatches({});
        return;
      }

      try {
        setMatchingLoading(true);
        setMatchingError("");

        const response = await api.post(
          "/jobs/match",
          {
            resumeText,
            jobs: jobs.map((job) => ({
              id: job.id,
              title: job.title,
              company: job.company,
              description: job.description,
            })),
          },
          {
            signal: controller.signal,
          }
        );

        const matchMap = {};

        (response.data.matches || []).forEach((match) => {
          if (match.jobId) {
            matchMap[String(match.jobId)] = match;
          }
        });

        setMatches(matchMap);
      } catch (err) {
        if (err.name === "CanceledError" || err.name === "AbortError") {
          return;
        }

        console.error("Job matching error:", err);

        setMatchingError(
          err.response?.data?.message ||
            "Unable to calculate job matches."
        );
      } finally {
        if (!controller.signal.aborted) {
          setMatchingLoading(false);
        }
      }
    };

    runMatching();

    return () => controller.abort();
  }, [jobs, resumeText]);

  // Apply job type, experience and text filters.
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        !searchText ||
        job.title.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchText)
        );

      const matchesType =
        jobType === "All Types" ||
        job.jobType.toLowerCase() === jobType.toLowerCase();

      const matchesExperience =
        experience === "All Levels" ||
        job.experience === experience;

      return matchesSearch && matchesType && matchesExperience;
    });
  }, [jobs, search, jobType, experience]);

  const toggleSaveJob = (jobId) => {
    setSavedJobs((previous) =>
      previous.includes(jobId)
        ? previous.filter((id) => id !== jobId)
        : [...previous, jobId]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("All Locations");
    setJobType("All Types");
    setExperience("All Levels");
    setPage(1);
  };

  const handleRetry = () => {
    setError("");
    setPage(1);
    setRefreshKey((previous) => previous + 1);
  };

  const handleLoadMore = () => {
    if (nextPage && !loading) {
      setPage(nextPage);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <div className="flex items-center gap-2 text-sm font-medium text-indigo-600">
          <Sparkles size={16} />
          AI Job Discovery
        </div>

        <h1 className="mt-2 text-2xl font-bold text-gray-900">
          Find Your Next Opportunity
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Discover live job opportunities and see how well they match your resume.
        </p>
      </div>

      {/* Resume connection status */}
      <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
        <div className="flex items-start gap-3">
          <FileText className="mt-1 text-indigo-600" size={21} />

          <div>
            <h3 className="font-semibold text-gray-900">
              Resume-based job matching
            </h3>

            {resumeText ? (
              <p className="mt-1 text-sm text-green-700">
                Your uploaded resume is connected. Jobs will be analyzed against its extracted text.
              </p>
            ) : (
              <p className="mt-1 text-sm text-gray-600">
                Upload and analyze your PDF in the My Resume section to see personalized job match scores.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
          <div className="relative lg:col-span-2">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={19}
            />

            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search job title, company or skill..."
              className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <select
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-indigo-500"
          >
            <option>All Locations</option>
            <option>Abu Dhabi</option>
            <option>Dubai</option>
            <option>Sharjah</option>
            <option>Remote</option>
          </select>

          <select
            value={jobType}
            onChange={(event) => setJobType(event.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-indigo-500"
          >
            <option>All Types</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Remote</option>
          </select>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <select
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          >
            <option>All Levels</option>
            <option>Junior</option>
            <option>Mid-level</option>
            <option>Senior</option>
          </select>

          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-indigo-600"
          >
            <X size={15} />
            Clear filters
          </button>

          <button
            onClick={handleRetry}
            disabled={loading}
            className="ml-auto flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={15} />
            Refresh jobs
          </button>
        </div>
      </div>

      {/* Results heading */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-semibold text-gray-900">
            Available Opportunities
          </h2>

          <p className="text-sm text-gray-500">
            {filteredJobs.length} jobs displayed
          </p>
        </div>

        {matchingLoading && resumeText && (
          <span className="flex items-center gap-2 text-sm text-indigo-600">
            <LoaderCircle className="animate-spin" size={16} />
            Calculating match scores...
          </span>
        )}
      </div>

      {/* Search error */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 text-red-600" size={20} />

          <div className="flex-1">
            <p className="font-medium text-red-800">
              Unable to load jobs
            </p>
            <p className="mt-1 text-sm text-red-700">{error}</p>

            <button
              onClick={handleRetry}
              className="mt-2 text-sm font-semibold text-red-700 underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Matching error */}
      {matchingError && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          {matchingError}
        </div>
      )}

      {/* Loading */}
      {loading && jobs.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-16">
          <LoaderCircle
            className="animate-spin text-indigo-600"
            size={32}
          />
          <p className="mt-3 text-sm text-gray-500">
            Finding live job opportunities...
          </p>
        </div>
      )}

      {/* Job cards */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const match = matches[job.id];

          return (
            <div
              key={job.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                {/* Company logo */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                  {job.employerLogo ? (
                    <img
                      src={job.employerLogo}
                      alt={`${job.company} logo`}
                      className="h-full w-full object-contain"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <BriefcaseBusiness
                      className="text-gray-400"
                      size={22}
                    />
                  )}
                </div>

                {/* Job details */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {job.title}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-gray-600">
                        {job.company}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      aria-label={
                        savedJobs.includes(job.id)
                          ? "Unsave job"
                          : "Save job"
                      }
                      className={`rounded-lg border p-2 transition ${
                        savedJobs.includes(job.id)
                          ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                          : "border-gray-200 text-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      <Bookmark
                        size={18}
                        fill={
                          savedJobs.includes(job.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  </div>

                  {/* Match score */}
                  {resumeText && (
                    <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-3">
                      {match ? (
                        <>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Target
                                className="text-indigo-600"
                                size={18}
                              />
                              <span className="text-sm font-semibold text-gray-800">
                                AI Job Match
                              </span>
                            </div>

                            {match.score !== null ? (
                              <span
                                className={`rounded-full px-3 py-1 text-sm font-bold ${getScoreStyle(
                                  match.score
                                )}`}
                              >
                                {match.score}% · {match.matchLevel}
                              </span>
                            ) : (
                              <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-600">
                                Insufficient information
                              </span>
                            )}
                          </div>

                          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div>
                              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-green-700">
                                <CheckCircle
                                  className="mr-1 inline"
                                  size={13}
                                />
                                Matched skills
                              </p>

                              <div className="flex flex-wrap gap-1.5">
                                {match.skills.matchedSkills.length > 0 ? (
                                  match.skills.matchedSkills.map((skill) => (
                                    <span
                                      key={skill}
                                      className="rounded-md bg-green-100 px-2 py-1 text-xs text-green-800"
                                    >
                                      {skill}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-xs text-gray-500">
                                    No matching skills detected
                                  </span>
                                )}
                              </div>
                            </div>

                            <div>
                              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-700">
                                <AlertCircle
                                  className="mr-1 inline"
                                  size={13}
                                />
                                Missing skills
                              </p>

                              <div className="flex flex-wrap gap-1.5">
                                {match.skills.missingSkills.length > 0 ? (
                                  match.skills.missingSkills.map((skill) => (
                                    <span
                                      key={skill}
                                      className="rounded-md bg-red-100 px-2 py-1 text-xs text-red-800"
                                    >
                                      {skill}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-xs text-gray-500">
                                    No missing skills detected
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <p className="mt-3 text-xs text-gray-600">
                            <strong>Experience:</strong>{" "}
                            {match.experience.status}
                            {match.experience.requiredMinimumYears !== null &&
                              ` (Required: ${match.experience.requiredMinimumYears}${
                                match.experience.requiredMaximumYears !== null
                                  ? `–${match.experience.requiredMaximumYears}`
                                  : "+"
                              } years)`}
                          </p>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <LoaderCircle
                            className="animate-spin"
                            size={16}
                          />
                          {matchingLoading
                            ? "Analyzing this job against your resume..."
                            : "Match analysis is not available yet."}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Job metadata */}
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={15} />
                      {job.location}
                    </span>

                    <span className="flex items-center gap-1">
                      <BriefcaseBusiness size={15} />
                      {job.jobType}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock size={15} />
                      {job.postedAt}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-gray-600">
                      {job.experience} experience
                    </span>

                    <span className="rounded-md bg-gray-100 px-2 py-1 text-gray-600">
                      {job.salary}
                    </span>
                  </div>

                  {/* Skills */}
                  {job.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.skills.slice(0, 8).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                    {job.description}
                  </p>

                  {/* Actions */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-gray-400">
                      Source: {job.source}
                    </span>

                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                      >
                        View Opportunity
                        <ExternalLink size={15} />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">
                        Application link unavailable
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {!loading && !error && filteredJobs.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-14 text-center">
          <Search className="mx-auto text-gray-300" size={36} />

          <h3 className="mt-3 font-semibold text-gray-800">
            No jobs found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filters.
          </p>

          <button
            onClick={clearFilters}
            className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Load more */}
      {nextPage && filteredJobs.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" size={17} />
                Loading...
              </>
            ) : (
              "Load More Jobs"
            )}
          </button>
        </div>
      )}

      <p className="text-center text-xs text-gray-400">
        Job listings are provided by JSearch. Availability and application
        details are subject to the original job provider.
      </p>
    </div>
  );
}
