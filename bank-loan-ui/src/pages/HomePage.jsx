import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Smartphone, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';

const CONTRIBUTORS = [
  { surname: 'Opajobi',         other: 'Oluwatishe',           matric: 'LCU/UG/24/34320',    dept: 'Software Engineering' },
  { surname: 'Agbede',          other: 'Tibiebi Daniel',        matric: 'LCU/UG/24/0220741',  dept: 'Software Engineering' },
  { surname: 'Osagumwenro',     other: 'Omokaro Jonathan',      matric: 'LCU/UG/24/31939',    dept: 'Software Engineering' },
  { surname: 'Oliyide',         other: 'Michael Ayodeji',       matric: 'LCU/UG/24/33702',    dept: 'Software Engineering' },
  { surname: 'Chukwusomu',      other: 'Ikechukwu Samuel',      matric: 'LCU/UG/24/33735',    dept: 'Software Engineering' },
  { surname: 'Muoghalu-Nwokol', other: 'Festus O.',             matric: 'LCU/UG/24/32435',    dept: 'Software Engineering' },
  { surname: 'Iyanda',          other: 'Edward',                matric: 'LCU/UG/24/30926',    dept: 'Software Engineering' },
  { surname: 'Olugbadehan',     other: 'Adebayo',               matric: 'LCU/UG/24/29881',    dept: 'Software Engineering' },
  { surname: 'Obiajulu',        other: 'Alexander Somtochukwu', matric: 'LCU/UG/24/33235',    dept: 'Software Engineering' },
  { surname: 'Okunbor',         other: 'Jason',                 matric: 'LCU/UG/24/28670',    dept: 'Software Engineering' },
  { surname: 'Adeshina',        other: 'Omotayo Roqeeb',        matric: 'LCU/UG/24/34249',    dept: 'Software Engineering' },
  { surname: 'Sanusi',          other: 'Khaliq Olamilekan',     matric: 'LCU/UG/24/29544',    dept: 'Software Engineering' },
  { surname: 'Ajose',           other: 'Emmanuel Olubukola',    matric: 'LCU/UG/24/31679',    dept: 'Software Engineering' },
];

export default function HomePage() {
  return (
    <div className="min-h-[82vh] flex flex-col justify-between overflow-hidden relative font-sans space-y-12 pb-2">
      
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none select-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-10 left-4 text-black text-xl z-10 hidden sm:block font-serif select-none pointer-events-none">✦</div>
      <div className="absolute bottom-40 right-6 text-black text-2xl z-10 hidden sm:block font-serif select-none pointer-events-none">✦</div>

      {/* HERO */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-12 max-w-3xl mx-auto space-y-6 z-10">
        <div className="border-2 border-black bg-white px-4 py-1.5 font-mono font-bold text-xs uppercase tracking-widest shadow-[2px_2px_0px_#000000]">
          Approved Workspace Environment
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-black tracking-tight leading-[0.95] uppercase">
          Simple and <br />
          <span className="bg-[#3B52F6] text-white border-2 border-black px-4 inline-block my-1 shadow-[4px_4px_0px_#000000]">
            Safe Banking
          </span>
        </h1>
        <p className="text-black text-sm sm:text-base max-w-xl font-medium leading-relaxed pt-2">
          Access secure short-term credit facilities with crystal clear parameters, automated lifecycle tracking, and zero hidden administrative fees.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <RouterLink to="/register" className="bg-[#B9E88A] text-black border-2 border-black font-black text-xs uppercase tracking-wider px-6 py-3.5 shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2">
            <Smartphone size={16} strokeWidth={2.5} />
            Open Account
          </RouterLink>
          <RouterLink to="/services" className="bg-white text-black border-2 border-black font-black text-xs uppercase tracking-wider px-6 py-3.5 shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2">
            <Layers size={15} strokeWidth={2.5} className="text-[#3B52F6]" />
            Explore Tiers
          </RouterLink>
        </div>
      </div>

      {/* FEATURE PANEL */}
      <div className="w-full z-10 pt-4">
        <div className="bg-white border-4 border-black p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[6px_6px_0px_#000000] text-left">
          <div className="space-y-2 max-w-xl">
            <div className="inline-block bg-[#B9E88A] border border-black text-[10px] font-mono font-bold px-2 py-0.5 uppercase mb-1">
              Feature Matrix
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight uppercase">
              Easy payments with one tap
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
              Send and request funds easily through your unified operational dashboard. Monitor active repayment milestones with instant digital system receipts.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto text-xs font-black uppercase tracking-wide">
            <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-3 shadow-[3px_3px_0px_#3B52F6]">
              <CheckCircle2 size={16} strokeWidth={2.5} className="text-[#2563EB]" />
              <span>Balance Sync Active</span>
            </div>
            <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-3 shadow-[3px_3px_0px_#B9E88A]">
              <ShieldCheck size={16} strokeWidth={2.5} className="text-black" />
              <span>Compliance Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTRIBUTORS TABLE */}
      <div className="w-full z-10">
        <div className="border-4 border-black bg-white shadow-[6px_6px_0px_#000000]">

          {/* Header */}
          <div className="border-b-4 border-black px-6 py-3 flex items-center justify-between bg-black">
            <div className="flex items-center gap-3">
              <div className="bg-[#B9E88A] border-2 border-white text-black text-[10px] font-mono font-bold px-2 py-0.5 uppercase">
                Group M
              </div>
              <span className="font-black text-xs uppercase tracking-widest text-white">Project Contributors</span>
            </div>
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider hidden sm:block">
              Software Engineering · LCU 2024
            </span>
          </div>

          {/* Column labels */}
          <div className="grid grid-cols-[2rem_1fr_1fr_1fr] gap-0 border-b-2 border-black bg-[#f5f5f5] px-5 py-2">
            <span className="font-mono text-[9px] text-gray-400 uppercase">#</span>
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Surname</span>
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Matric No.</span>
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Department</span>
          </div>

          {/* Rows */}
          {CONTRIBUTORS.map((c, i) => (
            <div
              key={i}
              className={`grid grid-cols-[2rem_1fr_1fr_1fr] gap-0 items-center px-5 py-3 border-b border-black/10 hover:bg-[#B9E88A]/20 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}
            >
              <span className="font-mono text-[10px] text-gray-400">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <span className="font-black text-xs uppercase tracking-wide">{c.surname}</span>
                <span className="text-[11px] text-gray-500 font-medium block">{c.other}</span>
              </div>
              <span className="font-mono text-[10px] text-[#3B52F6] font-bold">{c.matric}</span>
              <span className="text-[10px] text-gray-600 font-medium">{c.dept}</span>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}