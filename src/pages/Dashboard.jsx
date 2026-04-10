import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { AlertCircle, TrendingUp, CheckCircle, Lightbulb, MessageSquare, Send, Sliders, RefreshCcw, Download, Check } from 'lucide-react';
import { useDprStore } from '../store/useDprStore';
import { toast } from 'react-hot-toast';

// ------------------------------
// SKELETON COMPONENT
// ------------------------------
const DashboardSkeleton = () => (
  <div className="space-y-6 animate-pulse mt-4 max-w-7xl mx-auto">
    <div className="h-16 bg-secondary/40 rounded-lg w-full"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1,2,3,4].map(i => <div key={i} className="h-32 bg-secondary/40 rounded-lg"></div>)}
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
       <div className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="h-64 bg-secondary/40 rounded-lg"></div>
             <div className="h-64 bg-secondary/40 rounded-lg"></div>
          </div>
          <div className="h-40 bg-secondary/40 rounded-lg"></div>
       </div>
       <div className="space-y-6">
          <div className="h-[430px] bg-secondary/40 rounded-lg"></div>
       </div>
    </div>
  </div>
);

// ------------------------------
// LIVE DASHBOARD
// ------------------------------
export default function Dashboard() {
  const { 
    isStreamComplete, isAnalyzing, startAnalysisStream, 
    calculatedData, budgetModifier, timelineModifier, 
    updateSimulation, resetSimulation, currentProjectName 
  } = useDprStore();

  useEffect(() => {
    if (!isStreamComplete && !isAnalyzing) {
      startAnalysisStream();
    }
  }, [isStreamComplete, isAnalyzing, startAnalysisStream]);

  const radarData = [
    { subject: 'Quality', A: calculatedData.viability },
    { subject: 'Financials', A: calculatedData.financial },
    { subject: 'Stability', A: 100 - calculatedData.risk },
    { subject: 'Completeness', A: calculatedData.completeness },
    { subject: 'Compliance', A: 82 }, 
  ];

  if (!isStreamComplete) {
    return (
      <div className="max-w-7xl mx-auto py-2">
         <div className="flex items-center gap-3 mb-4 text-muted-foreground">
            <RefreshCcw className="animate-spin" size={16} />
            <span className="text-sm font-medium">Processing Report Data...</span>
         </div>
         <DashboardSkeleton />
      </div>
    );
  }

  const isAtRisk = calculatedData.risk > 75;

  return (
    <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-6 pb-12 max-w-7xl mx-auto text-foreground">
      
      {/* 📌 Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-background border border-border p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-xl font-bold">{currentProjectName}</h1>
          <p className="text-muted-foreground text-sm mt-1">Uploaded Today • System Parsed</p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="text-right px-4">
            <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Status</p>
            <p className={`text-sm font-bold flex items-center gap-2 ${isAtRisk ? 'text-destructive' : 'text-green-600'}`}>
              <span className={`w-2 h-2 rounded-full ${isAtRisk ? 'bg-destructive' : 'bg-green-600'}`}></span>
              {isAtRisk ? 'Needs Revision' : 'Approved'}
            </p>
          </div>
          <button onClick={() => toast.success('Report downloaded.')} className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 flex items-center gap-2">
             <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* 📊 Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-lg border bg-background shadow-sm hover:border-primary/30 transition-colors">
          <p className="text-sm font-medium text-muted-foreground mb-2">Overall Score</p>
          <div className="flex items-end gap-2">
             <h3 className="text-3xl font-bold">{calculatedData.viability.toFixed(0)}</h3>
             <span className="text-sm text-muted-foreground mb-1">/ 100</span>
          </div>
        </div>

        <div className="p-5 rounded-lg border bg-background shadow-sm hover:border-primary/30 transition-colors">
          <p className="text-sm font-medium text-muted-foreground mb-2">Financial Health</p>
          <h3 className="text-3xl font-bold">{calculatedData.financial.toFixed(0)}%</h3>
        </div>

        <div className={`p-5 rounded-lg border shadow-sm transition-colors ${isAtRisk ? 'bg-destructive/5 border-destructive/20' : 'bg-background hover:border-primary/30'}`}>
          <p className={`text-sm font-medium mb-2 ${isAtRisk ? 'text-destructive' : 'text-muted-foreground'}`}>Risk Level</p>
          <h3 className={`text-3xl font-bold ${isAtRisk ? 'text-destructive' : 'text-foreground'}`}>
            {calculatedData.risk.toFixed(0)}%
          </h3>
        </div>

        <div className="p-5 rounded-lg border bg-background shadow-sm hover:border-primary/30 transition-colors">
          <p className="text-sm font-medium text-muted-foreground mb-2">Document Status</p>
          <h3 className="text-3xl font-bold flex items-center gap-2">
            {calculatedData.completeness}% <CheckCircle size={20} className="text-green-500" />
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-6">
           
           {/* Scenario Simulator */}
           <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-semibold text-lg flex items-center gap-2"><Sliders size={18} className="text-muted-foreground" /> Adjust Assumptions</h3>
                 <button onClick={resetSimulation} className="text-sm text-muted-foreground hover:text-foreground">Reset</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Budget Adjustment</label>
                      <span className="text-sm font-bold text-primary">{budgetModifier > 0 ? '+' : ''}{budgetModifier}%</span>
                    </div>
                    <input type="range" min="-30" max="50" value={budgetModifier} 
                      onChange={(e) => updateSimulation(parseInt(e.target.value), timelineModifier)}
                      className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                 </div>
                 <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Timeline Adjust</label>
                      <span className="text-sm font-bold text-primary">{timelineModifier > 0 ? '+' : ''}{timelineModifier} Months</span>
                    </div>
                    <input type="range" min="-6" max="12" value={timelineModifier} 
                      onChange={(e) => updateSimulation(budgetModifier, parseInt(e.target.value))}
                      className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Radar Chart */}
              <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold mb-4">Category Overview</h3>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Score" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={2} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Area Chart */}
              <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold mb-4">Risk Trend</h3>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={calculatedData.months} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={isAtRisk ? "hsl(var(--destructive))" : "hsl(var(--primary))"} stopOpacity={0.2}/>
                          <stop offset="95%" stopColor={isAtRisk ? "hsl(var(--destructive))" : "hsl(var(--primary))"} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{fontSize: 11, fill: 'hsl(var(--muted-foreground))'}} axisLine={false} tickLine={false} />
                      <YAxis tick={{fontSize: 11, fill: 'hsl(var(--muted-foreground))'}} axisLine={false} tickLine={false} domain={[0, 100]} />
                      <Tooltip cursor={{stroke: 'hsl(var(--border))'}} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                      <Area type="monotone" dataKey="risk" stroke={isAtRisk ? "hsl(var(--destructive))" : "hsl(var(--primary))"} fill="url(#riskGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
           </div>

           {/* Analysis Text */}
           <div className="bg-background border border-border rounded-lg shadow-sm">
             <div className="p-4 border-b border-border flex justify-between items-center">
                <h3 className="font-semibold">Key Findings</h3>
             </div>
             <div className="p-5">
               <div className="flex gap-4">
                  <div className="mt-1">
                     <AlertCircle className={isAtRisk ? "text-destructive" : "text-green-600"} size={20} />
                  </div>
                  <div>
                     <h4 className="text-sm font-semibold mb-2">{isAtRisk ? 'Budget and Timeline Mismatch' : 'Stable Project Parameters'}</h4>
                     <p className="text-sm text-muted-foreground leading-relaxed">
                       {isAtRisk 
                         ? `The current timeline extension (+${timelineModifier} months) conflicts with the assigned budget. Analysis of historical projects indicates a high likelihood of resource shortage by month 4. Recommend balancing schedule and budget.`
                         : `The inputs (Budget: ${budgetModifier}%, Timeline: ${timelineModifier} months) show no major conflicts. Structural risk is low, and the project is tracking favorably against historical benchmarks.`
                       }
                     </p>
                  </div>
               </div>
             </div>
           </div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
           <div className="bg-background border border-border rounded-lg shadow-sm h-full max-h-[500px] flex flex-col">
             <div className="p-4 border-b border-border">
                 <h3 className="font-semibold flex items-center gap-2"><Lightbulb size={18} className="text-yellow-500" /> Action Items</h3>
             </div>
             <div className="p-5 space-y-4 flex-1">
                 {isAtRisk ? (
                    <div className="border border-border rounded-lg p-4 bg-secondary/30">
                      <p className="text-sm font-semibold mb-2">Increase Buffer Amount</p>
                      <p className="text-sm text-muted-foreground mb-4">Adding 15% contingency will resolve the timeline conflict.</p>
                      <button onClick={() => {toast.success('Applied Configuration'); updateSimulation(15, timelineModifier);}} className="w-full text-sm font-medium bg-foreground text-background py-2 rounded-md hover:opacity-90">
                        Apply (+15% Budget)
                      </button>
                    </div>
                 ) : (
                    <div className="border border-green-500/20 rounded-lg p-4 bg-green-500/5">
                      <p className="text-sm font-semibold mb-2 text-green-700">Ready for Approval</p>
                      <p className="text-sm text-muted-foreground mb-4">Metrics are stable. Move forward with documentation.</p>
                      <button onClick={() => toast.success('Moved to Approved.')} className="w-full text-sm font-medium bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                        Mark as Approved
                      </button>
                    </div>
                 )}
                 <div className="border border-border rounded-lg p-4">
                    <p className="text-sm font-semibold mb-2">Review Section 5</p>
                    <p className="text-sm text-muted-foreground mb-4">Regulatory framework is currently missing details.</p>
                    <button onClick={() => toast.success('Opened Editor')} className="w-full text-sm font-medium border border-border py-2 rounded-md hover:bg-secondary">
                      Go to Section Editor
                    </button>
                 </div>
             </div>
           </div>
        </div>
      </div>

    </motion.div>
  );
}
