import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';
import { useDprStore } from '../store/useDprStore';

export default function GlobalChatbot() {
  const { currentProjectName, calculatedData, budgetModifier, timelineModifier } = useDprStore();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatQuery, setChatQuery] = useState('');
  const [messages, setMessages] = useState([
     { sender: 'ai', text: `Hello. I am reviewing ${currentProjectName}. How can I assist you with this document?` }
  ]);

  const handleChat = (e) => {
    e.preventDefault();
    const query = chatQuery.trim();
    if (!query) return;
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setChatQuery('');
    
    setTimeout(() => {
       const lowerQ = query.toLowerCase();
       const isAtRisk = calculatedData.risk > 75;
       let aiResponse = "";

       if (lowerQ.includes('why') && lowerQ.includes('risk')) {
         aiResponse = isAtRisk 
            ? `The risk is currently high (${calculatedData.risk.toFixed(1)}%) because the timeline adjustment is straining the budget limit. Expanding the budget or reducing the timeline will stabilize this.`
            : `The project risk is well-managed at ${calculatedData.risk.toFixed(1)}%. Budget and timeline inputs are currently balanced.`;
       } 
       else if (lowerQ.includes('improve') || lowerQ.includes('budget')) {
         aiResponse = `To improve the financial score, consider decreasing your timeline extension. Extra months compound labor overhead.`;
       }
       else if (lowerQ.includes('hello') || lowerQ.includes('hi')) {
         aiResponse = `Hello! I am your IntelliDPR Assistant. I am tracking ${currentProjectName}. Ask me anything!`;
       }
       else {
         aiResponse = `Analyzing ${currentProjectName} context... Current risk is ${calculatedData.risk.toFixed(1)}%. Did you want to identify specific bottlenecks?`;
       }
       setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
       <AnimatePresence>
          {chatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="w-[320px] bg-background border border-border rounded-lg shadow-xl mb-4 overflow-hidden flex flex-col h-[400px]"
            >
              <div className="border-b border-border p-3 flex justify-between items-center bg-secondary/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <h4 className="font-semibold text-sm">Assistant</h4>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-muted-foreground hover:text-foreground">✕</button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                 {messages.map((msg, i) => (
                   <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 text-sm rounded-lg ${msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-secondary text-foreground rounded-tl-none'}`}>
                         {msg.text}
                      </div>
                   </div>
                 ))}
              </div>

              <div className="p-3 border-t border-border">
                <form onSubmit={handleChat} className="flex gap-2">
                  <input 
                    type="text" 
                    value={chatQuery}
                    onChange={(e) => setChatQuery(e.target.value)}
                    placeholder="Type a message..." 
                    className="flex-1 bg-transparent border border-border rounded-md px-3 py-1.5 text-sm outline-none focus:border-primary"
                  />
                  <button type="submit" className="bg-primary text-primary-foreground p-1.5 rounded-md hover:opacity-90">
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
       </AnimatePresence>
       
       <button 
         onClick={() => setChatOpen(!chatOpen)}
         className="h-12 w-12 bg-foreground text-background rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
       >
         {chatOpen ? '✕' : <MessageSquare size={20} />}
       </button>
    </div>
  );
}
