// src/pages/AboutPage.jsx
import React from 'react';
import { ShieldCheck, Target, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-12 text-left font-sans animate-fadeIn relative">
      
      {/* Decorative Flyer Corner Cross/Star Accent */}
      <div className="absolute top-0 right-4 text-black text-xl font-bold font-mono select-none pointer-events-none">✦</div>

      {/* Page Title & Context Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-block bg-[#3B52F6] text-white border-2 border-black px-4 py-1.5 font-mono font-bold text-xs uppercase tracking-widest shadow-[2px_2px_0px_#000000]">
          Institutional Mandate
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-black uppercase leading-none">
          About M-Groups
        </h2>
      </div>

      {/* Primary Mandate Container (Heavy Border & Flat Solid Shadow Frame) */}
      <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000000] relative space-y-4">
        <div className="inline-block bg-[#B9E88A] border-2 border-black text-[11px] font-mono font-bold px-3 py-1 uppercase shadow-[2px_2px_0px_#000000]">
          Core Mission Statement ✦
        </div>
        
        <p className="text-black leading-relaxed text-base md:text-lg font-medium font-sans">
          Founded on foundational principles of technological transparency, M-Groups delivers dynamic loan lifecycle tracking systems. We optimize financial access using secure credit computation infrastructure to build a reliable digital framework.
        </p>
      </div>

      {/* Institutional Core Pillars Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        
        {/* Pillar 1: Security (Stark White Block with Black Shadow Offset) */}
        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#000000] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Boxed Icon Badge mimicking event schedule tags */}
            <div className="text-black bg-[#B9E88A] w-10 h-10 border-2 border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#000000]">
              <ShieldCheck size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-black text-black text-base uppercase tracking-tight">Absolute Security</h3>
            <p className="text-gray-800 text-xs font-semibold leading-relaxed">
              Protected by 256-bit financial-grade encryption matrices mapping safe operational data layers across all user nodes.
            </p>
          </div>
        </div>

        {/* Pillar 2: Precision (Stark White Block with Royal Blue Shadow Offset) */}
        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#3B52F6] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Boxed Icon Badge using the high-contrast Electric Blue element */}
            <div className="text-white bg-[#3B52F6] w-10 h-10 border-2 border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#000000]">
              <Target size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-black text-black text-base uppercase tracking-tight">Algorithmic Precision</h3>
            <p className="text-gray-800 text-xs font-semibold leading-relaxed">
              Our advanced calculation architecture ensures precise credit evaluation variables with zero structural hidden administrative fees.
            </p>
          </div>
        </div>

        {/* Pillar 3: Scale (Stark White Block with Black Shadow Offset) */}
        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#000000] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Boxed Icon Badge using a warning contrast accent */}
            <div className="text-black bg-[#FFFF00] w-10 h-10 border-2 border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#000000]">
              <Users size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-black text-black text-base uppercase tracking-tight">Empowering Scale</h3>
            <p className="text-gray-800 text-xs font-semibold leading-relaxed">
              Tailored specifically to unlock immediate capital potential across commercial micro-vendors, local assets, and student projects.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}