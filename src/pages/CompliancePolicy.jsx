import React from 'react';
import { useDprStore } from '../store/useDprStore';
import { ShieldCheck, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function CompliancePolicy() {
  const { currentProjectName } = useDprStore();

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto text-foreground">
      <div className="mb-6 border-b border-border pb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><ShieldCheck size={28} /> Compliance & SDG Mapping</h1>
        <p className="text-muted-foreground text-sm mt-2">Auditing <strong className="text-foreground">{currentProjectName}</strong> against international regulatory standards.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-background border border-border rounded-lg p-6">
           <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 border-b border-border pb-2">Regional Guidelines (ISO 9001)</h3>
           <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                 <span>Structural Mandates</span>
                 <span className="flex items-center gap-1 text-green-600 font-bold"><CheckCircle2 size={16}/> PASSED</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span>Safety Disclosures</span>
                 <span className="flex items-center gap-1 text-green-600 font-bold"><CheckCircle2 size={16}/> PASSED</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span>Zoning & Environmental</span>
                 <span className="flex items-center gap-1 text-red-500 font-bold"><AlertOctagon size={16}/> FAILED</span>
              </div>
           </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-6">
           <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 border-b border-border pb-2">UN Sust. Development Goals (SDG)</h3>
           <div className="space-y-4">
              <div className="flex justify-between items-center text-sm bg-secondary/50 p-2 rounded">
                 <span className="font-semibold">Goal 9: Industry & Infrastructure</span>
                 <span className="text-green-600 font-bold">Primary Link</span>
              </div>
              <div className="flex justify-between items-center text-sm bg-secondary/50 p-2 rounded">
                 <span className="font-semibold">Goal 11: Sustainable Cities</span>
                 <span className="text-green-600 font-bold">Secondary Link</span>
              </div>
              <div className="flex justify-between items-center text-sm bg-secondary/50 p-2 rounded">
                 <span className="font-semibold">Goal 13: Climate Action</span>
                 <span className="text-red-500 font-bold">Pending Review</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
