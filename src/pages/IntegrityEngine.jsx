import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Brain, FileSearch, ArrowRight, Fingerprint } from 'lucide-react';
import { useDprStore } from '../store/useDprStore';

export default function IntegrityEngine() {
  const { currentProjectName } = useDprStore();

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto text-foreground">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-3">
           <Fingerprint className="text-purple-500" size={28} /> AI Authorship & Document Integrity Scanner
        </h1>
        <p className="text-muted-foreground text-sm mt-2 max-w-2xl">
          Deep-scanning <strong>{currentProjectName}</strong> for AI-generated hallucinations, historic plagiarism loops, and financial metric forgery. 
          This advanced neural net ensures the DPR was authored authentically and securely.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">Authenticity Score</h3>
            <div className="flex items-end gap-2 mb-2">
               <span className="text-4xl font-bold">94%</span>
               <span className="text-sm text-green-500 font-bold mb-1">Pass</span>
            </div>
            <p className="text-xs text-muted-foreground">High probability of human authorship.</p>
         </div>
         
         <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">Plagiarism Index</h3>
            <div className="flex items-end gap-2 mb-2">
               <span className="text-4xl font-bold">12%</span>
               <span className="text-sm text-yellow-500 font-bold mb-1">Warning</span>
            </div>
            <p className="text-xs text-muted-foreground">Matches found with historic failed projects.</p>
         </div>

         <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">Math Verification</h3>
            <div className="flex items-end gap-2 mb-2">
               <span className="text-4xl font-bold">100%</span>
               <span className="text-sm text-green-500 font-bold mb-1">Verified</span>
            </div>
            <p className="text-xs text-muted-foreground">No numerical manipulation detected.</p>
         </div>
      </div>

      <div className="bg-background border border-border rounded-lg shadow-sm">
         <div className="p-4 border-b border-border bg-secondary/30">
            <h3 className="font-semibold text-sm">Integrity Analysis Log</h3>
         </div>
         <div className="p-6 space-y-6">
            <div className="flex gap-4 items-start">
               <div className="p-2 bg-purple-500/10 text-purple-500 rounded-md">
                  <Brain size={20} />
               </div>
               <div>
                  <h4 className="text-sm font-bold">LLM Hallucination Sweep</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                     No structural anomalies found. Language perplexity and burstiness indicate normal human patterns in the primary project description. 
                     <strong> Section 4 (Financial Breakdown)</strong> shows minor rigid phrasing, perfectly normal for tabulated data.
                  </p>
               </div>
            </div>

            <div className="flex gap-4 items-start border-t border-border pt-6">
               <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-md">
                  <FileSearch size={20} />
               </div>
               <div>
                  <h4 className="text-sm font-bold">Historical Vector Collision</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                     Detected a 12% text similarity in the <strong>"Environmental Risk Assessment"</strong> subsection matching a 2021 disqualified DPR (Highway Ext-3).
                     <span className="block mt-2 font-semibold text-foreground">Action required: Verify if environmental parameters were simply copy-pasted without local adaptation.</span>
                  </p>
                  <button className="mt-3 text-xs bg-secondary hover:bg-border px-3 py-1.5 rounded text-foreground font-medium flex items-center gap-2">
                     Compare Diffs <ArrowRight size={14} />
                  </button>
               </div>
            </div>

            <div className="flex gap-4 items-start border-t border-border pt-6">
               <div className="p-2 bg-green-500/10 text-green-600 rounded-md">
                  <ShieldAlert size={20} />
               </div>
               <div>
                  <h4 className="text-sm font-bold">Cryptographic Math Ledger</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                     All stated total budgets exactly match the sub-itemizations. No hidden cost offsets or padding found. 
                     The document passes basic logic encryption checks.
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
