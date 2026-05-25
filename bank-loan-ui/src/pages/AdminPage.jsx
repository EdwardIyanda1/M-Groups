// src/pages/AdminPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Briefcase, ShieldCheck, XCircle, User, AlertOctagon, ArrowUpRight } from 'lucide-react';

export default function AdminPage() {
  const { user, API_BASE } = useContext(AuthContext);
  const [allLoans, setAllLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadGlobalRegistry = async () => {
    try {
      const res = await fetch(`${API_BASE}/loans/`);
      if (res.ok) { 
        setAllLoans(await res.json()); 
      }
    } catch (err) { 
      print(err); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (user?.role === 'manager') loadGlobalRegistry(); }, [user]);

  const mutateStatus = async (loanId, targetState) => {
    try {
      const res = await fetch(`${API_BASE}/loans/${loanId}/status/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: targetState })
      });
      if (res.ok) loadGlobalRegistry();
    } catch (err) { 
      print(err); 
    }
  };

  if (user?.role !== 'manager') {
    return (
      <div className="max-w-md mx-auto my-16 bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000000] text-left space-y-4">
        <div className="text-black bg-[#FF6B6B] w-12 h-12 border-2 border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#000000]">
          <AlertOctagon size={24} strokeWidth={2.5} />
        </div>
        <h3 className="font-black text-xl text-black uppercase tracking-tight">Security Restriction</h3>
        <p className="text-xs text-gray-800 font-semibold leading-relaxed">
          Your active account token lacks the required clearing parameters to execute lookups over this administrative control frame.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="w-8 h-8 border-4 border-black border-t-[#3B52F6] rounded-full animate-spin" />
        <p className="text-black font-mono text-xs uppercase tracking-widest font-black">Syncing ledger records...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-2 text-left font-sans animate-fadeIn relative">
      
      {/* 1. Header Control Panel */}
      <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000000] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative">
        <div className="space-y-2">
          <div className="inline-block bg-[#3B52F6] text-white border-2 border-black px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest">
            Operations Terminal
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight flex items-center gap-2.5">
            <Briefcase size={24} strokeWidth={2.5} className="text-[#3B52F6]" /> Admin Console
          </h2>
        </div>
        
        <div className="bg-[#B9E88A] border-2 border-black px-4 py-2 font-mono text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#000000] self-end sm:self-center">
          Total Entries: {allLoans.length}
        </div>
      </div>

      {/* 2. Unified Grid Ledger: Fluid presentation layer for all sizes */}
      {allLoans.length === 0 ? (
        <div className="text-center py-16 border-4 border-dashed border-black bg-white">
          <p className="text-xs sm:text-sm font-mono font-black uppercase tracking-wider text-gray-400">
            Zero active application files loaded inside database rows.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allLoans.map(loan => (
            <div 
              key={loan.id} 
              className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between space-y-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
            >
              <div className="space-y-3">
                {/* Applicant Reference Identifiers */}
                <div className="flex justify-between items-center border-b-2 border-black pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-black bg-[#B9E88A] flex items-center justify-center font-mono font-bold text-black text-[10px] shadow-[1px_1px_0px_#000000]">
                      {loan.user__username[0].toUpperCase()}
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider text-black">{loan.user__username}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#3B52F6] bg-[#3B52F6]/5 border border-black px-2 py-0.5">
                    REF-00{loan.id}
                  </span>
                </div>
                
                {/* Justification Box Statement */}
                <div className="space-y-1">
                  <span className="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Statement of Justification:</span>
                  <p className="text-xs text-gray-800 font-semibold leading-relaxed italic">
                    "{loan.purpose}"
                  </p>
                </div>
              </div>

              {/* Lower Section Value Indicators & State Mutation Controls */}
              <div className="flex justify-between items-end pt-2 border-t border-gray-100">
                <div className="space-y-0.5">
                  <span className="block text-[8px] font-mono font-bold uppercase text-gray-400 tracking-wider">Required Principle</span>
                  <p className="text-base font-mono font-black text-black">₦{parseFloat(loan.amount).toLocaleString()}</p>
                </div>

                <div className="flex gap-2">
                  {loan.status === 'Pending' ? (
                    <>
                      <button 
                        onClick={() => mutateStatus(loan.id, 'Approved')} 
                        className="bg-[#B9E88A] text-black border-2 border-black font-black text-[11px] uppercase tracking-wider px-3 py-1.5 shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1"
                      >
                        <ShieldCheck size={13} strokeWidth={2.5} /> Approve
                      </button>
                      <button 
                        onClick={() => mutateStatus(loan.id, 'Rejected')} 
                        className="bg-[#FF6B6B] text-black border-2 border-black font-black text-[11px] uppercase tracking-wider px-3 py-1.5 shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1"
                      >
                        <XCircle size={13} strokeWidth={2.5} /> Reject
                      </button>
                    </>
                  ) : (
                    <span className={`inline-block px-3 py-1 border-2 border-black text-[9px] font-black uppercase tracking-widest shadow-[2px_2px_0px_#000000] ${
                      loan.status === 'Approved' ? 'bg-[#B9E88A] text-black' : 'bg-[#FF6B6B] text-black'
                    }`}>
                      {loan.status}
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}