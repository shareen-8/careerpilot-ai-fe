
import { useState } from "react";
import {
  LayoutDashboard,
  Search,
  FileText,
  Bookmark,
  Briefcase,
  Settings,
  Bell,
  Plus,
  ArrowUpRight,
  MapPin,
  Clock3,
  Sparkles,
  ChevronDown,
  TrendingUp,
  Target,
  Send,
  CheckCircle2,
  Menu,
  X,
  SlidersHorizontal,
  ExternalLink,
} from "lucide-react";

const jobs = [
  {
    company: "TechNova Solutions",
    role: "MERN Stack Developer",
    location: "Abu Dhabi, UAE",
    type: "Full-time",
    salary: "AED 8k–12k",
    match: 96,
    color: "bg-blue-100 text-blue-700",
    initials: "TN",
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    company: "Digital Orbit",
    role: "Full Stack Developer",
    location: "Dubai, UAE",
    type: "Full-time",
    salary: "AED 7k–10k",
    match: 89,
    color: "bg-purple-100 text-purple-700",
    initials: "DO",
    skills: ["JavaScript", "Express", "AWS"],
  },
  {
    company: "CloudBridge Technologies",
    role: "React Developer",
    location: "Remote",
    type: "Remote",
    salary: "AED 6k–9k",
    match: 84,
    color: "bg-emerald-100 text-emerald-700",
    initials: "CB",
    skills: ["React", "Redux", "Tailwind"],
  },
];

