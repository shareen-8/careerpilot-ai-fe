
import {
    BriefcaseBusiness,
    FileText,
    Send,
    Target,
    ArrowUpRight,
    Sparkles,
    MapPin,
    Clock,
  } from "lucide-react";
  
  const stats = [
    {
      title: "Jobs Discovered",
      value: "128",
      description: "Opportunities found",
      icon: BriefcaseBusiness,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Applications Sent",
      value: "12",
      description: "Jobs applied to",
      icon: Send,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Resume Score",
      value: "85%",
      description: "Based on sample data",
      icon: FileText,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Average Match",
      value: "78%",
      description: "Across recommended jobs",
      icon: Target,
      color: "bg-orange-50 text-orange-600",
    },
  ];
  
  const jobs = [
    {
      company: "TechNova Solutions",
      role: "MERN Stack Developer",
      location: "Abu Dhabi, UAE",
      type: "Full-time",
      match: 94,
    },
    {
      company: "Digital Orbit",
      role: "React Developer",
      location: "Dubai, UAE",
      type: "Full-time",
      match: 88,
    },
    {
      company: "CloudBridge Technologies",
      role: "Node.js Developer",
      location: "Remote",
      type: "Remote",
      match: 82,
    },
  ];
  
  function Dashboard({ setActivePage }) {
    return (
      <div className="space-y-8">
        {/* Welcome section */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back!
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Discover opportunities and take the next step in your career.
            </p>
          </div>
  
          <button
            onClick={() => setActivePage("Find Jobs")}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            <SearchIcon />
            Find New Jobs
          </button>
        </section>
  
        {/* Statistics */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
  
            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon size={22} />
                  </div>
  
                  <ArrowUpRight size={18} className="text-slate-400" />
                </div>
  
                <p className="mt-5 text-sm text-slate-500">
                  {stat.title}
                </p>
  
                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  {stat.value}
                </h3>
  
                <p className="mt-1 text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </section>
  
        {/* Resume banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white sm:p-8">
          <div className="relative z-10 max-w-xl">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={19} />
              <span className="text-sm font-medium text-indigo-100">
                AI Resume Analysis
              </span>
            </div>
  
            <h2 className="text-xl font-bold sm:text-2xl">
              Make your resume stand out
            </h2>
  
            <p className="mt-2 text-sm leading-6 text-indigo-100">
              Upload your resume and let AI analyze your skills,
              experience, and job compatibility.
            </p>
  
            <button
              onClick={() => setActivePage("My Resume")}
              className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
            >
              Analyze My Resume →
            </button>
          </div>
  
          <Sparkles
            size={150}
            className="absolute -bottom-10 -right-5 text-white/10"
          />
        </section>
  
        {/* Recommended jobs */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recommended Jobs
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Sample opportunities based on your profile.
              </p>
            </div>
  
            <button
              onClick={() => setActivePage("Find Jobs")}
              className="text-sm font-semibold text-indigo-600 hover:underline"
            >
              View all
            </button>
          </div>
  
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job.company}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <BriefcaseBusiness size={21} />
                  </div>
  
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    {job.match}% Match
                  </span>
                </div>
  
                <h3 className="mt-5 font-bold text-slate-900">
                  {job.role}
                </h3>
  
                <p className="mt-1 text-sm text-slate-500">
                  {job.company}
                </p>
  
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {job.location}
                  </span>
  
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {job.type}
                  </span>
                </div>
  
                <button
                  onClick={() => setActivePage("Find Jobs")}
                  className="mt-5 w-full rounded-xl border border-indigo-200 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
                >
                  Explore Job
                </button>
              </div>
            ))}
          </div>
        </section>
  
        {/* Demo notice */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Demo data:</strong> The jobs, statistics, and match
          percentages shown here are sample data. We will connect
          real job sources and AI matching later.
        </div>
      </div>
    );
  }
  
  function SearchIcon() {
    return <BriefcaseBusiness size={17} />;
  }
  
  export default Dashboard;
  