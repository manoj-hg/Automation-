import { useState } from 'react';
import { Activity } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const runPipeline = async () => {
    setLoading(true);
    setMessage('Triggering AI Pipeline...');
    try {
      const res = await fetch(`${API_URL}/news/collect`, { method: 'POST' });
      const data = await res.json();
      setMessage(data.message || 'Pipeline started! Wait 60 seconds and check the News Feed.');
    } catch (e) {
      console.error(e);
      setMessage('Error connecting to backend API. Check your VITE_API_URL.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-slate-400 mt-1">TechDose AI Control Panel</p>
      </div>
      
      <div className="bg-[#1e212b] border border-[#334155] rounded-xl p-12 text-center max-w-2xl mx-auto mt-12 shadow-xl">
        <Activity className="w-16 h-16 text-blue-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-white mb-4">Manual Pipeline Trigger</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Your system is set to run automatically via n8n. If you want to force the AI to search for news, score it, and write drafts right now, click the button below.
        </p>
        <button 
          onClick={runPipeline}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg disabled:opacity-50 shadow-lg shadow-blue-500/20"
        >
          {loading ? 'Starting...' : 'Run AI Pipeline Now'}
        </button>
        
        {message && (
          <div className="mt-8 p-4 bg-emerald-900/20 text-emerald-400 border border-emerald-900/50 rounded-lg font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
