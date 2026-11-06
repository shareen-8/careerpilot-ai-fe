
import {
    LayoutDashboard,
    Search,
    BriefcaseBusiness,
    FileText,
    Bookmark,
    Settings,
    Sparkles,
    X,
    LogOut,
  } from "lucide-react";
  
  const navigation = [
    {
      title: "Workspace",
      items: [
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "Find Jobs", icon: Search },
        { name: "My Applications", icon: BriefcaseBusiness },
        { name: "My Resume", icon: FileText },
        { name: "Saved Jobs", icon: Bookmark },
      ],
    },
    {
      title: "Preferences",
      items: [{ name: "Settings", icon: Settings }],
    },
  ];
  
  function Sidebar({ activePage, setActivePage, isOpen, onClose }) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={onClose}
          />
        )}
  
        <aside
          className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Sparkles size={22} />
              </div>
  
              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  CareerPilot
                </h1>
                <p className="text-xs text-slate-500">
                  AI Career Assistant
                </p>
              </div>
            </div>
  
            <button
              onClick={onClose}
              className="text-slate-500 lg:hidden"
            >
              <X size={22} />
            </button>
          </div>
  
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {navigation.map((section) => (
              <div key={section.title} className="mb-8">
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {section.title}
                </p>
  
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.name;
  
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          setActivePage(item.name);
                          onClose();
                        }}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                          isActive
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <Icon size={19} />
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
  
          <div className="border-t border-slate-100 p-4">
            <div className="rounded-xl bg-indigo-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-indigo-700">
                <Sparkles size={18} />
                <span className="text-sm font-semibold">
                  AI Career Assistant
                </span>
              </div>
  
              <p className="text-xs leading-5 text-slate-600">
                Let AI help you find opportunities that match your skills.
              </p>
  
              <button
                onClick={() => {
                  setActivePage("Find Jobs");
                  onClose();
                }}
                className="mt-3 text-xs font-semibold text-indigo-700 hover:underline"
              >
                Explore Jobs →
              </button>
            </div>
  
            <div className="mt-4 flex items-center gap-3 px-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                SK
              </div>
  
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  Job Seeker
                </p>
                <p className="text-xs text-slate-500">Free Plan</p>
              </div>
  
              <LogOut size={17} className="text-slate-400" />
            </div>
          </div>
        </aside>
      </>
    );
  }
  
  export default Sidebar;
  