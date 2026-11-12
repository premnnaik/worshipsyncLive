import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, Share2, Shield, Wifi, Edit2 } from 'lucide-react';
import { getNetworkInfo } from '../services/api';

export default function QRCodeModal({ room, onClose }) {
  const [copied, setCopied] = useState(false);
  const [networkIp, setNetworkIp] = useState('192.168.31.21');
  const [isEditingIp, setIsEditingIp] = useState(false);

  useEffect(() => {
    getNetworkInfo().then((info) => {
      if (info?.localIp && info.localIp !== 'localhost') {
        setNetworkIp(info.localIp);
      }
    });
  }, []);

  if (!room) return null;

  // If running on localhost, use the real Wi-Fi IP so phones can connect!
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const effectiveHost = isLocalhost ? `${networkIp}:5173` : window.location.host;
  const joinUrl = `${window.location.protocol}//${effectiveHost}/?join=${room.code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(joinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm p-6 rounded-3xl glass-panel-elevated shadow-2xl border border-white/10 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg active-press"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center justify-center w-11 h-11 mb-2 rounded-2xl bg-indigo-500/20 text-indigo-400">
          <Share2 className="w-5 h-5" />
        </div>

        <h3 className="text-xl font-black text-white mb-0.5">Scan to Join Stage</h3>
        <p className="text-xs text-slate-400 mb-3">
          Point phone camera at this QR code to sync.
        </p>

        {/* Wi-Fi Alert Notice (Explains why phone needs Wi-Fi) */}
        <div className="flex items-center justify-between text-left gap-2 mb-3 bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-500/20 text-[11px] text-indigo-200">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Connect phone to same Wi-Fi</span>
          </div>
          <button
            onClick={() => setIsEditingIp(!isEditingIp)}
            className="text-[10px] text-cyan-400 hover:underline flex items-center gap-0.5 shrink-0"
          >
            <Edit2 className="w-3 h-3" />
            <span>IP</span>
          </button>
        </div>

        {isEditingIp && (
          <div className="mb-3 text-left p-2 rounded-xl bg-slate-900 border border-white/10">
            <label className="text-[10px] text-slate-400 block mb-1">Your Computer Wi-Fi IP:</label>
            <input
              type="text"
              value={networkIp}
              onChange={(e) => setNetworkIp(e.target.value)}
              className="w-full px-2 py-1 text-xs font-mono rounded bg-slate-950 text-white outline-none border border-white/15"
            />
          </div>
        )}

        {/* QR Code */}
        <div className="p-3.5 bg-white rounded-2xl inline-block shadow-xl mx-auto mb-3">
          <QRCodeSVG
            value={joinUrl}
            size={190}
            level="H"
            includeMargin={true}
          />
        </div>

        {/* Room Code Badge */}
        <div className="mb-3">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 font-mono">
            ROOM CODE
          </span>
          <div className="text-2xl font-mono font-black tracking-widest text-indigo-300 bg-slate-950/90 py-1.5 px-4 rounded-xl border border-indigo-500/40 inline-block">
            {room.code}
          </div>
        </div>

        {room.isPrivate && room.pin && (
          <div className="flex items-center justify-center gap-1.5 mb-3 text-amber-400 text-xs bg-amber-500/10 py-1 px-3 rounded-lg border border-amber-500/20 font-mono">
            <Shield className="w-3.5 h-3.5" />
            <span>PIN: <strong>{room.pin}</strong></span>
          </div>
        )}

        {/* Copy Direct Link */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-white/10 mb-3">
          <input
            type="text"
            readOnly
            value={joinUrl}
            className="w-full bg-transparent text-[11px] text-slate-300 px-2 outline-none truncate font-mono"
          />
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 flex items-center gap-1 ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold active-press"
        >
          Close
        </button>
      </div>
    </div>
  );
}
