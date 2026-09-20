import { Activity, Clock, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '../components/Layout';

const stats = [
  { name: 'News Discovered Today', value: '124', icon: Activity, color: 'text-blue-500' },
  { name: 'High-priority Stories', value: '12', icon: AlertTriangle, color: 'text-rose-500' },
  { name: 'Drafts Awaiting Approval', value: '4', icon: Clock, color: 'text-amber-500' },
  { name: 'Scheduled Posts', value: '8', icon: FileText, color: 'text-indigo-500' },
  { name: 'Published Posts', value: '24', icon: CheckCircle, color: 'text-emerald-500' },
];

const activityFeed = [
  { id: 1, message: 'Scout Agent discovered 14 stories', time: '2m ago' },
  { id: 2, message: 'Duplicate detector removed 5 duplicates', time: '5m ago' },
  { id: 3, message: 'Research Agent verified 3 stories', time: '12m ago' },
  { id: 4, message: 'Writer Agent created 4 drafts', time: '18m ago' },
  { id: 5, message: '2 posts waiting for approval', time: '20m ago' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back. Here's what's happening today.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center shadow-lg shadow-blue-500/20">
          <Activity className="w-5 h-5 mr-2" />
          Run AI Pipeline
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-[#1e212b] border border-[#334155] rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-400">{stat.name}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <div className={cn("p-2 bg-[#0f1117] rounded-lg", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1e212b] border border-[#334155] rounded-xl p-6 h-[400px]">
            <h2 className="text-lg font-semibold text-white mb-4">Pipeline Status</h2>
            <div className="flex items-center justify-center h-[300px] border border-dashed border-[#334155] rounded-lg">
              <p className="text-slate-500">Pipeline Visualization (Coming Soon)</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1e212b] border border-[#334155] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-500" />
            Live Activity
          </h2>
          <div className="space-y-6">
            {activityFeed.map((item, index) => (
              <div key={item.id} className="relative flex gap-4">
                {index !== activityFeed.length - 1 && (
                  <div className="absolute left-2.5 top-6 bottom-[-24px] w-px bg-[#334155]"></div>
                )}
                <div className="relative mt-1 w-5 h-5 rounded-full border-2 border-[#1e212b] bg-blue-500 shadow-sm shrink-0"></div>
                <div>
                  <p className="text-sm text-slate-200">{item.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
