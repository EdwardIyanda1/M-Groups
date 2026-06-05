// src/pages/RegisterPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
    bvn: '', nin: '',
    nextOfKinName: '', nextOfKinRelationship: '', nextOfKinPhone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    setError(null);
    if (step === 1 && (!formData.username || !formData.email || !formData.password)) {
      setError("Please fill in all account details."); return false;
    }
    if (step === 2 && (!formData.firstName || !formData.lastName || !formData.dob || !formData.address)) {
      setError("Please fill in all personal information."); return false;
    }
    if (step === 3) {
      if (!formData.bvn || !formData.nin) { setError("BVN and NIN are required."); return false; }
      if (formData.bvn.length !== 11 || formData.nin.length !== 11) { setError("ID numbers must be 11 digits."); return false; }
    }
    if (step === 4 && (!formData.nextOfKinName || !formData.nextOfKinRelationship || !formData.nextOfKinPhone)) {
      setError("Please provide emergency contact information."); return false;
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
        throw new Error(errData.error || "Registration failed.");
      }
      alert("Registration successful. You can now log in.");
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
        
        <div className="flex justify-between items-start border-b-4 border-black pb-4 mb-6 gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-black uppercase">Create Account</h2>
            <span className="text-[10px] font-bold text-gray-500 uppercase">
              {step === 1 && "Step 1: Account Login Details"}
              {step === 2 && "Step 2: Personal Information"}
              {step === 3 && "Step 3: Identity Verification (KYC)"}
              {step === 4 && "Step 4: Emergency Contacts"}
            </span>
          </div>
          <div className="bg-[#B9E88A] border-2 border-black font-bold text-xs px-3 py-1.5 shadow-[2px_2px_0px_#000000]">
            Step {step} / 4
          </div>
        </div>

        {error && <div className="bg-[#FF6B6B]/10 border-2 border-[#FF6B6B] text-black text-xs font-bold p-3.5 mb-5 shadow-[2px_2px_0px_#000000]">{error}</div>}

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          
          {step === 1 && (
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase text-black">Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="e.g. johndoe" className="w-full p-3 border-2 border-black" />
              <label className="block text-xs font-bold uppercase text-black">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="email@example.com" className="w-full p-3 border-2 border-black" />
              <label className="block text-xs font-bold uppercase text-black">Password</label>
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="w-full p-3 border-2 border-black" />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="p-3 border-2 border-black" />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="p-3 border-2 border-black" />
              </div>
              <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full p-3 border-2 border-black" />
              <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Home Address" rows="2" className="w-full p-3 border-2 border-black" />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <input type="number" name="bvn" value={formData.bvn} onChange={handleInputChange} placeholder="11-digit BVN" className="w-full p-3 border-2 border-black" />
              <input type="number" name="nin" value={formData.nin} onChange={handleInputChange} placeholder="11-digit NIN" className="w-full p-3 border-2 border-black" />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <input type="text" name="nextOfKinName" value={formData.nextOfKinName} onChange={handleInputChange} placeholder="Next of Kin Full Name" className="w-full p-3 border-2 border-black" />
              <input type="text" name="nextOfKinRelationship" value={formData.nextOfKinRelationship} onChange={handleInputChange} placeholder="Relationship (e.g. Spouse)" className="w-full p-3 border-2 border-black" />
              <input type="tel" name="nextOfKinPhone" value={formData.nextOfKinPhone} onChange={handleInputChange} placeholder="080XXXXXXXX" className="w-full p-3 border-2 border-black" />
            </div>
          )}

          <div className="flex gap-4 pt-4 border-t-2 border-black mt-6">
            {step > 1 && (
              <button type="button" onClick={() => setStep(prev => prev - 1)} className="bg-white border-2 border-black p-3 font-bold uppercase text-xs">
                <ArrowLeft size={16}/> Back
              </button>
            )}
            
            {step < 4 ? (
              <button type="button" onClick={() => { if (validateStep()) setStep(prev => prev + 1); }} className="flex-grow bg-white border-2 border-black p-3 font-bold uppercase text-xs">
                Next <ArrowRight size={16} className="inline"/>
              </button>
            ) : (
              <button type="submit" disabled={submitting} className="flex-grow bg-[#3B52F6] text-white border-2 border-black p-3 font-bold uppercase text-xs">
                {submitting ? "Registering..." : "Submit Registration"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}