const applications = [
  {
    company: "InnovateTech",
    role: "MERN Developer",
    date: "Nov 04, 2026",
    status: "Interview",
    color: "text-blue-700 bg-blue-50",
    initials: "IT",
  },
  {
    company: "WebSolutions",
    role: "Frontend Developer",
    date: "Nov 02, 2026",
    status: "Under Review",
    color: "text-amber-700 bg-amber-50",
    initials: "WS",
  },
  {
    company: "NextGen Digital",
    role: "Full Stack Developer",
    date: "Oct 29, 2026",
    status: "Applied",
    color: "text-purple-700 bg-purple-50",
    initials: "NG",
  },
];

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Find Jobs", icon: Search },
  { name: "My Applications", icon: Briefcase },
  { name: "My Resume", icon: FileText },
  { name: "Saved Jobs", icon: Bookmark },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");

  const filteredJobs = jobs.filter((job) =>
    `${job.role} ${job.company} ${job.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-800">

      {/* Mobile overlay */}
      {mobileMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-100 bg-white transition-transform duration-300 lg:translate-x-0 ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Sparkles size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                CareerPilot
              </h1>
              <p className="text-xs text-slate-400">AI Career Assistant</p>
            </div>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setMobileMenu(false)}
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-4 pt-8">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = activePage === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActivePage(item.name);
                    setMobileMenu(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={19} />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-8 px-4">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Preferences
          </p>

          <button
            onClick={() => setActivePage("Settings")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
              activePage === "Settings"
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Settings size={19} />
            Settings
          </button>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-5 text-white">
            <Sparkles size={22} />
            <h3 className="mt-4 font-semibold">AI Career Assistant</h3>
            <p className="mt-2 text-xs leading-5 text-indigo-100">
              Let AI help you find opportunities that match your skills.
            </p>
            <button
              onClick={() => setActivePage("Find Jobs")}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
            >
              Explore Jobs <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
              SK
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                Job Seeker
              </p>
              <p className="text-xs text-slate-400">Free Plan</p>
            </div>
            <ChevronDown size={17} className="text-slate-400" />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-h-screen lg:ml-64">

        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-100 bg-white/90 px-5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenu(true)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {activePage}
              </h2>
              <p className="hidden text-xs text-slate-400 sm:block">
                Your career journey starts here.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button className="relative rounded-xl border border-slate-100 p-2.5 text-slate-500 hover:bg-slate-50">
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
              SK
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] p-5 sm:p-8">

          {/* Welcome section */}
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  <Sparkles size={12} className="mr-1 inline" />
                  AI-powered career platform
                </span>
                <span className="text-xs text-slate-400">Demo data</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Welcome back!
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Discover opportunities and take the next step in your career.
              </p>
            </div>

            <button
              onClick={() => setActivePage("Find Jobs")}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
            >
              <Plus size={18} />
              Find New Jobs
            </button>
          </div>

          {/* Statistics */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {[
              {
                title: "Jobs Discovered",
                value: "128",
                subtitle: "Sample opportunities",
                icon: Search,
                color: "bg-blue-50 text-blue-600",
              },
              {
                title: "Average Match",
                value: "86%",
                subtitle: "Sample AI score",
                icon: Target,
                color: "bg-purple-50 text-purple-600",
              },
              {
                title: "Applications",
                value: "24",
                subtitle: "Sample applications",
                icon: Send,
                color: "bg-orange-50 text-orange-600",
              },
              {
                title: "Interviews",
                value: "05",
                subtitle: "Sample interviews",
                icon: CheckCircle2,
                color: "bg-emerald-50 text-emerald-600",
              },
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>
                    <div className={`rounded-xl p-3 ${stat.color}`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <h2 className="mt-4 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </h2>

                  <p className="mt-2 text-xs text-slate-400">
                    {stat.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* AI Resume Banner */}
          <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 p-6 text-white sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-sm font-medium text-indigo-100">
                  <Sparkles size={17} />
                  AI Resume Analysis
                </div>

                <h2 className="mt-3 text-2xl font-bold">
                  Make your resume stand out.
                </h2>

                <p className="mt-2 text-sm leading-6 text-indigo-100">
                  Upload your resume and let AI analyze your skills,
                  experience, and job compatibility.
                </p>

                <button
                  onClick={() => setActivePage("My Resume")}
                  className="mt-5 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
                >
                  Analyze My Resume <ArrowUpRight size={17} />
                </button>
              </div>

              <div className="hidden h-36 w-36 items-center justify-center rounded-full border border-white/20 bg-white/10 md:flex">
                <FileText size={70} strokeWidth={1.2} />
              </div>
            </div>
          </div>

          {/* Jobs and applications */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

            {/* Recommended Jobs */}
            <section className="xl:col-span-2">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Recommended Jobs
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Opportunities ranked by sample AI compatibility.
                  </p>
                </div>

                <button
                  onClick={() => setActivePage("Find Jobs")}
                  className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  View all <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3">
                <Search size={18} className="text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search jobs, companies or locations..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
                <SlidersHorizontal
                  size={18}
                  className="shrink-0 text-slate-400"
                />
              </div>

              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.company}
                    className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                      <div className="flex gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold ${job.color}`}
                        >
                          {job.initials}
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-900">
                            {job.role}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            {job.company}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <MapPin size={14} /> {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock3 size={14} /> {job.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                        <div className="rounded-xl bg-emerald-50 px-3 py-2 text-center">
                          <p className="text-xl font-bold text-emerald-600">
                            {job.match}%
                          </p>
                          <p className="text-[10px] font-semibold text-emerald-700">
                            AI MATCH
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                        <span className="self-center text-xs font-medium text-slate-500">
                          {job.salary}
                        </span>
                      </div>

                      <button className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                        View Details <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {filteredJobs.length === 0 && (
                  <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center text-sm text-slate-500">
                    No matching jobs found.
                  </div>
                )}
              </div>
            </section>

            {/* Recent Applications */}
            <section>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Recent Applications
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Your application activity.
                  </p>
                </div>

                <button
                  onClick={() => setActivePage("My Applications")}
                  className="text-sm font-semibold text-indigo-600"
                >
                  View all
                </button>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="space-y-6">
                  {applications.map((application, index) => (
                    <div key={application.company}>
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-600">
                          {application.initials}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-semibold text-slate-800">
                            {application.role}
                          </h3>
                          <p className="mt-1 text-xs text-slate-400">
                            {application.company}
                          </p>

                          <span
                            className={`mt-3 inline-flex rounded-lg px-2.5 py-1.5 text-xs font-medium ${application.color}`}
                          >
                            {application.status}
                          </span>

                          <p className="mt-2 text-xs text-slate-400">
                            {application.date}
                          </p>
                        </div>
                      </div>

                      {index !== applications.length - 1 && (
                        <div className="mt-5 border-b border-slate-100" />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActivePage("My Applications")}
                  className="mt-6 w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Manage Applications
                </button>
              </div>

              {/* Career Tip */}
              <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
                <div className="flex items-center gap-2 text-indigo-700">
                  <TrendingUp size={19} />
                  <h3 className="font-bold">Career Tip</h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-indigo-900">
                  Customize your resume for each job application. Highlight
                  relevant skills and achievements to improve your chances.
                </p>

                <button
                  onClick={() => setActivePage("My Resume")}
                  className="mt-4 text-sm font-bold text-indigo-700 hover:text-indigo-900"
                >
                  Improve Resume <ArrowUpRight size={14} className="inline" />
                </button>
              </div>
            </section>
          </div>

          <footer className="mt-10 border-t border-slate-200 py-6 text-center text-xs text-slate-400">
            © 2026 CareerPilot AI. Your intelligent career companion.
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
