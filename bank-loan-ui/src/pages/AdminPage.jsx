// src/pages/AdminPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Briefcase, ShieldCheck, XCircle, AlertOctagon } from 'lucide-react';

export default function AdminPage() {
  const { user, API_BASE } = useContext(AuthContext);
  const [allLoans, setAllLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadGlobalRegistry = async () => {
    try {
      const res = await fetch(`${API_BASE}/loans/`);
      if (res.ok) setAllLoans(await res.json());
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  useEffect(() => { if (user?.role === 'manager' ) loadGlobalRegistry(); }, [user]);

  const mutateStatus = async (loanId, targetState) => {
    try {
      const res = await fetch(`${API_BASE}/loans/${loanId}/status/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: targetState })
      });
      if (res.ok) loadGlobalRegistry();
    } catch (err) { console.error(err); }
  };

  if (user?.role !== 'manager' && !user?.is_staff) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000000] text-left space-y-4">
        <AlertOctagon size={24} className="text-[#FF6B6B]" />
        <h3 className="font-black text-xl text-black uppercase">Security Restriction</h3>
        <p className="text-xs text-gray-800 font-semibold">Access Denied: Administrative Clearance Required.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-2 text-left font-sans animate-fadeIn">
      <div className="bg-white border-4 border-black p-6 flex justify-between items-center shadow-[6px_6px_0px_#000000]">
        <h2 className="text-3xl font-black text-black uppercase flex items-center gap-2.5">
          <Briefcase size={24} className="text-[#3B52F6]" /> Admin Console
        </h2>
        <div className="bg-[#B9E88A] border-2 border-black px-4 py-2 font-mono text-xs font-black uppercase">
          Entries: {allLoans.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allLoans.map(loan => (
          <div key={loan.id} className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between space-y-4">
            <div className="border-b-2 border-black pb-2 flex justify-between items-center">
              <span className="text-xs font-black uppercase">{loan.user__username}</span>
              <span className="font-mono text-[10px] text-[#3B52F6]">REF-00{loan.id}</span>
            </div>
            
            <p className="text-xs text-gray-800 font-semibold italic">"{loan.purpose}"</p>
            
            <div className="flex justify-between items-end pt-2 border-t border-gray-100">
              <p className="text-base font-mono font-black text-black">₦{parseFloat(loan.amount).toLocaleString()}</p>

              {/* Status Logic */}
              {loan.status === 'Pending' ? (
                <div className="flex gap-2">
                  <button onClick={() => mutateStatus(loan.id, 'Approved')} className="bg-[#B9E88A] border-2 border-black px-3 py-1 font-black text-[10px] uppercase">Approve</button>
                  <button onClick={() => mutateStatus(loan.id, 'Rejected')} className="bg-[#FF6B6B] border-2 border-black px-3 py-1 font-black text-[10px] uppercase">Reject</button>
                </div>
              ) : (
                <span className={`px-3 py-1 border-2 border-black text-[9px] font-black uppercase tracking-widest ${
                  loan.status === 'Approved' ? 'bg-[#B9E88A]' : 'bg-[#FF6B6B]'
                }`}>
                  {loan.status.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}