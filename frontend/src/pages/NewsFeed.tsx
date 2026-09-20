import { Search, Filter, ExternalLink, Bot, AlertCircle } from 'lucide-react';
import { cn } from '../components/Layout';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export default function NewsFeed() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/news`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok' && data.data) {
          setNews(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch news:", err);
        setLoading(false);
      });
  }, []);

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

      {loading ? (
        <div className="text-slate-400 p-4">Loading real news from API...</div>
      ) : news.length === 0 ? (
        <div className="text-slate-400 p-4">No news articles found yet. Check back in a few hours!</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {news.map((item) => (
            <div key={item.id} className={cn(
              "bg-[#1e212b] border rounded-xl p-5 transition-all",
              item.is_duplicate ? "border-rose-900/50 opacity-60" : "border-[#334155] hover:border-blue-500/50"
            )}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#0f1117] text-slate-300 border border-[#334155]">
                      {item.category || "Uncategorized"}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center">
                      {item.source_id || "RSS"} • {new Date(item.published_at).toLocaleTimeString()}
                    </span>
                    {item.is_duplicate && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Duplicate
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[#0f1117] rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${item.ai_importance_score || 0}%` }}></div>
                      </div>
                      <span className="text-xs text-slate-400">Importance: {item.ai_importance_score || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[#0f1117] rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${item.ai_relevance_score || 0}%` }}></div>
                      </div>
                      <span className="text-xs text-slate-400">Relevance: {item.ai_relevance_score || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <button className="p-2 text-slate-400 hover:text-white bg-[#0f1117] hover:bg-blue-600 rounded-lg transition-colors border border-[#334155] hover:border-blue-600 group">
                    <Bot className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </button>
                  <a href={item.url} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-white bg-[#0f1117] hover:bg-[#334155] rounded-lg transition-colors border border-[#334155]">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
