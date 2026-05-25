// src/pages/RegisterPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  User, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, 
  Calendar, MapPin, Fingerprint, ShieldCheck, Phone 
} from 'lucide-react';

export default function RegisterPage() {
  const { API_BASE } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    username: '', email: '', password: '',
    firstName: '', lastName: '', dob: '', address: '',
    bvn: '', nin: '', driversLicense: '',
    nextOfKinName: '', nextOfKinRelationship: '', nextOfKinPhone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    setError(null);
    if (step === 1 && (!formData.username || !formData.email || !formData.password)) {
      setError("Please fill out account access parameter logs completely."); return false;
    }
    if (step === 2 && (!formData.firstName || !formData.lastName || !formData.dob || !formData.address)) {
      setError("Personal description rows cannot be empty."); return false;
    }
    if (step === 3) {
      if (!formData.bvn || !formData.nin) { setError("Both BVN and NIN fields must map numerical parameters."); return false; }
      if (formData.bvn.length !== 11 || formData.nin.length !== 11) { setError("Legal identity logs must equal exactly 11 digits."); return false; }
    }
    if (step === 4 && (!formData.nextOfKinName || !formData.nextOfKinRelationship || !formData.nextOfKinPhone)) {
      setError("Next of Kin metrics are mandatory components."); return false;
    }
    return true;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to compile security record indices.");
      }
      alert("Registration sequence approved. Proceeding to access clearance gate.");
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-6 font-sans text-left">
      <div className="w-full max-w-xl bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000000] relative">
        
        {/* Horizontal Pipeline Steps Tracker */}
        <div className="flex justify-between items-start border-b-4 border-black pb-4 mb-6 gap-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">Onboarding Desk</h2>
            <span className="block text-[9px] font-mono font-black uppercase text-gray-500 tracking-wider">
              {step === 1 && "Phase 1: Credentials Staging"}
              {step === 2 && "Phase 2: Individual Descriptive Data"}
              {step === 3 && "Phase 3: Statutory KYC Requirements"}
              {step === 4 && "Phase 4: Emergency Contingency Contacts"}
            </span>
          </div>
          <div className="bg-[#B9E88A] border-2 border-black font-mono text-xs font-black uppercase px-3 py-1.5 shadow-[2px_2px_0px_#000000] flex-shrink-0">
            Node {step} / 4
          </div>
        </div>

        {error && <div className="bg-[#FF6B6B]/10 border-2 border-[#FF6B6B] text-black text-xs font-bold p-3.5 mb-5 shadow-[2px_2px_0px_#000000]">{error}</div>}

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-black uppercase mb-2 text-black">Account Username</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black"><User size={15} strokeWidth={2.5}/></span>
                  <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="CREATE RECORD IDENTIFIER" required className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-black text-xs font-mono font-bold outline-none focus:bg-[#F4F7F2]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-2 text-black">Email Mapping Node</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black"><Mail size={15} strokeWidth={2.5}/></span>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="NAME@DOMAIN.COM" required className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-black text-xs font-mono font-bold outline-none focus:bg-[#F4F7F2]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-2 text-black">Private Security Passcode</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black"><Lock size={15} strokeWidth={2.5}/></span>
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" required className="w-full pl-10 pr-11 py-2.5 bg-white border-2 border-black text-xs font-mono font-bold outline-none focus:bg-[#F4F7F2]" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-black">{showPassword ? <EyeOff size={15} strokeWidth={2.5}/> : <Eye size={15} strokeWidth={2.5}/>}</button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-2 text-black">Legal First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="FIRST NAME" required className="w-full px-4 py-2.5 bg-white border-2 border-black text-xs font-bold outline-none focus:bg-[#F4F7F2]" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-2 text-black">Legal Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="LAST NAME" required className="w-full px-4 py-2.5 bg-white border-2 border-black text-xs font-bold outline-none focus:bg-[#F4F7F2]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-2 text-black">Date of Birth</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black"><Calendar size={15} strokeWidth={2.5}/></span>
                  <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-black text-xs font-mono font-bold outline-none text-left" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-2 text-black">Residential Physical Address</label>
                <div className="relative">
                  <span className="absolute top-3 left-0 pl-3.5 flex items-start text-black"><MapPin size={15} strokeWidth={2.5}/></span>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="STREET RESIDENCE LOCATION INDEX MAPPINGS..." required rows="2" className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-black text-xs font-bold uppercase outline-none focus:bg-[#F4F7F2] resize-none" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-black uppercase mb-2 text-black">Bank Verification Number (BVN)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black"><Fingerprint size={15} strokeWidth={2.5}/></span>
                  <input type="number" name="bvn" value={formData.bvn} onChange={handleInputChange} placeholder="11-DIGIT ID" required className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-black text-xs font-mono font-black outline-none tracking-widest focus:bg-[#F4F7F2]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-2 text-black">National Identity Number (NIN)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black"><Fingerprint size={15} strokeWidth={2.5}/></span>
                  <input type="number" name="nin" value={formData.nin} onChange={handleInputChange} placeholder="11-DIGIT ID" required className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-black text-xs font-mono font-black outline-none tracking-widest focus:bg-[#F4F7F2]" />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-black uppercase mb-2 text-black">Next of Kin Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black"><User size={15} strokeWidth={2.5}/></span>
                  <input type="text" name="nextOfKinName" value={formData.nextOfKinName} onChange={handleInputChange} placeholder="KIN DESIGNATION FULL NAME" required className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-black text-xs font-bold outline-none focus:bg-[#F4F7F2]" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-2 text-black">Relationship Connection</label>
                  <input type="text" name="nextOfKinRelationship" value={formData.nextOfKinRelationship} onChange={handleInputChange} placeholder="E.G. SIBLING, PARENT" required className="w-full px-4 py-2.5 bg-white border-2 border-black text-xs font-bold outline-none focus:bg-[#F4F7F2]" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-2 text-black">Kin Telephone Line</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black"><Phone size={14} strokeWidth={2.5}/></span>
                    <input type="tel" name="nextOfKinPhone" value={formData.nextOfKinPhone} onChange={handleInputChange} placeholder="CONTACT NUMBER" required className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-black text-xs font-mono font-bold outline-none focus:bg-[#F4F7F2]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Nav Pipeline Trigger Keys */}
          <div className="flex gap-4 pt-4 border-t-2 border-black mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(prev => prev - 1)}
                className="bg-white hover:bg-gray-100 border-2 border-black text-black px-4 py-3 font-black rounded-none shadow-[2px_2px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
              >
                <ArrowLeft size={14} strokeWidth={2.5}/>
              </button>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={() => { if (validateStep()) setStep(prev => prev + 1); }}
                className="flex-grow bg-white hover:bg-gray-50 border-2 border-black text-black py-3 px-4 rounded-none font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[3px_3px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                Advance Pipeline <ArrowRight size={14} strokeWidth={2.5}/>
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="flex-grow bg-[#3B52F6] text-white border-2 border-black py-3 px-4 rounded-none font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_#000000] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
              >
                {submitting ? "Writing Indices..." : <>Commit Identity Record <ShieldCheck size={16} strokeWidth={2.5} /></>}
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}