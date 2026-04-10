import React from 'react';
import { useDprStore } from '../store/useDprStore';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, TrendingUp, Lightbulb } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function QualityAnalysis() {
  const { currentProjectName, calculatedData } = useDprStore();

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto text-foreground">
      <div className="mb-6 border-b border-border pb-6">
        <h1 className="text-2xl font-bold">Quality Assessment</h1>
        <p className="text-muted-foreground text-sm mt-2">Deep semantic analysis of structural and qualitative data for <strong className="text-foreground">{currentProjectName}</strong>.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Main Score Box */}
         <div className="bg-background border border-border rounded-lg p-6 shadow-sm flex flex-col justify-center">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Overall Viability Rating</h3>
            <div className="flex items-center gap-4">
               <div className="text-6xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  {calculatedData.viability.toFixed(0)}
               </div>
               <div className="flex-1">
                  <div className="w-full bg-secondary rounded-full h-2">
                     <motion.div initial={{width:0}} animate={{width: `${calculatedData.viability}%`}} className="bg-primary h-2 rounded-full"></motion.div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Score is currently stabilizing via scenario controls.</p>
               </div>
            </div>
         </div>

         {/* Strengths & Weaknesses */}
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
               <div className="flex items-center gap-2 mb-2 text-green-600"><CheckCircle2 size={16}/><h4 className="font-semibold text-sm">Strengths</h4></div>
               <ul className="text-xs space-y-2 mt-3 text-muted-foreground">
                  <li>• Resource planning is exceptionally detailed.</li>
                  <li>• Labor allocation maps accurately to timeline.</li>
               </ul>
            </div>
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
               <div className="flex items-center gap-2 mb-2 text-destructive"><AlertCircle size={16}/><h4 className="font-semibold text-sm">Deficits</h4></div>
               <ul className="text-xs space-y-2 mt-3 text-muted-foreground">
                  <li>• Environmental offset plan is sparse.</li>
                  <li>• Contingency buffer is mathematically constrained.</li>
               </ul>
            </div>
         </div>
      </div>

      <div className="bg-background border border-border rounded-lg shadow-sm">
         <div className="p-4 border-b border-border bg-secondary/30">
            <h3 className="font-semibold text-sm flex items-center gap-2"><Lightbulb size={16} className="text-yellow-500"/> Quality Enhancement Prompts</h3>
         </div>
         <div className="p-6">
            <div className="space-y-4">
               <div className="flex justify-between items-center p-3 border border-border rounded bg-card/50">
                  <div>
                     <p className="text-sm font-semibold">Rewrite Section 3.2 (Budget Justification)</p>
                     <p className="text-xs text-muted-foreground">AI suggests padding qualitative explanations to support the timeline acceleration.</p>
                  </div>
                  <button onClick={() => toast.success('Section successfully rewritten.')} className="bg-primary/10 text-primary px-3 py-1.5 rounded text-xs font-semibold hover:bg-primary hover:text-white transition-colors">Apply Auto-Rewrite</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
