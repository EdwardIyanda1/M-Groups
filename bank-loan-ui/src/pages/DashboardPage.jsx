// src/pages/DashboardPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Wallet, TrendingUp, CheckCircle2, Clock, ArrowUpRight } from 'lucide-react';

export default function DashboardPage() {
  const { user, API_BASE } = useContext(AuthContext);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchUserLoans = async () => {
    try {
      const res = await fetch(`${API_BASE}/loans/`);
      if (!res.ok) throw new Error("Could not load your loan history.");
      const data = await res.json();
      setLoans(data.filter(loan => loan.user__username === user?.username));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (user) fetchUserLoans(); }, [user]);

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/loans/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, amount: parseFloat(amount), purpose })
      });
      if (res.ok) {
        setAmount(''); 
        setPurpose('');
        fetchUserLoans();
      }
    } catch (err) { 
      console.error(err); 
    } finally {
      setSubmitting(false);
    }
  };

  const totalAppliedSum = loans.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
  const activeApprovedSum = loans.filter(l => l.status === 'Approved').reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
  const pendingRequestsCount = loans.filter(l => l.status === 'Pending').length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="w-8 h-8 border-4 border-black border-t-[#3B52F6] rounded-full animate-spin" />
        <p className="text-black font-bold text-xs uppercase tracking-widest">Loading your account details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-2 text-left font-sans animate-fadeIn">
      
      {/* 1. Header Profile Banner */}
      <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000000] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight flex items-center gap-2.5">
            <LayoutDashboard size={24} strokeWidth={2.5} className="text-[#3B52F6]" /> Account Dashboard
          </h2>
          <p className="text-xs text-gray-600 font-bold uppercase tracking-wide">
            Welcome, <span className="font-mono text-black font-black bg-[#B9E88A] border border-black px-1.5 py-0.5">{user?.username}</span>
          </p>
        </div>
        <Link 
          to="/profile" 
          className="w-full sm:w-auto text-center text-xs font-black uppercase tracking-wider bg-white border-2 border-black px-5 py-3 shadow-[3px_3px_0px_#000000] hover:shadow-none transition-all"
        >
          View Profile
        </Link>
      </div>

      {/* 2. Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#000000] flex items-center justify-between">
          <div>
            <span className="block text-[9px] font-bold uppercase text-gray-400 tracking-wider">Total Requested</span>
            <p className="text-xl font-bold text-black">₦{totalAppliedSum.toLocaleString()}</p>
          </div>
          <div className="p-2 border-2 border-black bg-[#FFFF00]"><TrendingUp size={16} /></div>
        </div>

        <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#3B52F6] flex items-center justify-between">
          <div>
            <span className="block text-[9px] font-bold uppercase text-gray-400 tracking-wider">Active Debt</span>
            <p className="text-xl font-bold text-[#3B52F6]">₦{activeApprovedSum.toLocaleString()}</p>
          </div>
          <div className="p-2 border-2 border-black bg-[#B9E88A]"><CheckCircle2 size={16} /></div>
        </div>

        <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#000000] flex items-center justify-between">
          <div>
            <span className="block text-[9px] font-bold uppercase text-gray-400 tracking-wider">Pending Requests</span>
            <p className="text-xl font-bold text-black">{pendingRequestsCount}</p>
          </div>
          <div className="p-2 border-2 border-black bg-white"><Clock size={16} /></div>
        </div>
      </div>

      {/* 3. Loan Application Form & History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <form onSubmit={handleApply} className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#000000] space-y-5">
          <h3 className="font-bold text-base text-black uppercase border-b-2 border-black pb-2 flex items-center gap-1.5">
            <Wallet size={16} /> Apply for a Loan
          </h3>
          <div>
            <label className="block text-xs font-bold uppercase text-black mb-2">Amount Needed (NGN)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" required className="w-full p-2.5 border-2 border-black font-bold" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-black mb-2">Purpose of Loan</label>
            <textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Tell us why you need this loan..." required rows="4" className="w-full p-2.5 border-2 border-black font-bold resize-none" />
          </div>
          <button type="submit" disabled={submitting} className="w-full bg-[#3B52F6] text-white font-bold border-2 border-black py-3.5 hover:bg-blue-700 transition-all">
            {submitting ? "Sending..." : "Submit Application"}
          </button>
        </form>

        <div className="lg:col-span-2 bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#000000] space-y-4">
          <h3 className="font-bold text-base text-black uppercase border-b-2 border-black pb-2">Your Loan History</h3>
          {loans.length === 0 ? (
            <div className="border-2 border-dashed border-black py-16 text-center bg-[#F4F7F2]">
              <p className="text-xs font-bold uppercase text-gray-400">No applications found.</p>
            </div>
          ) : (
            <div className="space-y-3">
{loans.map(loan => (
  <div key={loan.id} className="border-2 border-black p-4 flex justify-between items-center bg-white">
    <div>
      <p className="text-xs font-bold uppercase">Loan ID: MGP-{loan.id}</p>
      {/* Visual Status Indicator */}
      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase ${
        loan.status === 'Approved' ? 'bg-[#B9E88A]' : 
        loan.status === 'Rejected' ? 'bg-[#FF6B6B]' : 'bg-[#FFFF00]'
      }`}>
        {loan.status}
      </span>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold">₦{parseFloat(loan.amount).toLocaleString()}</p>
      <p className="text-[10px] text-gray-500 font-bold uppercase">Requested</p>
    </div>
  </div>
))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}