import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Rss, 
  CheckSquare, 
  Bot,
  Menu,
  X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'News Feed', href: '/news', icon: Rss },
  { name: 'Approval Queue', href: '/approval', icon: CheckSquare },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0f1117] flex">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#1e212b] border-b border-[#334155] z-50 flex items-center px-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-slate-400 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <div className="flex items-center ml-4 text-blue-500">
          <Bot className="w-6 h-6 mr-2" />
          <span className="font-bold text-white tracking-tight">TechDose <span className="text-blue-500">AI</span></span>
        </div>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-[#1e212b] border-r border-[#334155] transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:block",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-[#334155] hidden lg:flex text-blue-500">
          <Bot className="w-8 h-8 mr-2" />
          <span className="text-xl font-bold text-white tracking-tight">TechDose <span className="text-blue-500">AI</span></span>
        </div>

        <nav className="p-4 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3 mt-4">
            Live System
          </div>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-blue-600/10 text-blue-500" 
                    : "text-slate-400 hover:bg-[#334155] hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5 mr-3", isActive ? "text-blue-500" : "text-slate-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 lg:pl-0 pt-16 lg:pt-0 overflow-y-auto">
        <div className="h-16 border-b border-[#334155] bg-[#1e212b]/50 flex items-center justify-end px-8 hidden lg:flex">
          <div className="flex items-center gap-4">
            <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              System Online
            </span>
          </div>
        </div>
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
