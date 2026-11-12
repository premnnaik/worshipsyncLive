import React, { useState } from 'react';
import { X, Shield, Globe, Radio, KeyRound } from 'lucide-react';
import { emitWithAck } from '../services/socket';

export default function CreateRoomModal({ onClose, onCreated }) {
  const [adminName, setAdminName] = useState('Worship Leader');
  const [isPrivate, setIsPrivate] = useState(false);
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    if (isPrivate && !pin.trim()) {
      setError('Please set a PIN for the private room');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await emitWithAck('room:create', {
        adminName: adminName.trim(),
        isPrivate,
        pin: isPrivate ? pin.trim() : null
      });

      if (!response.success) {
        setError(response.error || 'Failed to create room');
      } else {
        onCreated(response.room);
      }
    } catch (err) {
      setError('Error creating room: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md p-6 rounded-t-3xl sm:rounded-3xl glass-panel-elevated shadow-2xl border-t sm:border border-white/10 pb-safe">
        {/* Mobile Drag Indicator */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden"></div>

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg active-press"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
          <Radio className="w-6 h-6 animate-pulse" />
        </div>

        <h3 className="text-xl font-black text-white mb-1">Create Live Session</h3>
        <p className="text-xs text-slate-400 mb-5">
          Start a stage room to sync connected band phones.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-4">
          {/* Admin Name */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
              Your Name / Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Worship Leader"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-sm outline-none font-bold"
            />
          </div>

          {/* Access Mode */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
              Room Access
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setIsPrivate(false)}
                className={`flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-lg transition active-press ${
                  !isPrivate ? 'bg-indigo-600 text-white shadow' : 'text-slate-400'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Public Link</span>
              </button>
              <button
                type="button"
                onClick={() => setIsPrivate(true)}
                className={`flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-lg transition active-press ${
                  isPrivate ? 'bg-amber-600 text-white shadow' : 'text-slate-400'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>PIN Code</span>
              </button>
            </div>
          </div>

          {/* PIN Input */}
          {isPrivate && (
            <div className="animate-fadeIn">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1 flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5" />
                Set Room PIN
              </label>
              <input
                type="text"
                maxLength={6}
                inputMode="numeric"
                placeholder="e.g. 7788"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-amber-300 font-mono font-bold tracking-widest text-center text-lg outline-none border-amber-500/40"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-black text-sm shadow-xl shadow-indigo-500/25 transition disabled:opacity-50 active-press"
          >
            {loading ? 'Starting Live Stage...' : 'Launch Live Room'}
          </button>
        </form>
      </div>
    </div>
  );
}
