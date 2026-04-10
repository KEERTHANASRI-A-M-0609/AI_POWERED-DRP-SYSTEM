import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Upload, FileText, AlertTriangle, History, Users, Settings, Moon, Sun, LogOut, Bell, Sliders, ShieldCheck, Network, Volume2, Fingerprint
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { useDprStore } from './store/useDprStore';

import Dashboard from './pages/Dashboard';
import UploadDPR from './pages/UploadDPR';
import QualityAnalysis from './pages/QualityAnalysis';
import RiskPrediction from './pages/RiskPrediction';
import Login from './pages/Login';
import ScenarioSimulation from './pages/ScenarioSimulation';
import CompliancePolicy from './pages/CompliancePolicy';
import KnowledgeGraph from './pages/KnowledgeGraph';
import IntegrityEngine from './pages/IntegrityEngine';
import GlobalChatbot from './components/GlobalChatbot';

function Sidebar({ isDark, toggleDark, user, onLogout }) {
  const location = useLocation();
  
  let navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/upload', icon: <Upload size={20} />, label: 'Upload' },
    { path: '/quality', icon: <FileText size={20} />, label: 'Quality Assessment' },
    { path: '/risks', icon: <AlertTriangle size={20} />, label: 'Risk Intelligence' },
    { path: '/history', icon: <History size={20} />, label: 'History' },
    { path: '/simulation', icon: <Sliders size={20} />, label: 'Simulator' },
    { path: '/compliance', icon: <ShieldCheck size={20} />, label: 'Compliance' },
    { path: '/knowledge', icon: <Network size={20} />, label: 'Graph' },
    { path: '/integrity', icon: <Fingerprint size={20} className="text-purple-500" />, label: 'AI Integrity' }
  ];

  if (user?.role === 'admin' || user?.role === 'manager') {
    navItems.push({ path: '/review', icon: <Users size={20} />, label: 'Review' });
  }

  return (
    <div className="w-64 h-screen border-r border-border bg-card flex flex-col fixed left-0 top-0 overflow-y-auto z-40">
      <div className="p-6 pb-4 sticky top-0 bg-card z-10 border-b border-border">
        <h1 className="text-xl font-bold tracking-tight">IntelliDPR</h1>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-4 mb-4">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <div className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  active ? 'bg-primary text-primary-foreground font-semibold shadow-sm' : 'text-muted-foreground hover:bg-secondary hover:text-foreground font-medium'
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto sticky bottom-0 bg-card">
        <div className="flex items-center justify-between mb-4">
          <button onClick={toggleDark} className="p-2 rounded-md hover:bg-secondary text-muted-foreground">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => toast("Settings menu restricted.")} className="p-2 rounded-md hover:bg-secondary text-muted-foreground">
            <Settings size={18} />
          </button>
        </div>
        
        <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-secondary/50 border border-border">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            {user?.name?.substring(0, 1).toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
          <button onClick={onLogout} title="Logout">
            <LogOut size={16} className="text-muted-foreground hover:text-destructive" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Topbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { calculatedData, currentProjectName, notifications, markNotificationsRead } = useDprStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleVoiceSummary = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    window.speechSynthesis.cancel();
    let speechText = `Reporting on ${currentProjectName}. Overall quality assessment is ${calculatedData.viability.toFixed(0)}. Risk level is ${calculatedData.risk.toFixed(0)} percent.`;
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.volume = 1; utterance.rate = 1; utterance.pitch = 1.1;
    utterance.onend = () => setIsPlaying(false);
    setIsPlaying(true);
    toast.success("Voice brief generated.");
    window.speechSynthesis.speak(utterance);
  };

  const generateReport = () => {
    toast.loading('Compiling dynamic AI analytics...', { id: 'report-gen' });
    setTimeout(() => {
      const content = `IntelliDPR Dynamic Report\n=======================\nDocument: ${currentProjectName}\n\nOVERVIEW:\nQuality Assessment: ${calculatedData.viability.toFixed(0)}/100\nFinancial Health: ${calculatedData.financial.toFixed(0)}%\nRisk Architecture: ${calculatedData.risk.toFixed(0)}%\n\nFORECAST DATA:\n` + calculatedData.months.map(m => `- ${m.name}: Risk ${m.risk.toFixed(1)}%, Budget Multiplier ${m.budget}`).join('\n') + `\n\nGenerated autonomously via IntelliDPR logic engine.`;
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentProjectName.replace(/\s+/g, '_')}_Final_Report.txt`;
      link.click();
      toast.success('Report successfully downloaded to your device!', { id: 'report-gen' });
    }, 1500);
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-30 w-full pl-[288px]">
      <div className="flex items-center gap-2">
        <span className="bg-secondary text-foreground text-xs font-semibold px-3 py-1.5 rounded-md border border-border">
          Active: {currentProjectName}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={handleVoiceSummary} className={`p-2 rounded-full border border-border transition-colors ${isPlaying ? 'bg-primary text-primary-foreground animate-pulse' : 'hover:bg-secondary'}`}>
           <Volume2 size={16} />
        </button>

        <div className="relative">
          <button onClick={() => { setNotifOpen(!notifOpen); markNotificationsRead(); }} className="p-2 rounded-full hover:bg-secondary relative">
            <Bell size={20} className="text-foreground" />
            {unreadCount > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background"></span>}
          </button>
          
          {notifOpen && (
             <div className="absolute top-12 right-0 w-72 bg-card border border-border rounded-lg shadow-xl p-2 z-50">
                <h4 className="font-bold text-sm px-2 py-1 mb-1 border-b border-border">Notifications</h4>
                {notifications.map(n => (
                  <div key={n.id} className="p-2 hover:bg-secondary rounded-md cursor-pointer mb-1 relative">
                    {!n.read && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full bg-primary rounded-r-md"></span>}
                    <p className="text-sm font-semibold pl-1">{n.title}</p>
                    <p className="text-xs text-muted-foreground pl-1">{n.message}</p>
                  </div>
                ))}
             </div>
          )}
        </div>
        <button onClick={generateReport} className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-sm hover:opacity-90 transition-opacity">
          Generate Full Report
        </button>
      </div>
    </header>
  );
}

function HistoryPage() {
  const { currentProjectName } = useDprStore();
  return (
    <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Historical Benchmarking</h2>
      <p className="text-muted-foreground text-sm mb-6">Comparing <strong>{currentProjectName}</strong> against matched historic paradigms.</p>
      <div className="space-y-4">
        {['Metro Phase 1', 'Highway Ext. A', 'Urban Transit System'].map((item, i) => (
           <div key={i} className="flex justify-between items-center p-4 border border-border rounded-md hover:bg-secondary transition-colors">
              <div>
                <p className="font-semibold">{item}</p>
                <p className="text-sm text-muted-foreground">Competed {2020 + i} • 94% Similarity Index</p>
              </div>
              <div className="text-right">
                 <p className="text-sm font-bold text-green-600">Cost: Under Budget</p>
                 <button className="text-primary text-xs font-semibold mt-1">View Vector Overlay</button>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
}

function ReviewPage() {
  const { currentProjectName } = useDprStore();
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([{ user: "Admin", text: `I have pre-approved the structural layouts for ${currentProjectName}.`, time: "1 hour ago" }]);
  const submit = (e) => { e.preventDefault(); if(!comment) return; setReviews([{ user: "You", text: comment, time: "Just now" }, ...reviews]); setComment(''); }
  
  return (
    <div className="grid grid-cols-2 gap-6">
       <div className="bg-card border border-border rounded-lg p-6">
         <h2 className="text-xl font-bold mb-4">Collaborative Review</h2>
         <p className="text-sm text-muted-foreground mb-4">Tracking internal discussions for <strong>{currentProjectName}</strong>.</p>
         <form onSubmit={submit} className="flex gap-2 mb-6">
            <input value={comment} onChange={e=>setComment(e.target.value)} type="text" placeholder="Add a comment..." className="flex-1 border border-border bg-background rounded-md px-3 py-2 text-sm outline-none focus:border-primary" />
            <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold">Post</button>
         </form>
         <div className="space-y-4">
            {reviews.map((r, i) => (
               <div key={i} className="p-3 bg-secondary/50 rounded-md border border-border">
                  <div className="flex justify-between"><span className="font-bold text-sm">{r.user}</span><span className="text-xs text-muted-foreground">{r.time}</span></div>
                  <p className="text-sm mt-1">{r.text}</p>
               </div>
            ))}
         </div>
       </div>
    </div>
  )
}

function App() {
  const [isDark, setIsDark] = useState(true);
  const { login, currentUser } = useDprStore();

  React.useEffect(() => {
    if (isDark) { document.documentElement.classList.add('dark'); } 
    else { document.documentElement.classList.remove('dark'); }
  }, [isDark]);

  if (!currentUser) return <Login onLogin={login} />;

  return (
    <Router>
      <div className="flex min-h-screen bg-background text-foreground transition-colors">
        <Toaster position="bottom-center" />
        <GlobalChatbot />
        <Sidebar isDark={isDark} toggleDark={() => setIsDark(!isDark)} user={currentUser} onLogout={() => login(null)} />
        <div className="flex-1 flex flex-col pl-64">
          <Topbar />
          <main className="flex-1 p-6 overflow-y-auto w-full relative z-20">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<UploadDPR />} />
              <Route path="/quality" element={<QualityAnalysis />} />
              <Route path="/risks" element={<RiskPrediction />} />
              <Route path="/simulation" element={<ScenarioSimulation />} />
              <Route path="/compliance" element={<CompliancePolicy />} />
              <Route path="/knowledge" element={<KnowledgeGraph />} />
              <Route path="/integrity" element={<IntegrityEngine />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/review" element={<ReviewPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
export default App;
