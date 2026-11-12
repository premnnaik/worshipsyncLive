import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import SongsSetup from './components/SongsSetup';
import JoinRoom from './components/JoinRoom';
import CreateRoomModal from './components/CreateRoomModal';
import AdminLive from './components/AdminLive';
import IncomerLive from './components/IncomerLive';

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'setup' | 'join' | 'admin-live' | 'incomer-live'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [initialRoomCode, setInitialRoomCode] = useState('');

  // Handle direct join link: e.g. /?join=WOR77
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const joinCode = params.get('join') || params.get('room');
    if (joinCode) {
      setInitialRoomCode(joinCode.toUpperCase());
      setView('join');
    }
  }, []);

  const handleRoomCreated = (room) => {
    setActiveRoom(room);
    setIsCreateModalOpen(false);
    setView('admin-live');
  };

  const handleRoomJoined = ({ room, user }) => {
    setActiveRoom(room);
    setCurrentUser(user);
    setView('incomer-live');
  };

  const handleQuickJoin = (code) => {
    setInitialRoomCode(code.toUpperCase());
    setView('join');
  };

  const handleLeaveRoom = () => {
    setActiveRoom(null);
    setCurrentUser(null);
    if (window.location.search) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    setView('home');
  };

  return (
    <div className="min-h-screen bg-[#050609] text-slate-100 font-sans">
      {view === 'home' && (
        <Home
          onSelectCreate={() => setIsCreateModalOpen(true)}
          onSelectJoin={() => setView('join')}
          onSelectSetup={() => setView('setup')}
          onQuickJoin={handleQuickJoin}
        />
      )}

      {view === 'setup' && (
        <SongsSetup onBack={() => setView('home')} />
      )}

      {view === 'join' && (
        <JoinRoom
          initialRoomCode={initialRoomCode}
          onBack={() => setView('home')}
          onJoined={handleRoomJoined}
        />
      )}

      {view === 'admin-live' && activeRoom && (
        <AdminLive
          room={activeRoom}
          onExitRoom={handleLeaveRoom}
        />
      )}

      {view === 'incomer-live' && activeRoom && (
        <IncomerLive
          room={activeRoom}
          user={currentUser}
          onLeaveRoom={handleLeaveRoom}
        />
      )}

      {/* Create Room Modal */}
      {isCreateModalOpen && (
        <CreateRoomModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreated={handleRoomCreated}
        />
      )}
    </div>
  );
}
