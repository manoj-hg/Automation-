import { Check, X, Edit3, ShieldCheck, AlertCircle } from 'lucide-react';

const mockDrafts = [
  {
    id: 1,
    headline: "NVIDIA announces next-generation Blackwell architecture for AI",
    content: "🚨 TECH UPDATE\n\nNVIDIA has just announced its next-generation Blackwell architecture, promising a massive leap in AI computing performance. The new platform is designed to handle trillion-parameter language models at 25x less cost and energy consumption than Hopper.\n\n💡 Why it matters:\nThis breakthrough will accelerate the development of more capable AI models and significantly reduce the infrastructure costs for AI companies.\n\n🔗 Source:\nhttps://techcrunch.com/nvidia-blackwell\n\n#TechDose #Technology #AI #NVIDIA",
    category: "Hardware",
    confidence: 96,
    factCheckStatus: "VERIFIED",
    scheduledTime: "Today, 14:00"
  }
];

export default function ApprovalQueue() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Approval Queue</h1>
          <p className="text-slate-400 mt-1">Review and approve AI-generated drafts.</p>
        </div>
        <div className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1.5 rounded-lg text-sm font-medium">
          1 Pending Approval
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {mockDrafts.map((draft) => (
          <div key={draft.id} className="bg-[#1e212b] border border-[#334155] rounded-xl overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {draft.category}
                </span>
                <span className="text-sm text-slate-400">
                  Scheduled for: <span className="text-white">{draft.scheduledTime}</span>
                </span>
              </div>
              
              <div className="bg-[#0f1117] border border-[#334155] rounded-lg p-5 mb-6 font-mono text-sm text-slate-300 whitespace-pre-wrap">
                {draft.content}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0f1117] border border-[#334155] rounded-lg p-4">
                  <div className="flex items-center text-sm font-medium text-slate-400 mb-2">
                    <ShieldCheck className="w-4 h-4 mr-2 text-emerald-500" />
                    Fact Check
                  </div>
                  <p className="text-emerald-500 font-semibold">{draft.factCheckStatus}</p>
                </div>
                <div className="bg-[#0f1117] border border-[#334155] rounded-lg p-4">
                  <div className="flex items-center text-sm font-medium text-slate-400 mb-2">
                    <AlertCircle className="w-4 h-4 mr-2 text-blue-500" />
                    AI Confidence
                  </div>
                  <p className="text-white font-semibold">{draft.confidence}%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0f1117] border-t border-[#334155] p-4 flex gap-3">
              <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center">
                <Check className="w-5 h-5 mr-2" />
                Approve
              </button>
              <button className="flex-1 bg-[#334155] hover:bg-[#475569] text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center">
                <Edit3 className="w-5 h-5 mr-2" />
                Edit
              </button>
              <button className="flex-1 bg-rose-600/10 hover:bg-rose-600/20 text-rose-500 border border-rose-600/20 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center">
                <X className="w-5 h-5 mr-2" />
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
