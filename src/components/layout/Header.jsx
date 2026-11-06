
import {
    Menu,
    Bell,
    Search,
    Sparkles,
  } from "lucide-react";
  
  function Header({ onMenuClick, activePage }) {
    return (
      <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>
  
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {activePage}
            </h2>
  
            <p className="hidden text-sm text-slate-500 sm:block">
              Your career journey starts here.
            </p>
          </div>
        </div>
  
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden items-center gap-2 rounded-full bg-indigo-50 px-3 py-2 sm:flex">
            <Sparkles size={16} className="text-indigo-600" />
            <span className="text-xs font-medium text-indigo-700">
              AI-powered career platform
            </span>
          </div>
  
          <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100">
            <Bell size={21} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
  
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
            SK
          </div>
        </div>
      </header>
    );
  }
  
  export default Header;
  