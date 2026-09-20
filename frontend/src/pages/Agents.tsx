import { Bot, CheckCircle2, Clock, Activity } from 'lucide-react';
import { cn } from '../components/Layout';

const agents = [
  {
    name: "Scout Agent",
    description: "Monitors sources and scores relevance",
    status: "ONLINE",
    lastRun: "7 minutes ago",
    processed: 42,
    successRate: "98%",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    name: "Research Agent",
    description: "Extracts facts and analyzes context",
    status: "ONLINE",
    lastRun: "12 minutes ago",
    processed: 14,
    successRate: "95%",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    name: "Fact Check Agent",
    description: "Verifies claims against multiple sources",
    status: "ONLINE",
    lastRun: "15 minutes ago",
    processed: 14,
    successRate: "92%",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  {
    name: "Writer Agent",
    description: "Generates concise platform-specific posts",
    status: "ONLINE",
    lastRun: "18 minutes ago",
    processed: 8,
    successRate: "100%",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  }
];

export default function Agents() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">AI Agents</h1>
        <p className="text-slate-400 mt-1">Monitor the autonomous pipeline.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div key={agent.name} className="bg-[#1e212b] border border-[#334155] rounded-xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className={cn("p-3 rounded-xl", agent.bg, agent.border, "border")}>
                  <Bot className={cn("w-6 h-6", agent.color)} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                  <p className="text-sm text-slate-400">{agent.description}</p>
                </div>
              </div>
              <div className="flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                {agent.status}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#334155]">
              <div>
                <p className="text-xs text-slate-500 flex items-center mb-1">
                  <Clock className="w-3 h-3 mr-1" /> Last Run
                </p>
                <p className="text-sm font-medium text-white">{agent.lastRun}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 flex items-center mb-1">
                  <Activity className="w-3 h-3 mr-1" /> Processed
                </p>
                <p className="text-sm font-medium text-white">{agent.processed}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 flex items-center mb-1">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Success Rate
                </p>
                <p className="text-sm font-medium text-white">{agent.successRate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
