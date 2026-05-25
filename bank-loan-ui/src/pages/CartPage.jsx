// src/pages/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const [stagedPackages, setStagedPackages] = useState([]);
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('loan_cart')) || [];
    setStagedPackages(data);
  }, []);

  const clearStagedIndex = (id) => {
    const updated = stagedPackages.filter(item => item.id !== id);
    setStagedPackages(updated);
    localStorage.setItem('loan_cart', JSON.stringify(updated));
  };

  const handleCheckout = () => {
    alert("Consolidated batch processing request dispatched successfully.");
    localStorage.removeItem('loan_cart');
    setStagedPackages([]);
  };

  return (
    <div className="max-w-xl mx-auto py-4 px-2 font-sans text-left animate-fadeIn">
      <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000000] space-y-6">
        
        {/* Header Block */}
        <div className="border-b-4 border-black pb-4 space-y-2">
          <div className="inline-block bg-[#3B52F6] text-white border-2 border-black px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest">
            Staging Node
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight flex items-center gap-2.5">
            <ShoppingCart size={24} strokeWidth={2.5} className="text-[#3B52F6]" /> Selection Basket
          </h2>
        </div>

        {stagedPackages.length === 0 ? (
          <div className="border-2 border-dashed border-black py-12 text-center bg-[#F4F7F2]">
            <p className="text-xs font-mono font-black uppercase tracking-wider text-gray-500">
              Staging collection arrays evaluate to empty values.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {stagedPackages.map(item => (
              <div 
                key={item.id} 
                className="bg-white border-2 border-black p-4 flex justify-between items-center shadow-[3px_3px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000000] transition-all"
              >
                <div>
                  <h4 className="font-black text-black text-sm sm:text-base uppercase tracking-tight">
                    {item.name}
                  </h4>
                  <span className="inline-block bg-[#B9E88A] border border-black text-[9px] font-mono font-bold px-2 py-0.5 mt-1.5 uppercase">
                    {item.interest_rate}% Interest Tier
                  </span>
                </div>
                <button 
                  onClick={() => clearStagedIndex(item.id)} 
                  aria-label="Purge Item Index"
                  className="bg-[#FF6B6B] text-black border-2 border-black p-2.5 shadow-[2px_2px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                >
                  <Trash2 size={15} strokeWidth={2.5} />
                </button>
              </div>
            ))}
            
            {/* Primary Action Dispatch Button */}
            <button 
              onClick={handleCheckout} 
              className="w-full bg-[#B9E88A] text-black font-black border-2 border-black py-4 rounded-none text-xs uppercase tracking-wider shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 mt-2"
            >
              Initialize Complete Batch Despatch 
              <ArrowRight size={14} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}