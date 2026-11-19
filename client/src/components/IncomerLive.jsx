import React, { useState, useEffect } from 'react';
import StageView from './StageView';
import QRCodeModal from './QRCodeModal';
import { socket, emitWithAck } from '../services/socket';
import { getSongs } from '../services/api';
import { Radio } from 'lucide-react';

export default function IncomerLive({ room, user, onLeaveRoom }) {
  const [currentSong, setCurrentSong] = useState(room.currentSong || null);
  const [activeCue, setActiveCue] = useState(room.activeCue || null);
  const [suggestedSongAlert, setSuggestedSongAlert] = useState(null);
  const [allSongs, setAllSongs] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [liveSongNotice, setLiveSongNotice] = useState('');

  useEffect(() => {
    getSongs().then((songs) => {
      setAllSongs(songs);
      if (!currentSong && songs.length > 0) {
        // If room has currentSong, use it; otherwise fallback
        setCurrentSong(room.currentSong || songs[0]);
      }
    }).catch(console.error);

    // Instant socket broadcast from Admin: changes within 1 second with NO refresh needed
    const handleSongChanged = (data) => {
      if (data?.song) {
        setCurrentSong(data.song);
        setActiveCue(null);
        setSuggestedSongAlert(null);
        setLiveSongNotice(`🎵 Admin switched live to: "${data.song.title}"`);
        setTimeout(() => setLiveSongNotice(''), 3500);
      }
    };

    const handleCueUpdated = (data) => {
      setActiveCue(data?.cue || null);
    };

    const handleSongSuggested = (data) => {
      // Show suggestion alert if this user is a Keyboardist
      const userRole = (user?.role || '').toLowerCase();
      if (userRole.includes('keyboard') || userRole.includes('piano')) {
        setSuggestedSongAlert(data);
      }
    };

    const handleSongsUpdated = (updatedSongs) => {
      if (Array.isArray(updatedSongs)) {
        setAllSongs(updatedSongs);
        setCurrentSong(prev => {
          if (!prev) return prev;
          const fresh = updatedSongs.find(s => s.id === prev.id);
          return fresh || prev;
        });
      }
    };

    // Auto-reconnect & restore session for 2+ hours continuous live worship
    const handleSocketConnect = async () => {
      try {
        const res = await emitWithAck('room:rejoin', {
          roomCode: room.code,
          isAdmin: false,
          name: user?.name || 'Musician',
          role: user?.role || 'Musician'
        });
        if (res?.room?.currentSong) {
          setCurrentSong(res.room.currentSong);
        }
        if (res?.room?.activeCue !== undefined) {
          setActiveCue(res.room.activeCue);
        }
      } catch (err) {
        console.warn('Incomer rejoin error:', err);
      }
    };

    // Heartbeat check every 10 seconds to ensure 100% sync over 2+ hour prayer meetings
    const syncInterval = setInterval(async () => {
      if (socket.connected) {
        try {
          const res = await emitWithAck('room:sync_check', { roomCode: room.code }, 4000);
          if (res?.success && res.currentSong) {
            if (res.currentSong.id !== currentSong?.id) {
              setCurrentSong(res.currentSong);
            }
            if (res.activeCue !== activeCue) {
              setActiveCue(res.activeCue);
            }
          }
        } catch (e) {}
      }
    }, 10000);

    socket.on('connect', handleSocketConnect);
    socket.on('room:song_changed', handleSongChanged);
    socket.on('room:cue_updated', handleCueUpdated);
    socket.on('room:song_suggested', handleSongSuggested);
    socket.on('songs:updated', handleSongsUpdated);

    return () => {
      clearInterval(syncInterval);
      socket.off('connect', handleSocketConnect);
      socket.off('room:song_changed', handleSongChanged);
      socket.off('room:cue_updated', handleCueUpdated);
      socket.off('room:song_suggested', handleSongSuggested);
      socket.off('songs:updated', handleSongsUpdated);
    };
  }, [user, room.code, currentSong?.id, activeCue]);

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

  // Musician / Singer cannot desync their stage screen from Admin!
  // Instead, suggesting the song to Admin / Keyboardist:
  const handlePushSong = async (song) => {
    const isKeyboard = (user?.role || '').toLowerCase().includes('keyboard') || (user?.role || '').toLowerCase().includes('piano');
    if (isKeyboard) {
      try {
        await emitWithAck('room:push_song', {
          roomCode: room.code,
          song
        });
        setCurrentSong(song);
      } catch (err) {
        console.error(err);
      }
    } else {
      // Send as suggestion to Worship Leader so everyone stays on the Admin's song!
      handleSuggestSong(song);
    }
  };

  // Lead Singer / Drums suggests song to Admin
  const handleSuggestSong = async (song) => {
    try {
      await emitWithAck('room:suggest_song', {
        roomCode: room.code,
        song,
        suggestedBy: user?.name || 'Musician',
        role: user?.role || 'Lead Singer'
      });
    } catch (err) {
      console.error('Suggest song error:', err);
    }
  };

  return (
    <>
      {/* Live Admin Song Changed Instant Banner */}
      {liveSongNotice && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-4 py-2 rounded-2xl shadow-2xl border border-emerald-400 font-bold text-xs flex items-center gap-2 animate-bounce">
          <Radio className="w-4 h-4 text-emerald-200 shrink-0" />
          <span>{liveSongNotice}</span>
        </div>
      )}

      <StageView
        currentSong={currentSong}
        user={user}
        room={room}
        allSongs={allSongs}
        activeCue={activeCue}
        suggestedSongAlert={suggestedSongAlert}
        onDismissSuggestion={() => setSuggestedSongAlert(null)}
        onQuickEdit={handleQuickEdit}
        onPushSong={handlePushSong}
        onSuggestSong={handleSuggestSong}
        onLeaveRoom={onLeaveRoom}
        onShowQR={() => setShowQR(true)}
      />

      {showQR && (
        <QRCodeModal
          room={room}
          onClose={() => setShowQR(false)}
        />
      )}
    </>
  );
}
