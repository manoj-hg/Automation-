import { Search, Filter, ExternalLink, Bot, Check, AlertCircle } from 'lucide-react';
import { cn } from '../components/Layout';

const mockNews = [
  {
    id: 1,
    headline: "NVIDIA announces next-generation Blackwell architecture for AI",
    source: "TechCrunch",
    time: "2 hours ago",
    category: "Hardware",
    importance: 98,
    relevance: 95,
    status: "PROCESSED",
    duplicate: false
  },
  {
    id: 2,
    headline: "OpenAI releases new voice capabilities for all Plus users",
    source: "The Verge",
    time: "4 hours ago",
    category: "Artificial Intelligence",
    importance: 92,
    relevance: 90,
    status: "PROCESSED",
    duplicate: false
  },
  {
    id: 3,
    headline: "Major vulnerability found in popular NPM package",
    source: "Ars Technica",
    time: "5 hours ago",
    category: "Cybersecurity",
    importance: 85,
    relevance: 88,
    status: "PENDING",
    duplicate: false
  },
  {
    id: 4,
    headline: "NVIDIA's new AI chip Blackwell detailed",
    source: "Reuters",
    time: "2 hours ago",
    category: "Hardware",
    importance: 80,
    relevance: 90,
    status: "IGNORED",
    duplicate: true
  }
];

export default function NewsFeed() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">News Feed</h1>
        <p className="text-slate-400 mt-1">Collected articles waiting for analysis.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search headlines..." 
            className="w-full bg-[#1e212b] border border-[#334155] rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2.5 bg-[#1e212b] border border-[#334155] rounded-lg text-slate-300 hover:bg-[#334155] transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockNews.map((news) => (
          <div key={news.id} className={cn(
            "bg-[#1e212b] border rounded-xl p-5 transition-all",
            news.duplicate ? "border-rose-900/50 opacity-60" : "border-[#334155] hover:border-blue-500/50"
          )}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#0f1117] text-slate-300 border border-[#334155]">
                    {news.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center">
                    {news.source} • {news.time}
                  </span>
                  {news.duplicate && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Duplicate
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {news.headline}
                </h3>
                
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-[#0f1117] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${news.importance}%` }}></div>
                    </div>
                    <span className="text-xs text-slate-400">Importance: {news.importance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-[#0f1117] rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${news.relevance}%` }}></div>
                    </div>
                    <span className="text-xs text-slate-400">Relevance: {news.relevance}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 ml-4">
                <button className="p-2 text-slate-400 hover:text-white bg-[#0f1117] hover:bg-blue-600 rounded-lg transition-colors border border-[#334155] hover:border-blue-600 group">
                  <Bot className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
                <button className="p-2 text-slate-400 hover:text-white bg-[#0f1117] hover:bg-[#334155] rounded-lg transition-colors border border-[#334155]">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
