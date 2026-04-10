import React from 'react';
import { useDprStore } from '../store/useDprStore';
import { motion } from 'framer-motion';
import { ShieldAlert, TrendingUp, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RiskPrediction() {
  const { currentProjectName, calculatedData } = useDprStore();
  const isAtRisk = calculatedData.risk > 75;

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto text-foreground">
      <div className="mb-6 border-b border-border pb-6">
        <h1 className="text-2xl font-bold">Risk Intelligence</h1>
        <p className="text-muted-foreground text-sm mt-2">Machine Learning risk forecasting for <strong className="text-foreground">{currentProjectName}</strong>.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-lg border shadow-sm ${isAtRisk ? 'bg-destructive/10 border-destructive' : 'bg-background'}`}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">Overall Structural Risk</h3>
          <div className="text-5xl font-bold mb-2">{calculatedData.risk.toFixed(1)}%</div>
          <p className="text-sm">{isAtRisk ? 'Critical threshold breached due to timeline overlap.' : 'Risk sits within standard operational tolerances.'}</p>
        </div>

        <div className="md:col-span-2 p-6 rounded-lg border border-border bg-background shadow-sm">
           <h3 className="font-semibold mb-4">Risk Progression Trajectory</h3>
           <div className="h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calculatedData.months} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
                  <Area type="monotone" dataKey="risk" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.1} strokeWidth={3} />
                </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="bg-background border border-border rounded-lg shadow-sm">
         <div className="p-4 border-b border-border bg-secondary/30">
            <h3 className="font-semibold text-sm flex items-center gap-2"><AlertTriangle size={16}/> Dominant Risk Vectors</h3>
         </div>
         <div className="p-0">
            <div className="flex border-b border-border/50 p-4 hover:bg-secondary/20">
               <div className="mr-4 text-destructive"><AlertTriangle /></div>
               <div>
                 <h4 className="font-semibold text-sm">Labor Cost Escalation (XGBoost Prediction)</h4>
                 <p className="text-xs text-muted-foreground mt-1">Due to the compressed schedule injected into the simulation, algorithmic modeling indicates a 85% chance of localized labor shortages driving up hourly rates by Month 4.</p>
               </div>
            </div>
            <div className="flex p-4 hover:bg-secondary/20">
               <div className="mr-4 text-yellow-500"><ShieldAlert /></div>
               <div>
                 <h4 className="font-semibold text-sm">Regulatory Delay</h4>
                 <p className="text-xs text-muted-foreground mt-1">Missing detailed sustainability clauses historically result in an average of 42 days of processing delays at the regional approval board.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
