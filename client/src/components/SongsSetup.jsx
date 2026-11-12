import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Plus, Search, Music, Sparkles, Clock, Hash, FileText, 
  Image as ImageIcon, Trash2, Edit3, Check, X, Upload, Zap
} from 'lucide-react';
import { getSongs, createSong, updateSong, deleteSong } from '../services/api';

export default function SongsSetup({ onBack }) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [editingSong, setEditingSong] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Worship');
  const [tempo, setTempo] = useState(72);
  const [styleNumber, setStyleNumber] = useState('');
  const [chords, setChords] = useState('');
  const [lyricsMode, setLyricsMode] = useState('text');
  const [lyricsText, setLyricsText] = useState('');
  const [lyricsImage, setLyricsImage] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  
  // Tap Tempo state
  const tapTimesRef = useRef([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchSongsList();
  }, []);

  const fetchSongsList = async () => {
    setLoading(true);
    try {
      const data = await getSongs();
      setSongs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setType('Worship');
    setTempo(72);
    setStyleNumber('');
    setChords('');
    setLyricsMode('text');
    setLyricsText('');
    setLyricsImage(null);
    setImageFileName('');
    setEditingSong(null);
    setIsFormOpen(false);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleEdit = (song) => {
    setEditingSong(song);
    setTitle(song.title);
    setType(song.type || 'Worship');
    setTempo(song.tempo || 72);
    setStyleNumber(song.styleNumber || '');
    setChords(song.chords || '');
    setLyricsText(song.lyricsText || '');
    setLyricsImage(song.lyricsImage || null);
    setImageFileName(song.lyricsImage ? 'Attached Screenshot' : '');
    setLyricsMode(song.lyricsImage ? 'image' : 'text');
    setIsFormOpen(true);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this song from library?')) return;
    try {
      await deleteSong(id);
      setSongs(songs.filter(s => s.id !== id));
    } catch (err) {
      alert('Failed to delete song: ' + err.message);
    }
  };

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WebP).');
      return;
    }

    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setLyricsImage(event.target.result);
      setLyricsMode('image');
    };
    reader.readAsDataURL(file);
  };

  // Mobile Tap Tempo calculation
  const handleTapTempo = () => {
    const now = performance.now();
    const times = tapTimesRef.current;
    
    if (times.length > 0 && now - times[times.length - 1] > 2000) {
      times.length = 0;
    }

    times.push(now);
    if (times.length > 5) times.shift();

    if (times.length >= 2) {
      const intervals = [];
      for (let i = 1; i < times.length; i++) {
        intervals.push(times[i] - times[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      if (calculatedBpm >= 30 && calculatedBpm <= 240) {
        setTempo(calculatedBpm);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Song title is required.');
      return;
    }

    setSaving(true);
    const payload = {
      title: title.trim(),
      type,
      tempo: Number(tempo) || 72,
      styleNumber: styleNumber.trim(),
      chords: chords.trim(),
      lyricsText: lyricsMode === 'text' ? lyricsText.trim() : (lyricsText || ''),
      lyricsImage: lyricsMode === 'image' ? lyricsImage : null
    };

    try {
      if (editingSong) {
        const updated = await updateSong(editingSong.id, payload);
        setSongs(songs.map(s => s.id === updated.id ? updated : s));
      } else {
        const created = await createSong(payload);
        setSongs([created, ...songs]);
      }
      resetForm();
    } catch (err) {
      alert('Error saving song: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Filter and sort songs: First A-Z Kannada songs, then English songs A-Z
  const filteredSongs = songs
    .filter(s => {
      const q = search.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        s.title.toLowerCase().includes(q) ||
        (s.songNumber && String(s.songNumber).includes(q)) ||
        (s.chords && s.chords.toLowerCase().includes(q)) ||
        (s.styleNumber && s.styleNumber.toLowerCase().includes(q));
      const matchesType = filterType === 'ALL' || s.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      const aIsEng = a.category === 'english' || a.id?.includes('way-maker') || a.id?.includes('10000');
      const bIsEng = b.category === 'english' || b.id?.includes('way-maker') || b.id?.includes('10000');
      if (aIsEng !== bIsEng) return aIsEng ? 1 : -1;
      return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
    });

  const kannadaLibrarySongs = filteredSongs.filter(s => !(s.category === 'english' || s.id?.includes('way-maker') || s.id?.includes('10000')));
  const englishLibrarySongs = filteredSongs.filter(s => (s.category === 'english' || s.id?.includes('way-maker') || s.id?.includes('10000')));

  return (
    <div className="min-h-screen bg-[#050609] pb-safe flex flex-col select-none">
      {/* Mobile Top Header */}
      <header className="sticky top-0 z-30 pt-safe px-3 py-2.5 bg-slate-950/95 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 active-press"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-base font-bold text-white flex items-center gap-1.5">
                <Music className="w-4 h-4 text-emerald-400" />
                Song Library
              </h1>
            </div>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-md active-press"
          >
            <Plus className="w-4 h-4" />
            <span>Add Song</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-3 pt-3 flex-1 w-full pb-20">
        {/* Search Bar & Filter Chips */}
        <div className="space-y-2 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search title, chords, style..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-white/5">
            {['ALL', 'Praise', 'Worship'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`flex-1 py-1 text-center rounded-lg text-xs font-semibold transition ${
                  filterType === tab ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                {tab === 'ALL' ? 'All Songs' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Songs List */}
        {loading ? (
          <div className="py-16 text-center text-xs text-slate-500">Loading songs library...</div>
        ) : filteredSongs.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-2xl border border-white/5 p-4">
            <Music className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-slate-300 mb-1">No songs found</h3>
            <p className="text-xs text-slate-500 mb-4">
              {search ? 'Try another search keyword' : 'Create your first song for Sunday service'}
            </p>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold transition active-press"
            >
              Add New Song
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 1. Kannada Songs (A-Z) */}
            {kannadaLibrarySongs.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-2.5 py-1.5 mb-2 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs font-black font-mono text-cyan-400">
                  <span>Kannada Songs (A-Z)</span>
                  <span className="text-cyan-300">({kannadaLibrarySongs.length})</span>
                </div>
                <div className="space-y-2.5">
                  {kannadaLibrarySongs.map((song) => (
                    <div
                      key={song.id}
                      onClick={() => handleEdit(song)}
                      className="p-3.5 rounded-2xl glass-panel hover:glass-panel-elevated border border-white/5 active-press transition cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              song.type === 'Praise'
                                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                            }`}
                          >
                            {song.type}
                          </span>
                          {song.songNumber && (
                            <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-500/30">
                              #{song.songNumber}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleEdit(song)}
                            className="p-1 rounded-lg text-slate-400 hover:text-white"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(song.id, e)}
                            className="p-1 rounded-lg text-rose-400/80 hover:text-rose-400"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white mb-2">{song.title}</h3>

                      {/* Metadata Pills */}
                      <div className="flex flex-wrap gap-1.5 text-xs font-mono mb-2">
                        <span className="px-2 py-0.5 rounded-lg bg-slate-900 text-emerald-400 border border-emerald-500/20 font-bold">
                          {song.tempo} BPM
                        </span>
                        {song.styleNumber && (
                          <span className="px-2 py-0.5 rounded-lg bg-slate-900 text-purple-400 border border-purple-500/20 font-bold">
                            Style: {song.styleNumber}
                          </span>
                        )}
                        {song.chords && (
                          <span className="px-2 py-0.5 rounded-lg bg-slate-900 text-indigo-300 border border-indigo-500/20 truncate max-w-[140px]">
                            {song.chords}
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-400 truncate">
                        {song.lyricsText?.slice(0, 70) || song.kannadaLyrics?.slice(0, 70) || 'Lyrics available'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. English Songs (A-Z) */}
            {englishLibrarySongs.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-2.5 py-1.5 mb-2 bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs font-black font-mono text-amber-400">
                  <span>English Songs (A-Z)</span>
                  <span className="text-amber-300">({englishLibrarySongs.length})</span>
                </div>
                <div className="space-y-2.5">
                  {englishLibrarySongs.map((song) => (
                    <div
                      key={song.id}
                      onClick={() => handleEdit(song)}
                      className="p-3.5 rounded-2xl glass-panel hover:glass-panel-elevated border border-white/5 active-press transition cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              song.type === 'Praise'
                                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                            }`}
                          >
                            {song.type}
                          </span>
                          {song.songNumber && (
                            <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/70 px-2 py-0.5 rounded border border-amber-500/30">
                              #{song.songNumber}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleEdit(song)}
                            className="p-1 rounded-lg text-slate-400 hover:text-white"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(song.id, e)}
                            className="p-1 rounded-lg text-rose-400/80 hover:text-rose-400"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white mb-2">{song.title}</h3>

                      {/* Metadata Pills */}
                      <div className="flex flex-wrap gap-1.5 text-xs font-mono mb-2">
                        <span className="px-2 py-0.5 rounded-lg bg-slate-900 text-emerald-400 border border-emerald-500/20 font-bold">
                          {song.tempo} BPM
                        </span>
                        {song.styleNumber && (
                          <span className="px-2 py-0.5 rounded-lg bg-slate-900 text-purple-400 border border-purple-500/20 font-bold">
                            Style: {song.styleNumber}
                          </span>
                        )}
                        {song.chords && (
                          <span className="px-2 py-0.5 rounded-lg bg-slate-900 text-indigo-300 border border-indigo-500/20 truncate max-w-[140px]">
                            {song.chords}
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-400 truncate">
                        {song.lyricsText?.slice(0, 70) || song.englishLyrics?.slice(0, 70) || 'Lyrics available'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add / Edit Song Full-screen Mobile Drawer */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#050609] overflow-y-auto pt-safe pb-safe px-4 animate-fadeIn">
          <div className="max-w-md mx-auto w-full my-auto py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                {editingSong ? 'Edit Worship Song' : 'New Worship Song'}
              </h2>
              <button
                onClick={resetForm}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Title */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Song Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Goodness of God"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-sm outline-none font-bold"
                />
              </div>

              {/* Type Toggle */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Type
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-white/5">
                  <button
                    type="button"
                    onClick={() => setType('Worship')}
                    className={`py-2 text-xs font-bold rounded-lg transition ${
                      type === 'Worship' ? 'bg-cyan-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    Worship
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('Praise')}
                    className={`py-2 text-xs font-bold rounded-lg transition ${
                      type === 'Praise' ? 'bg-amber-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    Praise
                  </button>
                </div>
              </div>

              {/* Tempo & Tap Tempo Button for Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Tempo (BPM)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="260"
                    value={tempo}
                    onChange={(e) => setTempo(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-emerald-400 font-mono font-extrabold text-lg outline-none text-center"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Thumb Tap
                  </label>
                  <button
                    type="button"
                    onClick={handleTapTempo}
                    className="w-full py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold active-press transition flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Tap BPM</span>
                  </button>
                </div>
              </div>

              {/* Style Number & Chords */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Style Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 084 / 142"
                    value={styleNumber}
                    onChange={(e) => setStyleNumber(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-purple-300 font-mono text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Chords / Key
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Key of E"
                    value={chords}
                    onChange={(e) => setChords(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-indigo-300 font-mono text-sm outline-none"
                  />
                </div>
              </div>

              {/* Lyrics Mode Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                    Lyrics / Chord Chart
                  </label>
                  <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setLyricsMode('text')}
                      className={`px-2 py-0.5 text-xs font-semibold rounded ${
                        lyricsMode === 'text' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Text
                    </button>
                    <button
                      type="button"
                      onClick={() => setLyricsMode('image')}
                      className={`px-2 py-0.5 text-xs font-semibold rounded ${
                        lyricsMode === 'image' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Image
                    </button>
                  </div>
                </div>

                {lyricsMode === 'text' ? (
                  <textarea
                    rows="6"
                    placeholder="Paste lyrics with [Verse 1] and [Chorus]..."
                    value={lyricsText}
                    onChange={(e) => setLyricsText(e.target.value)}
                    className="w-full p-3 rounded-xl glass-input text-white text-xs font-sans leading-relaxed outline-none resize-none"
                  />
                ) : (
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageFile}
                      className="hidden"
                    />

                    {lyricsImage ? (
                      <div className="p-2 rounded-xl border border-white/10 bg-slate-950 text-center">
                        <img
                          src={lyricsImage}
                          alt="Sheet Preview"
                          className="max-h-48 mx-auto rounded-lg object-contain mb-2"
                        />
                        <div className="flex items-center justify-center gap-3 text-xs">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-indigo-400 font-bold"
                          >
                            Replace
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setLyricsImage(null);
                              setImageFileName('');
                            }}
                            className="text-rose-400 font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer border-2 border-dashed border-white/15 rounded-xl p-6 text-center bg-slate-900/50 active-press"
                      >
                        <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                        <p className="text-xs font-bold text-slate-300">Tap to upload chord chart screenshot</p>
                        <p className="text-[10px] text-slate-500">PNG, JPG, or screenshot</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold active-press"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 active-press"
                >
                  {saving ? 'Saving...' : 'Save Song'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
