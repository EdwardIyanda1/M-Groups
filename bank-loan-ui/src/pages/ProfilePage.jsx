// src/pages/ProfilePage.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-md mx-auto py-10 px-2 font-sans text-left animate-fadeIn">
      <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000000] space-y-6 relative">
        
        {/* Star Burst Deco */}
        <div className="absolute top-4 right-4 font-mono font-bold text-black text-xs">✦</div>

        <div className="flex items-center gap-4 border-b-4 border-black pb-5">
          <div className="w-12 h-12 border-2 border-black bg-[#B9E88A] flex items-center justify-center font-mono font-black text-black text-base shadow-[2px_2px_0px_#000000]">
            {user?.username ? user.username[0].toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-xl font-black text-black uppercase tracking-tight flex items-center gap-1.5">
              {user?.username} <CheckCircle2 size={16} strokeWidth={2.5} className="text-[#3B52F6]" />
            </h2>
            <div className="inline-block bg-black text-white font-mono text-[9px] font-bold px-2 py-0.5 mt-0.5 uppercase tracking-wider">
              Verification Tier Level 1 Active
            </div>
          </div>
        </div>

        <div className="space-y-3 font-mono text-xs font-bold uppercase tracking-wider">
          
          <div className="flex justify-between items-center bg-[#F4F7F2] border-2 border-black p-3 shadow-[2px_2px_0px_#000000]">
            <span className="font-sans font-black text-gray-500 text-[10px]">Identity Tag:</span>
            <span className="text-black font-black font-mono">{user?.username}</span>
          </div>

          <div className="flex justify-between items-center bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000000]">
            <span className="font-sans font-black text-gray-500 text-[10px]">Permission Clear:</span>
            <span className="text-[#3B52F6] font-black font-mono">{user?.role || 'N/A'}</span>
          </div>

          <div className="flex justify-between items-center bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000000]">
            <span className="font-sans font-black text-gray-500 text-[10px]">System Status:</span>
            <span className="text-black font-black flex items-center gap-1.5 bg-[#B9E88A] border border-black px-2 py-0.5 text-[10px]">
              <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping" /> Synchronized
            </span>
          </div>

        </div>

        <div className="pt-2 text-[9px] font-mono font-black text-gray-400 text-center uppercase tracking-widest flex items-center justify-center gap-1">
          <ShieldCheck size={12} strokeWidth={2.5} /> Central Database Token Validated
        </div>

      </div>
    </div>
  );
}