// src/pages/SearchPage.jsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const [filterQuery, setFilterQuery] = useState('');
  const [systemRegistry] = useState([
    { ref: 'APX-771', type: 'Agricultural Asset Inflow Portfolio', valuation: '₦450,000' },
    { ref: 'APX-994', type: 'Retail Merchant Supply Credit', valuation: '₦1,200,000' }
  ]);

  const expressionsFiltered = systemRegistry.filter(entry => 
    entry.type.toLowerCase().includes(filterQuery.toLowerCase()) || entry.ref.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto space-y-6 text-left font-sans animate-fadeIn">
      
      {/* 1. Header Module */}
      <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000000] space-y-2 relative">
        <div className="absolute top-4 right-4 font-mono font-bold text-black text-xs select-none">✦</div>
        <div className="inline-block bg-[#3B52F6] text-white border-2 border-black px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest">
          Query Engine Node
        </div>
        <h2 className="text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2">
          <Search size={22} strokeWidth={2.5} className="text-[#3B52F6]" /> Search Registry
        </h2>
      </div>

      {/* 2. Neo-Brutalist Search Field Input Track */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="FILTER THROUGH SYSTEM REGISTRY INDICES..." 
          value={filterQuery} 
          onChange={(e) => setFilterQuery(e.target.value)} 
          className="w-full bg-white border-2 border-black p-4 pl-11 text-xs font-bold font-mono placeholder-gray-400 outline-none uppercase shadow-[4px_4px_0px_#000000] focus:bg-[#F4F7F2] focus:translate-x-[-1px] focus:translate-y-[-1px] focus:shadow-[5px_5px_0px_#000000] transition-all"
        />
        <Search className="absolute left-4 top-4 text-black" size={16} strokeWidth={2.5} />
      </div>

      {/* 3. Output Data Row Array List */}
      <div className="space-y-3.5">
        {expressionsFiltered.length === 0 ? (
          <div className="border-2 border-dashed border-black py-14 text-center bg-white shadow-[2px_2px_0px_#000000]">
            <p className="text-xs font-mono font-black uppercase tracking-wider text-gray-400">
              Zero matching data tuples found mirroring input pattern.
            </p>
          </div>
        ) : (
          expressionsFiltered.map((row, idx) => (
            <div 
              key={idx} 
              className="bg-white border-2 border-black p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
            >
              <div className="flex items-start sm:items-center gap-3 text-left">
                {/* Visual Accent Pin */}
                <div className="w-6 h-6 border-2 border-black bg-[#B9E88A] flex items-center justify-center text-black font-mono font-bold text-[10px] shadow-[1px_1px_0px_#000000] flex-shrink-0 select-none">
                  ✦
                </div>
                <div>
                  <span className="font-mono text-xs font-black text-[#3B52F6] block sm:inline-block sm:mr-2">
                    [{row.ref}]
                  </span>
                  <span className="text-xs font-black uppercase text-black tracking-tight">
                    {row.type}
                  </span>
                </div>
              </div>
              
              {/* Valuation Field Label Box */}
              <div className="font-mono font-black text-black text-sm bg-[#F4F7F2] sm:bg-transparent p-2 sm:p-0 border-t sm:border-0 border-black flex justify-between sm:block">
                <span className="sm:hidden font-sans font-black text-[9px] text-gray-400 uppercase tracking-wider self-center">Valuation:</span>
                <span className="bg-white sm:bg-transparent border sm:border-0 border-black px-2 py-0.5 sm:p-0 shadow-[1px_1px_0px_#000000] sm:shadow-none">
                  {row.valuation}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}