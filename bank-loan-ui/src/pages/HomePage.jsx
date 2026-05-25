// src/pages/HomePage.jsx
import React from 'react';
// import { Link } from 'react-serif';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight, Smartphone, Layers, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-[82vh] flex flex-col justify-between overflow-hidden relative font-sans space-y-12 pb-2">
      
      {/* Brutalist Grid Background Sheet Accent */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none select-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Decorative Flyer Starburst elements on edge boundaries */}
      <div className="absolute top-10 left-4 text-black text-xl z-10 hidden sm:block font-serif select-none pointer-events-none">✦</div>
      <div className="absolute bottom-40 right-6 text-black text-2xl z-10 hidden sm:block font-serif select-none pointer-events-none">✦</div>

      {/* CENTER COMPOSITION BLOCK: Typography & App Links */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-12 max-w-3xl mx-auto space-y-6 z-10">
        
        {/* Inline Structured Heading Presenter Tag */}
        <div className="border-2 border-black bg-white px-4 py-1.5 font-mono font-bold text-xs uppercase tracking-widest shadow-[2px_2px_0px_#000000]">
          Approved Workspace Environment
        </div>

        {/* Stark Massive Neo-Brutalist Heading Block */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-black tracking-tight leading-[0.95] uppercase">
          Simple and <br />
          <span className="bg-[#3B52F6] text-white border-2 border-black px-4 inline-block my-1 shadow-[4px_4px_0px_#000000]">
            Safe Banking
          </span>
        </h1>
        
        <p className="text-black text-sm sm:text-base max-w-xl font-medium leading-relaxed pt-2">
          Access secure short-term credit facilities with crystal clear parameters, automated lifecycle tracking, and zero hidden administrative fees.
        </p>

        {/* Action Controls Group: Emulates horizontal store application layout badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          
          <RouterLink 
            to="/register" 
            className="bg-[#B9E88A] text-black border-2 border-black font-black text-xs uppercase tracking-wider px-6 py-3.5 shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2"
          >
            <Smartphone size={16} strokeWidth={2.5} />
            Open Account
          </RouterLink>

          <RouterLink 
            to="/services" 
            className="bg-white text-black border-2 border-black font-black text-xs uppercase tracking-wider px-6 py-3.5 shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2"
          >
            <Layers size={15} strokeWidth={2.5} className="text-[#3B52F6]" />
            Explore Tiers
          </RouterLink>

        </div>
      </div>

      {/* RISING LOWER PANEL MODULE: Replicates the light information base layer frame */}
      <div className="w-full z-10 pt-4">
        <div className="bg-white border-4 border-black p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[6px_6px_0px_#000000] text-left">
          
          {/* Inner Content Header */}
          <div className="space-y-2 max-w-xl">
            {/* OPay / Lead City Highlight Block Rule */}
            <div className="inline-block bg-[#B9E88A] border border-black text-[10px] font-mono font-bold px-2 py-0.5 uppercase mb-1">
              Feature Matrix
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight uppercase">
              Easy payments with one tap
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
              Send and request funds easily through your unified operational dashboard. Monitor active repayment milestones with instant digital system receipts.
            </p>
          </div>

          {/* Hard-Boxed Side Verification Status Tags */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto text-xs font-black uppercase tracking-wide">
            
            <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-3 shadow-[3px_3px_0px_#3B52F6]">
              <CheckCircle2 size={16} strokeWidth={2.5} className="text-[#2563EB]" />
              <span>Balance Sync Active</span>
            </div>

            <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-3 shadow-[3px_3px_0px_#B9E88A]">
              <ShieldCheck size={16} strokeWidth={2.5} className="text-black" />
              <span>Compliance Secure</span>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}