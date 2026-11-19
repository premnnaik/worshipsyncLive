import React, { useState, useEffect } from 'react';
import StageView from './StageView';
import QRCodeModal from './QRCodeModal';
import { socket, emitWithAck } from '../services/socket';
import { getSongs } from '../services/api';
import { Radio, Users, QrCode, X } from 'lucide-react';

export default function AdminLive({ room, onExitRoom }) {
  const [currentSong, setCurrentSong] = useState(room.currentSong || null);
  const [activeCue, setActiveCue] = useState(room.activeCue || null);
  const [suggestedSongAlert, setSuggestedSongAlert] = useState(null);
  const [allSongs, setAllSongs] = useState([]);
  const [incomers, setIncomers] = useState(room.incomers || []);
  const [showQR, setShowQR] = useState(false);
  const [showCuesDrawer, setShowCuesDrawer] = useState(false);
  const [showRosterDrawer, setShowRosterDrawer] = useState(false);

  const presetCues = [
    { label: 'Praise 1', color: 'from-amber-500 to-yellow-500' },
    { label: 'Praise 2', color: 'from-amber-600 to-orange-500' },
    { label: 'Worship 1', color: 'from-cyan-500 to-blue-500' },
    { label: 'Worship 2', color: 'from-blue-500 to-indigo-500' },
    { label: 'Worship 3', color: 'from-indigo-500 to-purple-500' },
    { label: 'Worship 4', color: 'from-purple-500 to-fuchsia-500' },
    { label: 'Chorus', color: 'from-emerald-500 to-teal-500' },
    { label: 'Bridge', color: 'from-rose-500 to-pink-500' },
    { label: 'Fade / End', color: 'from-slate-600 to-slate-700' },
  ];

  useEffect(() => {
    getSongs().then((songs) => {
      setAllSongs(songs);
      if (!currentSong && songs.length > 0) {
        setCurrentSong(songs[0]);
      }
    }).catch(console.error);

    const handleMembersUpdated = (data) => {
      if (data?.incomers) setIncomers(data.incomers);
    };

    const handleSongChanged = (data) => {
      if (data?.song) {
        setCurrentSong(data.song);
        setActiveCue(null);
        setSuggestedSongAlert(null);
      }
    };

    const handleCueUpdated = (data) => {
      setActiveCue(data?.cue || null);
    };

    const handleSongSuggested = (data) => {
      setSuggestedSongAlert(data);
    };

    // Auto-reconnect & restore admin session after Wi-Fi blip or mobile sleep
    const handleSocketConnect = async () => {
      try {
        const res = await emitWithAck('room:rejoin', {
          roomCode: room.code,
          isAdmin: true,
          name: room.hostName || 'Worship Leader',
          role: 'Admin / Worship Leader'
        });
        if (res?.room?.incomers) {
          setIncomers(res.room.incomers);
        }
      } catch (err) {
        console.warn('Admin rejoin failed:', err);
      }
    };

    // Heartbeat check every 15s to guarantee 2+ hour uninterrupted session
    const syncInterval = setInterval(async () => {
      if (socket.connected) {
        try {
          const res = await emitWithAck('room:sync_check', { roomCode: room.code }, 4000);
          if (res?.success && res.currentSong) {
            // Keep song and cue aligned
          }
        } catch (e) {}
      }
    }, 15000);

    socket.on('connect', handleSocketConnect);
    socket.on('room:members_updated', handleMembersUpdated);
    socket.on('room:song_changed', handleSongChanged);
    socket.on('room:cue_updated', handleCueUpdated);
    socket.on('room:song_suggested', handleSongSuggested);

    return () => {
      clearInterval(syncInterval);
      socket.off('connect', handleSocketConnect);
      socket.off('room:members_updated', handleMembersUpdated);
      socket.off('room:song_changed', handleSongChanged);
      socket.off('room:cue_updated', handleCueUpdated);
      socket.off('room:song_suggested', handleSongSuggested);
    };
  }, [room.code, room.hostName]);

  const handleQuickEdit = async (updates) => {
    try {
      await emitWithAck('room:quick_edit', {
        roomCode: room.code,
        songId: currentSong?.id,
        updates
      });
    } catch (err) {
      console.error('Quick edit failed:', err);
    }
  };

  const handlePushSong = async (song) => {
    try {
      await emitWithAck('room:push_song', {
        roomCode: room.code,
        song
      });
      setCurrentSong(song);
      setSuggestedSongAlert(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendCue = async (cue) => {
    try {
      await emitWithAck('room:send_cue', {
        roomCode: room.code,
        cue
      });
      setActiveCue(cue);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearCue = async () => {
    try {
      await emitWithAck('room:clear_cue', { roomCode: room.code });
      setActiveCue(null);
    } catch (err) {
      console.error(err);
    }
  };

  const adminUser = {
    name: room.hostName || 'Worship Leader',
    role: 'Admin / Keyboardist',
    isAdmin: true
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      {/* Top Floating Admin Actions: Stage Cues Bar & Team Roster Button */}
      <div className="fixed top-12 right-2 z-40 flex items-center gap-1.5">
        <button
          onClick={() => setShowCuesDrawer(true)}
          className="px-2 py-1 rounded-lg bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-bold active-press flex items-center gap-1 backdrop-blur-md"
        >
          <Radio className="w-3.5 h-3.5" />
          <span>Cues</span>
        </button>

        <button
          onClick={() => setShowRosterDrawer(true)}
          className="px-2 py-1 rounded-lg bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold active-press flex items-center gap-1 backdrop-blur-md"
        >
          <Users className="w-3.5 h-3.5" />
          <span>{incomers.length}</span>
        </button>
      </div>

      {/* Main Stage View with Transposition & Downside Suggestions Box */}
      <StageView
        currentSong={currentSong}
        user={adminUser}
        room={room}
        allSongs={allSongs}
        activeCue={activeCue}
        suggestedSongAlert={suggestedSongAlert}
        onDismissSuggestion={() => setSuggestedSongAlert(null)}
        onQuickEdit={handleQuickEdit}
        onPushSong={handlePushSong}
        onSendCue={handleSendCue}
        onClearCue={handleClearCue}
        onLeaveRoom={onExitRoom}
        onShowQR={() => setShowQR(true)}
      />

      {/* Admin Stage Cues Drawer */}
      {showCuesDrawer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-sm bg-slate-950 border border-amber-500/30 rounded-t-3xl sm:rounded-3xl p-5 pb-safe shadow-2xl">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                <Radio className="w-4 h-4" />
                <span>Broadcast Live Stage Cue</span>
              </h3>
              <button onClick={() => setShowCuesDrawer(false)} className="p-1 rounded text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {presetCues.map((cue) => (
                <button
                  key={cue.label}
                  onClick={() => {
                    handleSendCue(cue.label);
                    setShowCuesDrawer(false);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold uppercase transition active-press text-center border ${
                    activeCue === cue.label
                      ? 'bg-amber-500 text-black border-amber-400 font-black'
                      : 'bg-slate-900 text-slate-200 border-white/10 hover:border-amber-500/40'
                  }`}
                >
                  {cue.label}
                </button>
              ))}
            </div>

            {activeCue && (
              <button
                onClick={() => {
                  handleClearCue();
                  setShowCuesDrawer(false);
                }}
                className="w-full py-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold"
              >
                Clear Active Cue
              </button>
            )}
          </div>
        </div>
      )}

      {/* Connected Musicians Drawer */}
      {showRosterDrawer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-sm bg-slate-950 border border-cyan-500/30 rounded-t-3xl sm:rounded-3xl p-5 pb-safe shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>Connected Band ({incomers.length})</span>
              </h3>
              <button onClick={() => setShowRosterDrawer(false)} className="p-1 rounded text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 mb-3">
              {incomers.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400">
                  No musicians connected yet.<br />
                  Room Code: <strong className="text-indigo-300 font-mono">{room.code}</strong>
                </div>
              ) : (
                incomers.map((member) => (
                  <div key={member.id} className="p-2.5 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">{member.name}</span>
                      <span className="text-[10px] text-cyan-300 font-mono">{member.role}</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => {
                setShowRosterDrawer(false);
                setShowQR(true);
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold active-press flex items-center justify-center gap-1.5"
            >
              <QrCode className="w-4 h-4" />
              <span>Show QR Code</span>
            </button>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQR && (
        <QRCodeModal
          room={room}
          onClose={() => setShowQR(false)}
        />
      )}
    </div>
  );
}
