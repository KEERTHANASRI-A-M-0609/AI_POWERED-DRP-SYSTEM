import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, ChevronRight } from 'lucide-react';
import { useDprStore } from '../store/useDprStore';

export default function Login({ onLogin }) {
  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useDprStore();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const uEmail = email || role + "@intellidpr.corp";
      const user = {
        name: uEmail.split('@')[0],
        email: uEmail,
        role: role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`
      };
      login(user);
      onLogin(user);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-card border border-border shadow-md rounded-lg relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
            <Brain size={24} className="text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">IntelliDPR</h1>
          <p className="text-sm text-muted-foreground mt-1 text-center">Sign in to your workplace</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Role Selection</label>
            <div className="grid grid-cols-3 gap-2">
              {['admin', 'manager', 'reviewer'].map((r) => (
                <button
                  key={r} type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 text-xs font-bold rounded-md border transition-all capitalize ${
                    role === r 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'bg-transparent border-border text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          
          <div>
             <label className="block text-sm font-medium mb-1">Corporate Email</label>
             <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder={`${role}@workspace.com`} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">Password</label>
             <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-foreground text-background font-bold py-3 mt-4 rounded-md shadow-sm hover:opacity-90 flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : <>Access Workspace <ChevronRight size={16}/></>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
