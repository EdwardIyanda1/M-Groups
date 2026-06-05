// src/pages/ProfilePage.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-md mx-auto py-10 px-2 font-sans text-left animate-fadeIn">
      <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000000] space-y-6">
        
        {/* Profile Header */}
        <div className="flex items-center gap-4 border-b-4 border-black pb-5">
          <div className="w-12 h-12 border-2 border-black bg-[#B9E88A] flex items-center justify-center font-bold text-black text-xl">
            {user?.username ? user.username[0].toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-xl font-black text-black uppercase flex items-center gap-1.5">
              {user?.username} <CheckCircle2 size={16} className="text-[#3B52F6]" />
            </h2>
            <div className="bg-black text-white font-bold text-[10px] px-2 py-0.5 mt-0.5 inline-block uppercase">
              Account Status: Active
            </div>
          </div>
        </div>

        {/* Profile Information List */}
        <div className="space-y-3 text-xs font-bold uppercase tracking-wider">
          
          <div className="flex justify-between items-center bg-[#F4F7F2] border-2 border-black p-3">
            <span className="text-gray-500">Username:</span>
            <span className="text-black">{user?.username}</span>
          </div>

          <div className="flex justify-between items-center bg-white border-2 border-black p-3">
            <span className="text-gray-500">Account Type:</span>
            <span className="text-[#3B52F6]">{user?.role || 'Customer'}</span>
          </div>

          <div className="flex justify-between items-center bg-white border-2 border-black p-3">
            <span className="text-gray-500">System Connection:</span>
            <span className="text-black flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#B9E88A] rounded-full" /> Connected
            </span>
          </div>
        </div>

        <div className="pt-2 text-[10px] font-bold text-gray-400 text-center uppercase flex items-center justify-center gap-1">
          <ShieldCheck size={14} /> Profile Securely Verified
        </div>

      </div>
    </div>
  );
}