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
      const data = await res.json();
      console.log("DEBUG: Data fetched in Admin:", data); // Add this
      if (res.ok) { 
        setAllLoans(data); 
      }
    } catch (err) { 
      console.error("DEBUG: Fetch error:", err); 
    } finally {
      setLoading(false);
    }
};

  useEffect(() => { if (user?.role === 'manager' || user?.is_staff) loadGlobalRegistry(); }, [user]);

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
// Inside AdminPage.jsx, update the loan display card:
<div key={loan.id} className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#000000]">
  <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-2">
    <span className="font-bold text-sm">{loan.user__username}</span>
    <span className="font-mono text-xs text-blue-600">MGP-{loan.id}</span>
  </div>
  <p className="text-xs italic mb-4">"{loan.purpose}"</p>
  <div className="flex justify-between items-center">
    <p className="font-bold">₦{parseFloat(loan.amount).toLocaleString()}</p>
    {/* Admin Action Buttons */}
    {loan.status === 'Pending' && (
      <div className="flex gap-2">
        <button onClick={() => mutateStatus(loan.id, 'Approved')} className="bg-[#B9E88A] px-2 py-1 text-[10px] font-bold uppercase">Approve</button>
        <button onClick={() => mutateStatus(loan.id, 'Rejected')} className="bg-[#FF6B6B] px-2 py-1 text-[10px] font-bold uppercase">Reject</button>
      </div>
    )}
  </div>
</div>
        ))}
      </div>
    </div>
  );
}