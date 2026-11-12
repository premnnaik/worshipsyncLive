import React, { useState } from 'react';
import { Radio, Users, Music, Sparkles, ChevronRight, LogIn, Shield, Smartphone } from 'lucide-react';

export default function Home({ onSelectCreate, onSelectJoin, onSelectSetup, onQuickJoin }) {
  const [quickCode, setQuickCode] = useState('');

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!quickCode.trim()) return;
    onQuickJoin(quickCode.trim().toUpperCase());
  };

  return (
    <div className="min-h-screen bg-[#050609] flex flex-col justify-between pt-safe pb-safe px-4 max-w-lg mx-auto relative select-none">
      {/* Ambient Stage Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-64 bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-cyan-600/15 blur-[90px] rounded-full pointer-events-none" />

      {/* Top Header */}
      <header className="pt-3 pb-2 text-center z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-[11px] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Stage Sync for Church Teams</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Worship<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">Sync</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
          Real-time lyrics, chords, tempo & keyboard style on your phone screen.
        </p>
      </header>

      {/* Main Actions for Phone */}
      <main className="my-auto py-4 space-y-3.5 z-10 w-full">
        {/* Quick Join Bar for Musicians holding a phone */}
        <form onSubmit={handleQuickSubmit} className="p-2.5 rounded-2xl glass-panel-elevated border border-indigo-500/30 shadow-xl flex items-center gap-2">
          <input
            type="text"
            maxLength={10}
            placeholder="ENTER ROOM CODE..."
            value={quickCode}
            onChange={(e) => setQuickCode(e.target.value.toUpperCase())}
            className="flex-1 bg-transparent px-3 py-2 text-white font-mono font-extrabold tracking-widest text-sm placeholder:text-slate-500 placeholder:font-sans placeholder:font-normal placeholder:tracking-normal outline-none uppercase"
          />
          <button
            type="submit"
            disabled={!quickCode.trim()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 disabled:opacity-40 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md active-press"
          >
            <LogIn className="w-4 h-4" />
            <span>Join</span>
          </button>
        </form>

        {/* 1. Join Room (Primary Phone Card) */}
        <div
          onClick={onSelectJoin}
          className="p-5 rounded-3xl glass-panel hover:glass-panel-elevated border border-cyan-500/30 shadow-xl cursor-pointer active-press transition duration-150 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Musicians & Vocalists</span>
              <h2 className="text-lg font-bold text-white">Join the Room</h2>
              <p className="text-xs text-slate-400">Scan QR or enter code to sync on stage</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
        </div>

        {/* 2. Create Room (Admin / Keyboardist Phone Card) */}
        <div
          onClick={onSelectCreate}
          className="p-5 rounded-3xl glass-panel hover:glass-panel-elevated border border-indigo-500/30 shadow-xl cursor-pointer active-press transition duration-150 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Radio className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Worship Leader / Admin</span>
              <h2 className="text-lg font-bold text-white">Create a Room</h2>
              <p className="text-xs text-slate-400">Broadcast songs & stage cues to team</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
        </div>

        {/* 3. Songs Setup (Pre-Service Library) */}
        <div
          onClick={onSelectSetup}
          className="p-5 rounded-3xl glass-panel hover:glass-panel-elevated border border-emerald-500/25 shadow-xl cursor-pointer active-press transition duration-150 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Music className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Song Database</span>
              <h2 className="text-lg font-bold text-white">Songs Setup</h2>
              <p className="text-xs text-slate-400">Manage tempos, styles, lyrics & charts</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
        </div>
      </main>

      {/* Stage Phone Ergonomics Badges */}
      <footer className="pt-2 pb-1 text-center z-10">
        <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400 font-medium">
          <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5">
            <span className="text-emerald-400 block font-bold">Wake Lock</span>
            Screen stays ON
          </div>
          <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5">
            <span className="text-cyan-400 block font-bold">Zero Latency</span>
            Instant push
          </div>
          <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5">
            <span className="text-purple-400 block font-bold">Arranger Style</span>
            Yamaha / Roland
          </div>
        </div>
      </footer>
    </div>
  );
}
