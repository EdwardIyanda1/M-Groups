// src/pages/ServicesPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Award, Layers, Plus, ShieldCheck, CheckCircle2, Sliders, AlertCircle } from 'lucide-react';

export default function ServicesPage() {
  const { API_BASE } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Localized state for the active product calculator simulation
  const [calcAmount, setCalcAmount] = useState(250000);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/products/`);
        if (!res.ok) throw new Error("Could not populate system credit catalog.");
        const data = await res.json();
        setProducts(data);
        if (data.length > 0) {
          setActiveCardId(data[0].id); // Auto-expand the primary tier
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [API_BASE]);

  const addToCart = (prod) => {
    let currentCart = JSON.parse(localStorage.getItem('loan_cart')) || [];
    if (!currentCart.some(item => item.id === prod.id)) {
      currentCart.push(prod);
      localStorage.setItem('loan_cart', JSON.stringify(currentCart));
      alert(`${prod.name} has been added to your staging queue.`);
    } else {
      alert("This facility is already staged within your selection basket.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="w-8 h-8 border-4 border-black border-t-[#3B52F6] rounded-full animate-spin" />
        <p className="text-black font-mono text-xs uppercase tracking-widest font-black">Querying structural catalogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-12 bg-[#FF6B6B]/10 border-2 border-[#FF6B6B] text-black text-xs font-bold p-4 flex items-start gap-2 shadow-[2px_2px_0px_#000000]">
        <AlertCircle className="flex-shrink-0 mt-0.5" size={16} strokeWidth={2.5} />
        <p>Catalog Synchronization Failure: {error}</p>
      </div>
    );
  }

  // Flat color array rotation matching the accent block system from the flyers
  const brutalistBadges = ['bg-[#B9E88A]', 'bg-[#FFFF00]', 'bg-[#3B52F6] text-white'];

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-2 text-left font-sans animate-fadeIn relative">
      
      {/* ✦ Icon Accent Marker */}
      <div className="absolute -top-4 right-4 text-black text-xl font-bold font-mono select-none pointer-events-none">✦</div>

      {/* 1. Page Section Navigation Header Box */}
      <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000000] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="inline-block bg-[#3B52F6] text-white border-2 border-black px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest">
            Available Facilities
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight flex items-center gap-2.5">
            <Award size={24} strokeWidth={2.5} className="text-[#3B52F6]" /> Credit Catalog
          </h2>
        </div>
      </div>

      {/* 2. Interactive Card Deck Layout Array */}
      {products.length === 0 ? (
        <div className="text-center py-16 border-4 border-dashed border-black bg-white shadow-[4px_4px_0px_#000000]">
          <p className="text-xs font-mono font-black uppercase tracking-wider text-gray-400">
            No active credit profiles defined in system database rows.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {products.map((prod, index) => {
            const isExpanded = activeCardId === prod.id;
            
            // Mathematical calculations for the active inline instance
            const currentRateFactor = parseFloat(prod.interest_rate || 0) / 100;
            const interestPayout = calcAmount * currentRateFactor;
            const absoluteRepayment = calcAmount + interestPayout;

            return (
              <div 
                key={prod.id}
                className={`bg-white border-2 border-black transition-all duration-200 ${
                  isExpanded 
                    ? 'shadow-[6px_6px_0px_#3B52F6] translate-x-[-2px] translate-y-[-2px]' 
                    : 'shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000000]'
                }`}
              >
                {/* Visible Card Trigger Header Panel */}
                <div 
                  onClick={() => {
                    setActiveCardId(isExpanded ? null : prod.id);
                    setCalcAmount(250000); // Reset standard tracker baseline value on toggle shift
                  }}
                  className="p-5 flex justify-between items-center cursor-pointer select-none gap-4 bg-white"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 border-2 border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#000000] flex-shrink-0 ${
                      isExpanded ? 'bg-[#3B52F6] text-white' : 'bg-[#F4F7F2] text-black'
                    }`}>
                      <Layers size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="font-black text-black tracking-tight text-sm sm:text-base uppercase leading-tight">
                        {prod.name}
                      </h3>
                      <span className="block font-mono font-bold text-gray-400 text-[9px] uppercase tracking-wider mt-0.5">
                        Tier Module: MGP-T00{prod.id}
                      </span>
                    </div>
                  </div>

                  {/* Brutalist Hard-Boxed Status Flag Block */}
                  <div className="flex-shrink-0">
                    {/* FIXED: Removed the invalid constant variable assignment expression inside this template string */}
                    <span className={`border-2 border-black font-mono font-black text-[10px] uppercase px-3 py-1.5 shadow-[2px_2px_0px_#000000] ${brutalistBadges[index % brutalistBadges.length]}`}>
                      {prod.interest_rate}% Fixed Rate
                    </span>
                  </div>
                </div>

                {/* 3. Dropdown Context Drawer */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-3 border-t-2 border-black bg-white space-y-5 animate-fadeIn">
                    
                    {/* Facility Summary Description block */}
                    <div className="space-y-2">
                      <span className="block text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">
                        Structural Guidelines:
                      </span>
                      <p className="text-xs sm:text-sm text-gray-800 font-semibold leading-relaxed border-l-4 border-black pl-3 py-0.5 bg-[#F4F7F2]/60">
                        {prod.description}
                      </p>
                    </div>

                    {/* Hard-Boxed Calculation Environment */}
                    <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#000000] space-y-4">
                      <div className="flex justify-between items-center border-b-2 border-black pb-2">
                        <span className="text-[10px] font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                          ✦ Calculator Matrix Frame
                        </span>
                        <span className="text-[9px] font-mono font-black text-white bg-black px-2 py-0.5 uppercase tracking-wider">
                          30-Day Period
                        </span>
                      </div>

                      <div className="space-y-3.5">
                        <div className="flex justify-between items-center text-xs font-mono font-black uppercase tracking-wide text-black">
                          <span>Principal Target Capital</span>
                          <span className="bg-[#B9E88A] border border-black px-2 py-0.5 text-xs font-mono shadow-[1px_1px_0px_#000000]">
                            ₦{calcAmount.toLocaleString()}
                          </span>
                        </div>
                        <input 
                          type="range" 
                          min="50000" 
                          max="1000000" 
                          step="25000"
                          value={calcAmount}
                          onChange={(e) => setCalcAmount(parseInt(e.target.value))}
                          className="w-full h-2 bg-[#F4F7F2] border border-black rounded-none appearance-none cursor-pointer accent-[#3B52F6]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2 font-mono font-black text-xs border-t border-gray-100">
                        <div className="space-y-0.5">
                          <span className="text-gray-400 block font-sans font-black text-[9px] uppercase tracking-wider">Accrued Interest</span>
                          <span className="text-black text-sm">₦{interestPayout.toLocaleString()}</span>
                        </div>
                        <div className="space-y-0.5 text-right">
                          <span className="text-gray-400 block font-sans font-black text-[9px] uppercase tracking-wider">Gross Remittance</span>
                          <span className="text-[#3B52F6] text-sm">₦{absoluteRepayment.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Operational Guard Verification Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] font-black uppercase tracking-wider text-black">
                      <div className="flex items-center gap-2 bg-white border-2 border-black px-3.5 py-3 shadow-[2px_2px_0px_#000000]">
                        <CheckCircle2 size={15} strokeWidth={2.5} className="text-[#3B52F6] flex-shrink-0" />
                        <span>Instant Ledger Sync</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white border-2 border-black px-3.5 py-3 shadow-[2px_2px_0px_#B9E88A]">
                        <ShieldCheck size={15} strokeWidth={2.5} className="text-black flex-shrink-0" />
                        <span>Terms Fully Compliant</span>
                      </div>
                    </div>

                    {/* Action Execution Button */}
                    <button
                      type="button"
                      onClick={() => addToCart(prod)}
                      className="w-full bg-[#B9E88A] text-black border-2 border-black font-black text-xs uppercase tracking-wider py-4 shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      Stage Package Entry
                      <Plus size={14} strokeWidth={2.5} />
                    </button>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
    </div>
  );
}