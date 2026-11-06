
import { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Resume from "./pages/Resume";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard setActivePage={setActivePage} />;

      case "Find Jobs":
        return <Jobs />;
      
        case "My Resume":
          return <Resume />;

      default:
        return (
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h1 className="text-2xl font-bold text-slate-900">
              {activePage}
            </h1>

            <p className="mt-2 text-slate-500">
              This section will be developed in the upcoming phases.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-64">
        <Header
          activePage={activePage}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-4 sm:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
