import React from 'react';
import { useDprStore } from '../store/useDprStore';
import { Sliders, RefreshCcw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ScenarioSimulation() {
  const { currentProjectName, budgetModifier, timelineModifier, updateSimulation, calculatedData, resetSimulation } = useDprStore();

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto text-foreground">
      <div className="mb-6 border-b border-border pb-6">
        <h1 className="text-2xl font-bold">Scenario Simulator</h1>
        <p className="text-muted-foreground text-sm mt-2">Adjust macroeconomic variables for <strong className="text-foreground">{currentProjectName}</strong> to predict outcome trajectories.</p>
      </div>

      <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
           <h3 className="font-semibold text-lg flex items-center gap-2"><Sliders size={18} /> Global Parameters</h3>
           <button onClick={resetSimulation} className="text-sm font-medium hover:underline text-muted-foreground">Reset Defaults</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold">Financial Cap Offset</label>
                <span className="text-sm font-bold text-primary">{budgetModifier > 0 ? '+' : ''}{budgetModifier}%</span>
              </div>
              <input type="range" min="-40" max="60" value={budgetModifier} 
                onChange={(e) => updateSimulation(parseInt(e.target.value), timelineModifier)}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-xs text-muted-foreground mt-2">Modifies the total allowable budget thresholds. Lowering increases execution risk.</p>
           </div>
           <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold">Delivery Timeline Shift</label>
                <span className="text-sm font-bold text-primary">{timelineModifier > 0 ? '+' : ''}{timelineModifier} Months</span>
              </div>
              <input type="range" min="-12" max="24" value={timelineModifier} 
                onChange={(e) => updateSimulation(budgetModifier, parseInt(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-xs text-muted-foreground mt-2">Modifies execution constraints. Extensions decrease immediate risk but increase total inflationary cost.</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4 text-sm">Cost Impact Projection</h3>
            <div className="text-4xl font-bold mb-1">${(calculatedData.costImpact).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Compounded adjusted financial total factoring in timeline expansion.</p>
         </div>
         <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4 text-sm">Calculated Viability</h3>
            <div className="text-4xl font-bold mb-1">{calculatedData.viability.toFixed(1)} <span className="text-sm text-muted-foreground font-normal">/ 100</span></div>
            <p className="text-xs text-muted-foreground">The overall mathematical rating dictating board approval probability.</p>
         </div>
      </div>
    </div>
  );
}
