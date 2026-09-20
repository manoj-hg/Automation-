import { Check, X, Edit3, ShieldCheck, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export default function ApprovalQueue() {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = () => {
    setLoading(true);
    fetch(`${API_URL}/drafts`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok' && data.data) {
          setDrafts(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch drafts:", err);
        setLoading(false);
      });
  };

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      const res = await fetch(`${API_URL}/drafts/${id}/${action}`, { method: 'POST' });
      const data = await res.json();
      if (data.status === 'ok' || data.status === 'warning') {
        alert(data.message);
        // Refresh drafts
        fetchDrafts();
      } else {
        alert("Action failed.");
      }
    } catch (e) {
      console.error(e);
      alert("Error performing action.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Approval Queue</h1>
          <p className="text-slate-400 mt-1">Review and approve AI-generated drafts.</p>
        </div>
        <div className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1.5 rounded-lg text-sm font-medium">
          {drafts.length} Pending Approval
        </div>
      </div>

      {loading ? (
        <div className="text-slate-400 p-4">Loading real drafts from API...</div>
      ) : drafts.length === 0 ? (
        <div className="text-slate-400 p-4">Queue is empty! All drafts are approved or none have been generated yet.</div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {drafts.map((draft) => (
            <div key={draft.id} className="bg-[#1e212b] border border-[#334155] rounded-xl overflow-hidden flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {draft.category || "General"}
                  </span>
                  <span className="text-sm text-slate-400">
                    Scheduled for: <span className="text-white">{draft.scheduled_time || "Now"}</span>
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{draft.headline}</h3>
                
                <div className="bg-[#0f1117] border border-[#334155] rounded-lg p-5 mb-6 font-mono text-sm text-slate-300 whitespace-pre-wrap">
                  {draft.content}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0f1117] border border-[#334155] rounded-lg p-4">
                    <div className="flex items-center text-sm font-medium text-slate-400 mb-2">
                      <ShieldCheck className="w-4 h-4 mr-2 text-emerald-500" />
                      Fact Check
                    </div>
                    <p className="text-emerald-500 font-semibold">{draft.factCheckStatus || "VERIFIED"}</p>
                  </div>
                  <div className="bg-[#0f1117] border border-[#334155] rounded-lg p-4">
                    <div className="flex items-center text-sm font-medium text-slate-400 mb-2">
                      <AlertCircle className="w-4 h-4 mr-2 text-blue-500" />
                      AI Confidence
                    </div>
                    <p className="text-white font-semibold">{draft.confidence || 95}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#0f1117] border-t border-[#334155] p-4 flex gap-3">
                <button 
                  onClick={() => handleAction(draft.id, 'approve')}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Approve
                </button>
                <button className="flex-1 bg-[#334155] hover:bg-[#475569] text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <Edit3 className="w-5 h-5 mr-2" />
                  Edit
                </button>
                <button 
                  onClick={() => handleAction(draft.id, 'reject')}
                  className="flex-1 bg-rose-600/10 hover:bg-rose-600/20 text-rose-500 border border-rose-600/20 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5 mr-2" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
