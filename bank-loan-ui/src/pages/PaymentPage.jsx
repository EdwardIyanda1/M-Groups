// src/pages/PaymentPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CreditCard, Wallet, ShieldCheck, AlertCircle } from 'lucide-react';

export default function PaymentPage() {
  const { API_BASE } = useContext(AuthContext);
  const queryParams = new URLSearchParams(window.location.search);
  const loanId = queryParams.get('loan_id');
  const [repaymentValue, setRepaymentValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handlePay = async (e) => {
    e.preventDefault();
    if (!loanId) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/loans/${loanId}/payments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount_paid: parseFloat(repaymentValue) })
      });
      if (res.ok) {
        alert(`Payment clear logged for File Reference: MGP-00${loanId}`);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[65vh] flex items-center justify-center px-4 font-sans text-left">
      <div className="w-full max-w-md bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000000]">
        
        <div className="text-center mb-6 border-b-4 border-black pb-4 space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-black bg-[#B9E88A] text-black shadow-[3px_3px_0px_#000000]">
            <Wallet size={22} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-black text-black uppercase tracking-tight">Remittance Terminal</h2>
          <span className="inline-block bg-[#3B52F6] text-white border-2 border-black text-[10px] font-mono font-bold px-2.5 py-0.5 shadow-[1.5px_1.5px_0px_#000000]">
            FILE REF: MGP-00{loanId || 'NULL'}
          </span>
        </div>

        {!loanId ? (
          <div className="bg-[#FF6B6B]/10 border-2 border-[#FF6B6B] text-black text-xs font-bold p-4 flex items-start gap-2">
            <AlertCircle className="flex-shrink-0 mt-0.5" size={16} strokeWidth={2.5} />
            <p>Missing structural record identifier pointer variables. Return back to index panel workspace sheets.</p>
          </div>
        ) : (
          <form onSubmit={handlePay} className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                Allocation Liquidation Sum (NGN)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black font-mono font-black text-xs">₦</span>
                <input 
                  type="number" 
                  value={repaymentValue} 
                  onChange={(e) => setRepaymentValue(e.target.value)} 
                  placeholder="0.00"
                  required 
                  className="w-full pl-8 pr-4 py-3 bg-white border-2 border-black text-xs font-bold font-mono outline-none focus:bg-[#F4F7F2]" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-[#B9E88A] text-black font-black border-2 border-black py-3.5 px-4 shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-wider"
            >
              {submitting ? "Clearing Matrix..." : <>Authorize Remittance Clearance <CreditCard size={14} strokeWidth={2.5} /></>}
            </button>
          </form>
        )}

        <div className="mt-6 pt-3 border-t-2 border-black flex items-center justify-center gap-1.5 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">
          <ShieldCheck size={12} strokeWidth={2.5} className="text-emerald-500" /> Clearance Channels Checked Secure
        </div>
      </div>
    </div>
  );
}