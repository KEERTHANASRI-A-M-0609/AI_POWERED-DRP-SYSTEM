import React from 'react';
import { useDprStore } from '../store/useDprStore';
import { Network } from 'lucide-react';

export default function KnowledgeGraph() {
  const { currentProjectName } = useDprStore();

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto text-foreground">
      <div className="mb-6 border-b border-border pb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Network size={28} /> Contextual Knowledge Graph</h1>
        <p className="text-muted-foreground text-sm mt-2">Ontological map tracing external vectors acting upon <strong className="text-foreground">{currentProjectName}</strong>.</p>
      </div>

      <div className="bg-background border border-border rounded-lg p-8 shadow-sm h-[500px] flex items-center justify-center relative overflow-hidden">
         {/* Minimal Graph Mock representation */}
         <div className="absolute w-full h-full inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background"></div>
         <div className="text-center z-10">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
               <Network size={28} />
            </div>
            <h3 className="text-lg font-bold">Graph Rendering Connected</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
               The graph visualizer has aggregated 142 structural relations for <strong>{currentProjectName}</strong> using neo4j endpoints. WebGL context is initializing...
            </p>
         </div>
      </div>
    </div>
  );
}
