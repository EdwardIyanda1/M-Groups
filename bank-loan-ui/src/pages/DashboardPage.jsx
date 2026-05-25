// src/pages/DashboardPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, CreditCard, Send, Wallet, TrendingUp, CheckCircle2, Clock, ArrowUpRight } from 'lucide-react';

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
      if (!res.ok) throw new Error("Failed to pull structural arrays.");
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
      print(err); 
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
        <p className="text-black font-mono text-xs uppercase tracking-widest font-black">Assembling runtime metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-2 text-left font-sans animate-fadeIn">
      
      {/* 1. Header Profile Banner Summary */}
      <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000000] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="inline-block bg-[#3B52F6] text-white border-2 border-black px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest">
            Workspace Summary
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight flex items-center gap-2.5">
            <LayoutDashboard size={24} strokeWidth={2.5} className="text-[#3B52F6]" /> Operations Desktop
          </h2>
          <p className="text-xs text-gray-600 font-bold uppercase tracking-wide">
            Authenticated Account Holder: <span className="font-mono text-black font-black bg-[#B9E88A] border border-black px-1.5 py-0.5">{user?.username}</span>
          </p>
        </div>
        <Link 
          to="/profile" 
          className="w-full sm:w-auto text-center text-xs font-black uppercase tracking-wider bg-white border-2 border-black px-5 py-3 shadow-[3px_3px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
        >
          View Profile KYC
        </Link>
      </div>

      {/* 2. Portfolio Metrics Tracker Block Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#000000] flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-[9px] font-mono font-bold uppercase text-gray-400 tracking-wider">Total Applied Balance</span>
            <p className="text-xl font-mono font-black text-black">₦{totalAppliedSum.toLocaleString()}</p>
          </div>
          <div className="p-2 border-2 border-black bg-[#FFFF00]"><TrendingUp size={16} strokeWidth={2.5} /></div>
        </div>

        <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#3B52F6] flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-[9px] font-mono font-bold uppercase text-gray-400 tracking-wider">Active Approved Debt</span>
            <p className="text-xl font-mono font-black text-[#3B52F6]">₦{activeApprovedSum.toLocaleString()}</p>
          </div>
          <div className="p-2 border-2 border-black bg-[#B9E88A]"><CheckCircle2 size={16} strokeWidth={2.5} /></div>
        </div>

        <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#000000] flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-[9px] font-mono font-bold uppercase text-gray-400 tracking-wider">Pending Ledger Review</span>
            <p className="text-xl font-mono font-black text-black">{pendingRequestsCount} Requests</p>
          </div>
          <div className="p-2 border-2 border-black bg-white"><Clock size={16} strokeWidth={2.5} /></div>
        </div>

      </div>

      {/* 3. Core Working Operations Area Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Application Creation Form */}
        <form onSubmit={handleApply} className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#000000] space-y-5">
          <h3 className="font-black text-sm sm:text-base text-black uppercase tracking-tight border-b-2 border-black pb-2 flex items-center gap-1.5">
            <Wallet size={16} strokeWidth={2.5} /> Initialize Credit File
          </h3>
          
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
              Capital Requirement Value (NGN)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black font-mono font-black text-xs">₦</span>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="0.00"
                required 
                className="w-full pl-8 pr-4 py-2.5 bg-white border-2 border-black text-xs font-bold font-mono outline-none focus:bg-[#F4F7F2]" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
              Justification Framework Summary
            </label>
            <textarea 
              value={purpose} 
              onChange={(e) => setPurpose(e.target.value)} 
              placeholder="State clear purpose allocation metrics..."
              required 
              rows="4"
              className="w-full px-4 py-2.5 bg-white border-2 border-black text-xs font-bold uppercase placeholder-gray-400 outline-none focus:bg-[#F4F7F2] resize-none" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={submitting} 
            className="w-full bg-[#3B52F6] text-white font-black border-2 border-black py-3.5 shadow-[3px_3px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-wider"
          >
            {submitting ? "Processing..." : <>Dispatch Request <Send size={12} strokeWidth={2.5} /></>}
          </button>
        </form>

        {/* Right Side: Ledger Records Activity List */}
        <div className="lg:col-span-2 bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#000000] space-y-4">
          <h3 className="font-black text-sm sm:text-base text-black uppercase tracking-tight border-b-2 border-black pb-2">
            Active Ledger System Rows
          </h3>
          
          {loans.length === 0 ? (
            <div className="border-2 border-dashed border-black py-16 text-center bg-[#F4F7F2]">
              <p className="text-xs font-mono font-black uppercase tracking-wider text-gray-400">
                No active records mapped within dataset references.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {loans.map(loan => (
                <div 
                  key={loan.id} 
                  className="border-2 border-black p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-[#F4F7F2]/50 transition-colors"
                >
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-black">MGP-00{loan.id}</span>
                      <span className={`inline-block border-2 border-black px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest shadow-[1.5px_1.5px_0px_#000000] ${
                        loan.status === 'Approved' ? 'bg-[#B9E88A] text-black' : 
                        loan.status === 'Rejected' ? 'bg-[#FF6B6B] text-black' : 
                        'bg-[#FFFF00] text-black'
                      }`}>
                        {loan.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 font-semibold italic">"{loan.purpose}"</p>
                  </div>
                  
                  <div className="flex sm:flex-col justify-between items-end gap-1 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <span className="text-base font-mono font-black text-black">₦{parseFloat(loan.amount).toLocaleString()}</span>
                    
                    {loan.status === 'Approved' ? (
                      <Link 
                        to={`/payment?loan_id=${loan.id}`} 
                        className="inline-flex items-center gap-1 text-xs font-black text-[#3B52F6] hover:underline"
                      >
                        Settle Repayment <ArrowUpRight size={14} strokeWidth={2.5} />
                      </Link>
                    ) : (
                      <span className="text-[10px] font-mono text-gray-300 font-bold uppercase tracking-wider">Locked</span>
                    )}
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