// src/pages/ContactPage.jsx
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      alert("Inbound contact notification queued safely.");
      setEmail('');
      setMessage('');
      setSubmitting(false);
    }, 8000);
  };

  return (
    <div className="space-y-8 py-2 text-left font-sans animate-fadeIn">
      
      {/* Page Title Block */}
      <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000000] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="inline-block bg-[#3B52F6] text-white border-2 border-black px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest">
            Corporate Interface
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight flex items-center gap-2.5">
            <HelpCircle size={24} strokeWidth={2.5} className="text-[#3B52F6]" /> Support Support Desk
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Form Panel */}
        <form onSubmit={handleMessageSubmit} className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#000000] space-y-4 lg:col-span-2">
          <h3 className="font-black text-black text-base uppercase tracking-tight border-b-2 border-black pb-2">
            Dispatch Enquiries Node
          </h3>
          
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
              Return Routing Address (Email)
            </label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              required 
              className="w-full bg-white border-2 border-black p-3 text-xs font-bold uppercase placeholder-gray-400 outline-none focus:bg-[#F4F7F2]" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
              Message Frame Body
            </label>
            <textarea 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your inquiry details thoroughly..."
              required 
              rows="5"
              className="w-full bg-white border-2 border-black p-3 text-xs font-bold uppercase placeholder-gray-400 outline-none focus:bg-[#F4F7F2] resize-none" 
            />
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className="w-full bg-[#B9E88A] text-black font-black border-2 border-black py-3.5 shadow-[3px_3px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2"
          >
            {submitting ? "Dispatching..." : <>Submit Correspondence <Send size={12} strokeWidth={2.5} /></>}
          </button>
        </form>

        {/* Right Info Sidebar Panel */}
        <div className="space-y-4 lg:col-span-1">
          <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#3B52F6] space-y-4">
            <h4 className="font-black text-black text-sm uppercase tracking-wider border-b border-black pb-2">
              Directory Locations
            </h4>
            
            <div className="space-y-3.5 text-xs font-semibold">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} strokeWidth={2.5} className="text-[#3B52F6] flex-shrink-0 mt-0.5" />
                <p className="text-gray-800">Conference Centre, Lead City University, Ibadan, Nigeria.</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} strokeWidth={2.5} className="text-[#3B52F6] flex-shrink-0" />
                <span className="font-mono">+234 903 921 7250</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} strokeWidth={2.5} className="text-[#3B52F6] flex-shrink-0" />
                <span className="font-mono">support@mgroups.org</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}