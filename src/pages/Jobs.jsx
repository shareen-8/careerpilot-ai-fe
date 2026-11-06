
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Clock,
  Bookmark,
  SlidersHorizontal,
  ExternalLink,
  Sparkles,
  X,
} from "lucide-react";

const jobData = [
  {
    id: 1,
    title: "MERN Stack Developer",
    company: "TechNova Solutions",
    location: "Abu Dhabi",
    type: "Full-time",
    experience: "Mid-level",
    salary: "AED 6,000 - 9,000",
    posted: "2 days ago",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    description:
      "Build scalable web applications using the MERN stack and develop REST APIs.",
  },
  {
    id: 2,
    title: "React Developer",
    company: "Digital Orbit",
    location: "Dubai",
    type: "Full-time",
    experience: "Junior",
    salary: "AED 4,000 - 6,000",
    posted: "1 day ago",
    skills: ["React", "JavaScript", "Tailwind CSS", "Redux"],
    description:
      "Develop responsive frontend applications and reusable React components.",
  },
  {
    id: 3,
    title: "Node.js Developer",
    company: "CloudBridge Technologies",
    location: "Remote",
    type: "Remote",
    experience: "Mid-level",
    salary: "AED 7,000 - 10,000",
    posted: "3 days ago",
    skills: ["Node.js", "Express", "MongoDB", "REST API"],
    description:
      "Develop backend services, integrate databases, and maintain APIs.",
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "WebSphere Technologies",
    location: "Abu Dhabi",
    type: "Full-time",
    experience: "Senior",
    salary: "AED 10,000 - 14,000",
    posted: "Today",
    skills: ["React", "Node.js", "AWS", "MySQL"],
    description:
      "Lead full-stack development and collaborate with product teams.",
  },
  {
    id: 5,
    title: "Frontend Developer",
    company: "PixelCraft",
    location: "Sharjah",
    type: "Contract",
    experience: "Junior",
    salary: "AED 3,500 - 5,000",
    posted: "4 days ago",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    description:
      "Create modern, accessible, and responsive web interfaces.",
  },
  {
    id: 6,
    title: "MERN Stack Engineer",
    company: "InnovateTech",
    location: "Dubai",
    type: "Full-time",
    experience: "Mid-level",
    salary: "AED 7,000 - 11,000",
    posted: "5 days ago",
    skills: ["MongoDB", "Express", "React", "Node.js"],
    description:
      "Work on end-to-end web application development and cloud deployment.",
  },
];

function Jobs() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [jobType, setJobType] = useState("All Types");
  const [experience, setExperience] = useState("All Levels");
  const [savedJobs, setSavedJobs] = useState([]);

  const filteredJobs = useMemo(() => {
    return jobData.filter((job) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchText)
        );

      const matchesLocation =
        location === "All Locations" ||
        job.location === location;

      const matchesType =
        jobType === "All Types" ||
        job.type === jobType;

      const matchesExperience =
        experience === "All Levels" ||
        job.experience === experience;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesExperience
      );
    });
  }, [search, location, jobType, experience]);

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
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <section>
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-indigo-600" />
          <span className="text-sm font-semibold text-indigo-600">
            AI Job Discovery
          </span>
        </div>

        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Find Your Next Opportunity
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Discover jobs that match your skills and career goals.
        </p>
      </section>

      {/* Search */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search job title, company, or skills..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-500"
          >
            <option>All Locations</option>
            <option>Abu Dhabi</option>
            <option>Dubai</option>
            <option>Sharjah</option>
            <option>Remote</option>
          </select>

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-500"
          >
            <option>All Types</option>
            <option>Full-time</option>
            <option>Remote</option>
            <option>Contract</option>
          </select>

          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-500"
          >
            <option>All Levels</option>
            <option>Junior</option>
            <option>Mid-level</option>
            <option>Senior</option>
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            <SlidersHorizontal
              size={14}
              className="mr-1 inline"
            />
            Use filters to narrow your search.
          </p>

          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
          >
            <X size={14} />
            Clear filters
          </button>
        </div>
      </section>

      {/* Results heading */}
      <section className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Available Opportunities
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {filteredJobs.length} jobs found
          </p>
        </div>

        <div className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700">
          {savedJobs.length} Saved
        </div>
      </section>

      {/* Job cards */}
      <section className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const isSaved = savedJobs.includes(job.id);

            return (
              <article
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <BriefcaseBusiness size={23} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900">
                        {job.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {job.company}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    aria-label={isSaved ? "Unsave job" : "Save job"}
                    className={`rounded-lg border p-2 transition ${
                      isSaved
                        ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                        : "border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <Bookmark
                      size={19}
                      fill={isSaved ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {job.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {job.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <BriefcaseBusiness size={14} />
                    {job.experience}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {job.posted}
                  </span>
                </div>

                <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <p className="text-sm font-bold text-slate-900">
                    {job.salary}
                  </p>

                  <button
                    onClick={() =>
                      alert("Job application functionality will be added later.")
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    View Opportunity
                    <ExternalLink size={15} />
                  </button>
                </div>
              </article>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
            <Search
              size={35}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-bold text-slate-800">
              No jobs found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-4 text-sm font-semibold text-indigo-600 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>Development notice:</strong> These are demonstration
        job listings. We will integrate live job data in a later phase.
      </div>
    </div>
  );
}

export default Jobs;
