import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, AlertTriangle, CheckCircle, ChevronDown, ChevronRight, Edit3, MessageSquare, Zap } from 'lucide-react';

const analysisData = [
  {
    id: 1,
    section: "4.2 Financial Projections",
    status: "weak", // weak, missing, strong
    issue: "Semantic Mismatch: Budget vs Timeline",
    description: "The projected cost for Phase 3 ($2.4M) contradicts the reduced timeline (4 months) proposed in Section 2.1. Historically, accelerated timelines in similar soil conditions increase costs by 15-20%.",
    suggestion: "Adjust Phase 3 budget to $2.8M or revert timeline to standard 6 months.",
    autoImprovement: "Phase 3 budget is revised to $2.85M to account for expedited labor and specialized rapid-curing materials required for the 4-month timeline."
  },
  {
    id: 2,
    section: "5.1 Environmental Impact",
    status: "missing",
    issue: "Missing Sub-section: Carbon Offset Strategy",
    description: "The analysis detected that the mandatory Carbon Offset Strategy is entirely absent, which violates the regional infrastructural compliance standard ISO-14001.",
    suggestion: "Add a new sub-section detailing afforestation plans and carbon credit purchases.",
    autoImprovement: "Drafting a completely new section: '5.1.a Carbon Offset Strategy: The project commits to planting 5,000 native saplings in Zone D and purchasing 200 carbon credits to achieve a net-zero impact during the construction phase...'"
  },
  {
    id: 3,
    section: "1.0 Executive Summary",
    status: "strong",
    issue: "Well Structured",
    description: "The executive summary perfectly captures all necessary KPIs, stakeholder details, and high-level project goals. The text complexity is optimal for executive review.",
    suggestion: "",
    autoImprovement: ""
  }
];

function AnalysisItem({ data }) {
  const [expanded, setExpanded] = useState(false);
  
  const isWeak = data.status === 'weak';
  const isMissing = data.status === 'missing';
  const isStrong = data.status === 'strong';

  const icon = isWeak ? <AlertTriangle className="text-yellow-500" size={20} /> 
             : isMissing ? <AlertTriangle className="text-destructive" size={20} /> 
             : <CheckCircle className="text-green-500" size={20} />;

  const badgeColor = isWeak ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' 
                   : isMissing ? 'bg-destructive/10 text-destructive border-destructive/20' 
                   : 'bg-green-500/10 text-green-500 border-green-500/20';

  return (
    <motion.div 
      layout
      className={`border rounded-xl mb-4 bg-card overflow-hidden shadow-sm transition-all ${expanded ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border hover:border-primary/30'}`}
    >
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-secondary rounded-lg">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-foreground">{data.section}</h4>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                {data.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{data.issue}</p>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground p-2">
          {expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border bg-secondary/20"
          >
            <div className="p-4 space-y-4">
              <div>
                <h5 className="text-xs font-bold text-muted-foreground uppercase mb-1">AI Contextual Analysis</h5>
                <p className="text-sm">{data.description}</p>
              </div>

              {!isStrong && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-background rounded-lg p-4 border border-border shadow-inner">
                    <h5 className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 mb-2">
                      <Lightbulb size={14} className="text-yellow-500" />
                      Suggested Action
                    </h5>
                    <p className="text-sm text-foreground">{data.suggestion}</p>
                  </div>
                  
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                      <Zap size={40} className="text-primary" />
                    </div>
                    <h5 className="text-xs font-bold text-primary uppercase flex items-center gap-1.5 mb-2">
                      <Edit3 size={14} />
                      AI Auto-Rewrite
                    </h5>
                    <p className="text-sm text-foreground italic">"{data.autoImprovement}"</p>
                    <button className="mt-3 bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-md font-medium hover:bg-primary/90 transition-colors shadow-sm w-full">
                      Apply Rewrite to DPR
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Analysis() {
  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Semantic Analysis</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Deep contextual validation of document structure, dependencies, and content quality.
          </p>
        </div>
        
        <div className="flex gap-2">
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2">
            <MessageSquare size={16} />
            Ask Document AI
          </button>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
            <Zap size={16} />
            Apply All Auto-Fixes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col justify-center shadow-sm">
          <span className="text-2xl font-bold text-foreground">12</span>
          <span className="text-xs font-medium text-muted-foreground uppercase">Sections Analyzed</span>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex flex-col justify-center">
          <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">4</span>
          <span className="text-xs font-medium text-yellow-600/70 dark:text-yellow-500/70 uppercase">Weak Sections</span>
        </div>
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex flex-col justify-center">
          <span className="text-2xl font-bold text-destructive">1</span>
          <span className="text-xs font-medium text-destructive/70 uppercase">Missing Sections</span>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent to-primary/20"></div>
          <span className="text-2xl font-bold text-primary relative z-10">89%</span>
          <span className="text-xs font-medium text-primary/70 uppercase relative z-10">Semantic Cohesion</span>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold mb-4">Detailed Findings</h3>
        {analysisData.map((item) => (
          <AnalysisItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
