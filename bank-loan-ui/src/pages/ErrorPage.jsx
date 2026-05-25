// src/pages/ErrorPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertOctagon, CornerUpLeft } from 'lucide-react';

export default function ErrorPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 font-sans text-left animate-fadeIn">
      <div className="w-full max-w-md bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000000] space-y-6 relative">
        
        {/* Star Burst Accent Deco */}
        <div className="absolute top-4 right-4 font-mono font-bold text-black text-lg select-none">✦</div>
        
        <div className="flex items-center gap-4 border-b-4 border-black pb-4">
          <div className="bg-[#FF6B6B] text-black border-2 border-black p-3 shadow-[2px_2px_0px_#000000]">
            <AlertOctagon size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-black leading-none">404</h1>
            <span className="text-[10px] font-mono font-black uppercase text-gray-500 tracking-wider">
              Segment Unallocated
            </span>
          </div>
        </div>

        <p className="text-sm text-black font-semibold leading-relaxed">
          The requested system route point maps directly to an unallocated or dead segment address inside the core M-Groups portal database tree.
        </p>

        <div className="pt-2">
          <Link 
            to="/" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#B9E88A] text-black border-2 border-black font-black text-xs uppercase tracking-wider px-6 py-3.5 shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <CornerUpLeft size={14} strokeWidth={2.5} />
            Return to Root Block
          </Link>
        </div>

      </div>
    </div>
  );
}