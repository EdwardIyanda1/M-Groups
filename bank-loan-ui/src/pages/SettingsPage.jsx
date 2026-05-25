// src/pages/SettingsPage.jsx
import React from 'react';
import { Settings, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-[65vh] flex items-center justify-center px-4 font-sans text-left animate-fadeIn">
      <div className="w-full max-w-md bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000000] relative">
        
        {/* ✦ Star Burst Accent Icon */}
        <div className="absolute top-4 right-4 font-mono font-bold text-black text-xs select-none">✦</div>

        {/* Header Section */}
        <div className="border-b-4 border-black pb-4 mb-6 space-y-2">
          <div className="inline-block bg-[#3B52F6] text-white border-2 border-black px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest">
            Configuration Node
          </div>
          <h2 className="text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2.5">
            <Settings size={24} strokeWidth={2.5} className="text-[#3B52F6]" /> Control Parameters
          </h2>
        </div>

        {/* Setting Parameters Form Body */}
        <div className="space-y-4">
          
          {/* Row Item 1 */}
          <div className="bg-white border-2 border-black p-4 flex justify-between items-center shadow-[3px_3px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000000] transition-all">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wide text-black pr-4 leading-tight">
              Asynchronous Email Dispatch Notification
            </span>
            <input 
              type="checkbox" 
              defaultChecked 
              className="w-5 h-5 border-2 border-black bg-white rounded-none appearance-none checked:bg-[#B9E88A] checked:before:content-['✓'] checked:before:text-black checked:before:font-black checked:before:text-xs checked:before:flex checked:before:items-center checked:before:justify-center cursor-pointer outline-none transition-colors flex-shrink-0"
            />
          </div>

          {/* Row Item 2 */}
          <div className="bg-white border-2 border-black p-4 flex justify-between items-center shadow-[3px_3px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000000] transition-all">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wide text-black pr-4 leading-tight">
              Two-Factor Authentication Core Mapping
            </span>
            <input 
              type="checkbox" 
              className="w-5 h-5 border-2 border-black bg-white rounded-none appearance-none checked:bg-[#B9E88A] checked:before:content-['✓'] checked:before:text-black checked:before:font-black checked:before:text-xs checked:before:flex checked:before:items-center checked:before:justify-center cursor-pointer outline-none transition-colors flex-shrink-0"
            />
          </div>

          {/* Primary Action Button */}
          <button 
            onClick={() => alert("Global configuration variables written to system memory.")} 
            className="w-full bg-[#B9E88A] text-black font-black border-2 border-black py-4 rounded-none text-xs uppercase tracking-wider shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 mt-4"
          >
            Flush Parameter Mutators
            <Save size={14} strokeWidth={2.5} />
          </button>

        </div>

      </div>
    </div>
  );
}