// src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login, API_BASE } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        // Simplified error handling
        throw new Error("Invalid email or password. Please try again.");
      }

      const userData = await res.json();
      login(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-8 font-sans text-left">
      <div className="w-full max-w-md bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000000] animate-fadeIn">
        
        <div className="text-center mb-6 border-b-4 border-black pb-4 space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-black bg-[#B9E88A] text-black shadow-[3px_3px_0px_#000000]">
            <LogIn size={22} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-black text-black uppercase tracking-tight">Login</h2>
        </div>

        {error && (
          <div className="bg-[#FF6B6B]/10 border-2 border-[#FF6B6B] text-black text-xs font-bold p-3.5 mb-5 shadow-[2px_2px_0px_#000000]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black">
                <Mail size={15} strokeWidth={2.5} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black text-xs font-bold font-mono outline-none focus:bg-[#F4F7F2]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black">
                <Lock size={15} strokeWidth={2.5} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-11 py-3 bg-white border-2 border-black text-xs font-bold font-mono outline-none focus:bg-[#F4F7F2]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-black"
              >
                {showPassword ? <EyeOff size={15} strokeWidth={2.5} /> : <Eye size={15} strokeWidth={2.5} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#3B52F6] text-white font-black border-2 border-black py-3.5 px-4 shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-wider mt-2 disabled:opacity-50"
          >
            {submitting ? "Logging in..." : <>Login <ArrowRight size={14} strokeWidth={2.5} /></>}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t-2 border-black text-center text-xs font-bold text-gray-600 uppercase tracking-wide">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#3B52F6] underline decoration-2 underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}