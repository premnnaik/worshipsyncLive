import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Shield, LogIn, AlertCircle, Check } from 'lucide-react';
import { emitWithAck } from '../services/socket';
import { getRoomInfo } from '../services/api';

const POPULAR_ROLES = [
  'Lead Singer',
  'Singer',
  'Keyboard',
  'Acoustic Guitar',
  'Electric Guitar',
  'Bass',
  'Drums',
  'Sound'
];

export default function JoinRoom({ initialRoomCode = '', onBack, onJoined }) {
  const [roomCode, setRoomCode] = useState(initialRoomCode.toUpperCase());
  const [name, setName] = useState('');
  const [role, setRole] = useState('Lead Singer');
  const [customRole, setCustomRole] = useState('');
  const [pin, setPin] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [checkingRoom, setCheckingRoom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (roomCode.length >= 4) {
      checkCode(roomCode);
    }
  }, [roomCode]);

  const checkCode = async (code) => {
    setCheckingRoom(true);
    setError('');
    try {
      const info = await getRoomInfo(code.trim().toUpperCase());
      if (info.exists) {
        setIsPrivate(Boolean(info.isPrivate));
      } else {
        setIsPrivate(false);
      }
    } catch {
      // ignore
    } finally {
      setCheckingRoom(false);
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!roomCode.trim()) {
      setError('Please enter a room code');
      return;
    }
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);
    setError('');

    const finalRole = role === 'Other' && customRole.trim() ? customRole.trim() : role;

    try {
      const response = await emitWithAck('room:join', {
        roomCode: roomCode.trim().toUpperCase(),
        pin: pin.trim(),
        name: name.trim(),
        role: finalRole
      });

      if (!response.success) {
        setError(response.error || 'Failed to join room');
      } else {
        onJoined({
          room: response.room,
          user: { name: name.trim(), role: finalRole }
        });
      }
    } catch (err) {
      setError('Connection error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050609] flex flex-col justify-between pt-safe pb-safe px-4 max-w-md mx-auto select-none">
      {/* Top Bar */}
      <div className="pt-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white p-2 rounded-xl bg-slate-900 border border-white/5 active-press transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Join Form */}
      <div className="my-auto py-4">
        <div className="glass-panel-elevated p-6 rounded-3xl border border-white/10 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-3">
            <Users className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-black text-white mb-1">Join Live Room</h2>
          <p className="text-xs text-slate-400 mb-5">
            Sync lyrics and chords live on your phone.
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleJoin} className="space-y-4">
            {/* Room Code */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                Room Code <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  maxLength={10}
                  autoCapitalize="characters"
                  autoComplete="off"
                  placeholder="e.g. WOR77"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-xl glass-input text-white font-mono font-extrabold tracking-widest text-xl uppercase outline-none focus:border-cyan-500 text-center"
                />
                {checkingRoom && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                    Checking...
                  </span>
                )}
              </div>
            </div>

            {/* PIN if private */}
            {isPrivate && (
              <div className="animate-fadeIn">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  Room PIN <span className="text-rose-400">*</span>
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-white font-mono text-center text-lg tracking-widest outline-none border-amber-500/40"
                />
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                Your Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah / David"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-sm outline-none font-medium"
              />
            </div>

            {/* Quick Mobile Role Selector Pills */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {POPULAR_ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition active-press border text-left flex items-center justify-between ${
                      role === r
                        ? 'bg-cyan-600 text-white border-cyan-400 shadow'
                        : 'bg-slate-900/80 text-slate-300 border-white/5 hover:text-white'
                    }`}
                  >
                    <span>{r}</span>
                    {role === r && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white font-black text-sm shadow-xl shadow-cyan-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2 active-press"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Connecting...' : 'Enter Live Stage'}</span>
            </button>
          </form>
        </div>
      </div>

      <div className="pb-2 text-center text-[10px] text-slate-500">
        Your phone screen will stay awake automatically once inside.
      </div>
    </div>
  );
}
