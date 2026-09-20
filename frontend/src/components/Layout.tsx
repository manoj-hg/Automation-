import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Newspaper, 
  Bot, 
  FileEdit, 
  CheckSquare, 
  Calendar, 
  Send, 
  BarChart2, 
  Database, 
  Settings 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'News Feed', path: '/news', icon: Newspaper },
  { name: 'AI Agents', path: '/agents', icon: Bot },
  { name: 'Drafts', path: '/drafts', icon: FileEdit },
  { name: 'Approval Queue', path: '/approvals', icon: CheckSquare },
  { name: 'Scheduler', path: '/scheduler', icon: Calendar },
  { name: 'Published', path: '/published', icon: Send },
  { name: 'Analytics', path: '/analytics', icon: BarChart2 },
  { name: 'Sources', path: '/sources', icon: Database },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0f1117] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e212b] border-r border-[#334155] flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-[#334155]">
          <Bot className="w-8 h-8 text-blue-500 mr-2" />
          <span className="text-xl font-bold text-white tracking-tight">TechDose <span className="text-blue-500">AI</span></span>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-blue-600/10 text-blue-500" 
                    : "text-slate-400 hover:bg-[#334155]/50 hover:text-white"
                )}
              >
                <Icon className={cn("w-5 h-5 mr-3", isActive ? "text-blue-500" : "text-slate-500")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-[#1e212b] border-b border-[#334155] flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center bg-[#0f1117] rounded-full px-4 py-1.5 border border-[#334155]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">Demo Mode Active</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-[#334155]/50">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
