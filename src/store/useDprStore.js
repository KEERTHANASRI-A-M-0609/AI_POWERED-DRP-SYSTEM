import { create } from 'zustand';

// Initial base state
const baseAnalysis = {
  viability: 73,
  financial: 65,
  risk: 65, 
  completeness: 92,
  costImpact: 2400000,
  months: [
    { name: 'M1', risk: 45, budget: 100 },
    { name: 'M2', risk: 50, budget: 110 },
    { name: 'M3', risk: 55, budget: 115 },
    { name: 'M4', risk: 65, budget: 130 },
    { name: 'M5', risk: 70, budget: 145 },
  ]
};

export const useDprStore = create((set, get) => ({
  isStreamComplete: true, // Let the static content show initially without refreshing until upload happens
  isAnalyzing: false,
  currentProjectName: "Metro Phase II Architecture",
  currentUser: null,
  notifications: [
    { id: 1, title: 'System Update', message: 'DPR AI Engine v2.0 is online.', read: false }
  ],

  login: (user) => set({ currentUser: user }),
  logout: () => set({ currentUser: null }),

  markNotificationsRead: () => set(state => ({
     notifications: state.notifications.map(n => ({...n, read: true}))
  })),

  uploadFiles: (files) => {
    // Make the system dynamic based on the file name
    const fileName = files[0]?.name || "New Project DPR";
    // Randomize base stats slightly to make it feel "dynamic" per file
    const randMod = Math.floor(Math.random() * 20) - 10;
    
    set({
      currentProjectName: fileName,
      isStreamComplete: false,
      isAnalyzing: true,
      budgetModifier: 0,
      timelineModifier: 0,
      calculatedData: {
        ...baseAnalysis,
        viability: Math.min(100, Math.max(0, baseAnalysis.viability + randMod)),
        risk: Math.min(100, Math.max(0, baseAnalysis.risk - randMod)),
        financial: Math.min(100, Math.max(0, baseAnalysis.financial + randMod))
      },
      notifications: [
        { id: Date.now(), title: 'Analysis Complete', message: `Engine finished analyzing ${fileName}`, read: false },
        ...get().notifications
      ]
    });
  },

  // Live Parameters
  budgetModifier: 0, 
  timelineModifier: 0,
  calculatedData: { ...baseAnalysis },

  startAnalysisStream: () => {
    set({ isAnalyzing: true, isStreamComplete: false });
    setTimeout(() => {
      set({ isAnalyzing: false, isStreamComplete: true });
    }, 2500);
  },

  updateSimulation: (budgetOffset, timelineOffset) => {
    const { budgetModifier, timelineModifier, calculatedData } = get();
    if (budgetOffset === budgetModifier && timelineOffset === timelineModifier) return;

    const baseRisk = 65; // base constant for the math
    const newRiskBase = baseRisk - (budgetOffset * 0.4) + (timelineOffset * 1.5);
    const simulatedRisk = Math.min(100, Math.max(10, newRiskBase));
    const newViability = Math.max(10, 100 - (simulatedRisk * 0.4) + (budgetOffset * 0.2));
    const newFinancial = Math.max(10, 65 + (budgetOffset * 0.5) - (timelineOffset * 0.8));

    const updatedMonths = baseAnalysis.months.map((m, idx) => ({
       ...m,
       risk: Math.max(10, Math.min(100, m.risk - (budgetOffset * 0.2) + (timelineOffset * (1 + idx*0.2)))),
       budget: m.budget + budgetOffset
    }));

    set({
       budgetModifier: budgetOffset,
       timelineModifier: timelineOffset,
       calculatedData: {
         ...calculatedData,
         risk: simulatedRisk,
         viability: newViability,
         financial: newFinancial,
         costImpact: baseAnalysis.costImpact * (1 + (budgetOffset / 100)) * (1 + (timelineOffset * 0.05)),
         months: updatedMonths
       }
    });
  },
  
  resetSimulation: () => set({ 
    budgetModifier: 0, 
    timelineModifier: 0, 
    calculatedData: { ...baseAnalysis } 
  })
}));
