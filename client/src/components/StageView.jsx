import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Play, Pause, 
  Maximize2, Minimize2, Share2, Music, Check, Sparkles, Send, X, AlertCircle, Radio
} from 'lucide-react';
import { useWakeLock } from '../hooks/useWakeLock';
import { 
  calculateSemitoneShift, 
  transposeChordLine, 
  isChordLine, 
  isMinorKey,
  detectSongKey,
  shouldUseFlatScale,
  getKannadaTitle
} from '../utils/musicTransposer';

// Major and Minor Key lists supporting standard worship keys and enharmonics
const MAJOR_KEYS = [
  { value: 'C', display: 'C' },
  { value: 'Db', display: 'Db / C#' },
  { value: 'D', display: 'D' },
  { value: 'Eb', display: 'Eb / D#' },
  { value: 'E', display: 'E' },
  { value: 'F', display: 'F' },
  { value: 'F#', display: 'F# / Gb' },
  { value: 'G', display: 'G' },
  { value: 'Ab', display: 'Ab / G#' },
  { value: 'A', display: 'A' },
  { value: 'Bb', display: 'Bb / A#' },
  { value: 'B', display: 'B' }
];

const MINOR_KEYS = [
  { value: 'Cm', display: 'Cm' },
  { value: 'C#m', display: 'C#m / Dbm' },
  { value: 'Dm', display: 'Dm' },
  { value: 'Ebm', display: 'Ebm / D#m' },
  { value: 'Em', display: 'Em' },
  { value: 'Fm', display: 'Fm' },
  { value: 'F#m', display: 'F#m / Gbm' },
  { value: 'Gm', display: 'Gm' },
  { value: 'Abm', display: 'Abm / G#m' },
  { value: 'Am', display: 'Am' },
  { value: 'Bbm', display: 'Bbm / A#m' },
  { value: 'Bm', display: 'Bm' }
];

export default function StageView({
  currentSong,
  user,
  room,
  allSongs = [],
  activeCue,
  onClearCue,
  suggestedSongAlert,
  onDismissSuggestion,
  onQuickEdit,
  onPushSong,
  onSuggestSong,
  onLeaveRoom,
  onShowQR
}) {
  const userRole = (user?.role || '').toLowerCase();
  
  // Permissions:
  // Admin & Keyboardist can edit Style, Tempo, and Chords
  const isEditable = Boolean(user?.isAdmin || userRole.includes('keyboard') || userRole.includes('piano'));

  // Role detection for Clean Lyrics (Singer, Lead Singer, Sound/Audio):
  // 1. Remove text row [style=75 temp=108 chords:- Gm key:Gm]
  // 2. Remove [📖 Chords Gm] button in footer
  // 3. Remove chords on lyrics (pure lyrics only)
  const isCleanLyricsRole = (!user?.isAdmin) && (
    userRole.includes('singer') || 
    userRole.includes('vocal') || 
    userRole.includes('sound') || 
    userRole.includes('audio')
  );

  // Backward compatibility alias
  const isSingerOrSound = isCleanLyricsRole;

  // Role visibility for Downside Suggestions Box:
  // Lead Singer, Drums, Keyboard, Admin CAN see and suggest songs.
  // Regular "Singer", "Sound", etc. must see ONLY the song with NO suggestions box!
  const canSeeSuggestions = Boolean(
    user?.isAdmin || 
    userRole.includes('lead') || 
    userRole.includes('drum') || 
    userRole.includes('keyboard') || 
    userRole.includes('piano')
  );

  // Can this user suggest songs to the Admin / Keyboardist? (Lead Singer, Drums)
  const canSuggest = !isEditable && canSeeSuggestions;

  // Local state for editable inputs
  const [styleInput, setStyleInput] = useState(currentSong?.styleNumber || '');
  const [tempoInput, setTempoInput] = useState(currentSong?.tempo || 72);
  const [chordsInput, setChordsInput] = useState(currentSong?.chords || 'Cm');
  const [saveToast, setSaveToast] = useState('');

  // Transpose dropdown visibility
  const [showTransposeMenu, setShowTransposeMenu] = useState(false);

  // Language toggle from Image 1: English vs Kannada
  const [language, setLanguage] = useState('kannada'); // 'kannada' | 'english' | 'both'

  // Search & quick song dropdown from Image 2: [ Q Search Song [V] ]
  const [searchQuery, setSearchQuery] = useState('');
  const [showSongPicker, setShowSongPicker] = useState(false);
  // Filter within Search Dropdown: 'ALL' | 'Worship' | 'Praise' (From User Sketch Image 1)
  const [dropdownTypeFilter, setDropdownTypeFilter] = useState('ALL');

  // Auto scroll state from Image 1
  const [autoScroll, setAutoScroll] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);

  // DEFAULT FONT SIZE = 18 as requested!
  const [fontSize, setFontSize] = useState(18);
  // Default chords ON for musicians / keyboardists / admin; clean lyrics for singers/sound!
  const [showChords, setShowChords] = useState(!isSingerOrSound);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Recently opened songs for the Downside Box
  const [recentSongs, setRecentSongs] = useState([]);
  // Toggle Hide (> down) / Show (> up) for Recent / Live Songs tray
  const [showSuggestionsTray, setShowSuggestionsTray] = useState(true);

  // Mini Window Preview Modal state for clicking any song card
  const [previewSong, setPreviewSong] = useState(null);

  const lyricsContainerRef = useRef(null);
  const autoScrollRef = useRef(null);
  const { isLocked, requestWakeLock } = useWakeLock();

  // Keep track of recently opened songs
  useEffect(() => {
    if (currentSong) {
      setStyleInput(currentSong.styleNumber || '');
      setTempoInput(currentSong.tempo || 72);
      setChordsInput(currentSong.chords || 'Cm');

      // Update recently opened songs list
      setRecentSongs(prev => {
        const filtered = prev.filter(s => s.id !== currentSong.id);
        return [currentSong, ...filtered].slice(0, 6);
      });
    }
  }, [currentSong]);

  useEffect(() => {
    requestWakeLock();
  }, [requestWakeLock]);

  // Auto-scroll loop
  useEffect(() => {
    if (autoScroll && lyricsContainerRef.current) {
      autoScrollRef.current = setInterval(() => {
        if (lyricsContainerRef.current) {
          lyricsContainerRef.current.scrollTop += scrollSpeed;
        }
      }, 45);
    } else {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    }
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [autoScroll, scrollSpeed]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullScreen(false);
      }
    }
  };

  const handleSaveStyle = () => {
    if (!isEditable) return;
    if (styleInput !== currentSong?.styleNumber) {
      onQuickEdit?.({ styleNumber: styleInput.trim() });
      triggerSaveToast('Style Saved!');
    }
  };

  const handleSaveTempo = () => {
    if (!isEditable) return;
    const num = Number(tempoInput);
    if (num && num !== currentSong?.tempo) {
      onQuickEdit?.({ tempo: num });
      triggerSaveToast(`Tempo (${num} BPM) Saved!`);
    }
  };

  const handleSaveChords = (newChord) => {
    if (!isEditable) return;
    const chordToSave = newChord !== undefined ? newChord : chordsInput;
    setChordsInput(chordToSave);
    onQuickEdit?.({ chords: chordToSave.trim() });
    setShowTransposeMenu(false);
    triggerSaveToast(`Key Changed to ${chordToSave}!`);
  };

  const triggerSaveToast = (msg) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 2500);
  };

  // Next and Previous Song Navigation (< and > from Image 1)
  const currentIndex = allSongs.findIndex(s => s.id === currentSong?.id);
  const handlePrevSong = () => {
    if (allSongs.length > 0) {
      const prevIdx = (currentIndex - 1 + allSongs.length) % allSongs.length;
      onPushSong?.(allSongs[prevIdx]);
    }
  };
  const handleNextSong = () => {
    if (allSongs.length > 0) {
      const nextIdx = (currentIndex + 1) % allSongs.length;
      onPushSong?.(allSongs[nextIdx]);
    }
  };

  // Filter songs for search dropdown based on search query AND dropdown type filter [ Worship ] [ Praise ]
  // Sorted strictly: First A-Z Kannada songs, then English songs A-Z
  const filteredDropdownSongs = allSongs
    .filter(s => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        s.title.toLowerCase().includes(q) ||
        (s.songNumber && String(s.songNumber).includes(q)) ||
        (s.chords && s.chords.toLowerCase().includes(q));
      const matchesType = dropdownTypeFilter === 'ALL' || s.type === dropdownTypeFilter;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      const aIsEng = a.category === 'english' || a.id?.includes('way-maker') || a.id?.includes('10000');
      const bIsEng = b.category === 'english' || b.id?.includes('way-maker') || b.id?.includes('10000');
      if (aIsEng !== bIsEng) return aIsEng ? 1 : -1;
      return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
    });

  const kannadaDropdownSongs = filteredDropdownSongs.filter(s => !(s.category === 'english' || s.id?.includes('way-maker') || s.id?.includes('10000')));
  const englishDropdownSongs = filteredDropdownSongs.filter(s => (s.category === 'english' || s.id?.includes('way-maker') || s.id?.includes('10000')));

  // Calculate dynamic transposition semitone shift
  // Original base chord in song object vs current chosen target chord
  const originalBaseChord = (currentSong?.originalKey || detectSongKey(currentSong) || 'Em').trim();
  const currentTargetChord = (chordsInput || currentSong?.chords || originalBaseChord).trim();
  const semitoneShift = calculateSemitoneShift(originalBaseChord, currentTargetChord);

  // Check if current chord is Minor or Major for the Transpose Dropdown
  const activeChordIsMinor = isMinorKey(currentTargetChord) || isMinorKey(originalBaseChord);
  // Major Key -> Only Major Chords (C, Db, D ...); Minor Key -> Only Minor Chords (Cm, C#m, Dm ...)
  const availableTransposeKeys = activeChordIsMinor ? MINOR_KEYS : MAJOR_KEYS;

  // Downside suggested songs list (Recent songs + available live songs, ensuring at least 3 cards always)
  const suggestionCards = React.useMemo(() => {
    const list = [...recentSongs];
    for (const song of allSongs) {
      if (!list.some(s => s.id === song.id)) {
        list.push(song);
      }
    }
    if (list.length === 0 && currentSong) {
      list.push(currentSong);
    }
    return list.slice(0, 6);
  }, [recentSongs, allSongs, currentSong]);

  // Extract starting lyrics snippet for cards
  const getStartingLyricsSnippet = (song) => {
    if (!song) return '';
    const text = song.kannadaLyrics || song.englishLyrics || song.lyricsText || '';
    const lines = text.split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !isChordLine(l) && !(l.startsWith('[') && l.endsWith(']')));
    return lines.slice(0, 1).join(' ') || '';
  };

  // Extract starting lyrics lines for mini preview modal
  const getStartingLyricsLines = (song) => {
    if (!song) return [];
    const text = (language === 'english' ? (song.englishLyrics || song.lyricsText) : (song.kannadaLyrics || song.englishLyrics || song.lyricsText)) || '';
    return text.split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !isChordLine(l) && !(l.startsWith('[') && l.endsWith(']')))
      .slice(0, 10);
  };

  // Render lyrics with chords dynamically transposed and positioned directly over words!
  const renderLyricsLines = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={idx} className="h-4" />;
      }
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        return (
          <div key={idx} className="text-xs font-bold uppercase tracking-widest text-indigo-400 mt-5 mb-1 pt-2 border-t border-white/10 font-mono">
            {trimmed}
          </div>
        );
      }
      if (isChordLine(trimmed)) {
        // In singer or sound user, remove chords on lyrics!
        if (isSingerOrSound || !showChords) return null;
        // Dynamically transpose every chord on this line according to chosen key!
        const transposedLine = transposeChordLine(line, semitoneShift, currentTargetChord);
        return (
          <div key={idx} className="text-rose-400 font-mono font-bold tracking-wider text-sm sm:text-base pt-2.5 pb-0.5 whitespace-pre select-all">
            {transposedLine}
          </div>
        );
      }
      return (
        <div key={idx} className="text-white font-medium min-h-[1.4em] py-0.5 whitespace-pre-wrap select-text">
          {line}
        </div>
      );
    });
  };

  return (
    <div className="h-[100dvh] w-full bg-[#000000] text-slate-100 flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. TOP BAR: [ Q Search song [V] ], Left/Right arrows, QR trigger */}
      <header className="pt-safe px-3 py-2 bg-[#090b10] border-b border-white/10 shrink-0 z-30">
        <div className="flex items-center justify-between gap-2">
          {/* Back button */}
          <button
            onClick={onLeaveRoom}
            className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 active-press shrink-0"
            title="Leave Stage"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Search Bar / Dropdown Trigger: [ Q Search Song [V] ] (From User Sketch Image 1) */}
          <div className="relative flex-1 max-w-sm">
            <button
              onClick={() => setShowSongPicker(!showSongPicker)}
              className="w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/15 text-left text-xs active-press"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-semibold text-slate-200 truncate">
                  {currentSong ? `${currentSong.songNumber ? currentSong.songNumber + '. ' : ''}${currentSong.title}` : 'Search song...'}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition ${showSongPicker ? 'rotate-180' : ''}`} />
            </button>

            {/* Song Picker Dropdown Popup matching Image 1 Sketch:
                [ Worship ]   [ Praise ]
                Worship Song's / Praise Song's / All Song's
            */}
            {showSongPicker && (
              <div className="absolute top-full left-0 right-0 mt-1.5 max-h-80 bg-slate-950 border border-white/20 rounded-2xl shadow-2xl p-2.5 z-50 overflow-y-auto animate-fadeIn">
                {/* Search Text Input */}
                <div className="relative mb-2">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Type song title or number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-900 rounded-lg text-xs text-white outline-none border border-white/10"
                    autoFocus
                  />
                </div>

                {/* Filter Pills matching Image 1: [ Worship ] [ Praise ] */}
                <div className="grid grid-cols-2 gap-1.5 mb-2.5 pb-2 border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setDropdownTypeFilter(prev => prev === 'Worship' ? 'ALL' : 'Worship')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-black transition active-press text-center border ${
                      dropdownTypeFilter === 'Worship'
                        ? 'bg-cyan-500 text-black border-cyan-300 ring-2 ring-cyan-400/80 shadow-lg'
                        : 'bg-slate-900 text-slate-300 border-white/10 hover:border-cyan-500/40'
                    }`}
                  >
                    Worship
                  </button>
                  <button
                    type="button"
                    onClick={() => setDropdownTypeFilter(prev => prev === 'Praise' ? 'ALL' : 'Praise')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-black transition active-press text-center border ${
                      dropdownTypeFilter === 'Praise'
                        ? 'bg-amber-500 text-black border-amber-300 ring-2 ring-amber-400/80 shadow-lg'
                        : 'bg-slate-900 text-slate-300 border-white/10 hover:border-amber-500/40'
                    }`}
                  >
                    Praise
                  </button>
                </div>

                {/* Section Header: e.g. "Worship Song's (3)" or "Praise Song's (1)" */}
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-1.5 flex items-center justify-between font-mono">
                  <span>
                    {dropdownTypeFilter === 'Worship' 
                      ? "Worship Song's" 
                      : dropdownTypeFilter === 'Praise' 
                      ? "Praise Song's" 
                      : "All Song's"}
                  </span>
                  <span className="text-slate-500">({filteredDropdownSongs.length})</span>
                </div>

                {/* List of Songs - Grouped: First A-Z Kannada Songs, then English Songs A-Z */}
                <div className="space-y-2">
                  {filteredDropdownSongs.length === 0 ? (
                    <div className="text-center py-4 text-xs text-slate-500">No songs match filter</div>
                  ) : (
                    <>
                      {kannadaDropdownSongs.length > 0 && (
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-wider text-cyan-400 px-2 py-1 bg-cyan-950/60 border border-cyan-500/20 rounded-lg mb-1 flex items-center justify-between font-mono">
                            <span>Kannada Songs (A-Z)</span>
                            <span>{kannadaDropdownSongs.length}</span>
                          </div>
                          <div className="space-y-1">
                            {kannadaDropdownSongs.map((s) => (
                              <div
                                key={s.id}
                                onClick={() => {
                                  if (user?.isAdmin) {
                                    onPushSong?.(s);
                                    setShowSongPicker(false);
                                  } else {
                                    setPreviewSong(s);
                                    setShowSongPicker(false);
                                  }
                                }}
                                className={`p-2 rounded-xl text-xs flex items-center justify-between cursor-pointer transition ${
                                  currentSong?.id === s.id
                                    ? 'bg-indigo-600 text-white font-bold'
                                    : 'hover:bg-white/10 text-slate-300'
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <span className="font-mono text-cyan-400 text-[11px] font-bold shrink-0">
                                    {s.songNumber ? `#${s.songNumber}` : '•'}
                                  </span>
                                  <div className="flex flex-col truncate">
                                    <span className="truncate font-semibold text-white">
                                      {s.kannadaTitle || getKannadaTitle(s) || s.title}
                                    </span>
                                    {(s.kannadaTitle || getKannadaTitle(s)) && (
                                      <span className="text-[10px] text-slate-400 truncate">
                                        {s.title}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded font-mono ${
                                    s.type === 'Praise' ? 'text-amber-300 bg-amber-500/20' : 'text-cyan-300 bg-cyan-500/20'
                                  }`}>
                                    {s.type}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    {s.chords || ''}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {englishDropdownSongs.length > 0 && (
                        <div className="pt-1.5 border-t border-white/10">
                          <div className="text-[10px] font-black uppercase tracking-wider text-amber-400 px-2 py-1 bg-amber-950/60 border border-amber-500/20 rounded-lg mb-1 flex items-center justify-between font-mono">
                            <span>English Songs (A-Z)</span>
                            <span>{englishDropdownSongs.length}</span>
                          </div>
                          <div className="space-y-1">
                            {englishDropdownSongs.map((s) => (
                              <div
                                key={s.id}
                                onClick={() => {
                                  if (user?.isAdmin) {
                                    onPushSong?.(s);
                                    setShowSongPicker(false);
                                  } else {
                                    setPreviewSong(s);
                                    setShowSongPicker(false);
                                  }
                                }}
                                className={`p-2 rounded-xl text-xs flex items-center justify-between cursor-pointer transition ${
                                  currentSong?.id === s.id
                                    ? 'bg-indigo-600 text-white font-bold'
                                    : 'hover:bg-white/10 text-slate-300'
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <span className="font-mono text-cyan-400 text-[11px] font-bold shrink-0">
                                    {s.songNumber ? `#${s.songNumber}` : '•'}
                                  </span>
                                  <div className="flex flex-col truncate">
                                    <span className="truncate font-semibold text-white">
                                      {s.kannadaTitle || getKannadaTitle(s) || s.title}
                                    </span>
                                    {(s.kannadaTitle || getKannadaTitle(s)) && (
                                      <span className="text-[10px] text-slate-400 truncate">
                                        {s.title}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded font-mono ${
                                    s.type === 'Praise' ? 'text-amber-300 bg-amber-500/20' : 'text-cyan-300 bg-cyan-500/20'
                                  }`}>
                                    {s.type}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    {s.chords || ''}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Info & Share QR */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Live Sync Status Banner */}
            {user?.isAdmin ? (
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full border font-mono tracking-wider flex items-center gap-1 text-rose-300 bg-rose-500/20 border-rose-500/40 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                <span>ADMIN LIVE</span>
              </span>
            ) : (
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full border font-mono tracking-wider flex items-center gap-1 text-emerald-300 bg-emerald-500/20 border-emerald-500/40 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>SYNCED</span>
              </span>
            )}

            {/* 2h+ WakeLock indicator */}
            <span 
              className="hidden sm:flex text-[9px] font-bold font-mono px-2 py-0.5 rounded border tracking-wider items-center gap-1 text-amber-300 bg-amber-950/40 border-amber-500/30"
              title="Screen stays awake for 2+ hours prayer meeting"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>2H+ AWAKE</span>
            </span>

            <span 
              className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border font-mono tracking-wider flex items-center gap-1 ${
                isEditable 
                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' 
                  : canSuggest
                  ? 'text-cyan-300 bg-cyan-950/70 border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 bg-slate-900 border-white/10'
              }`}
              title={
                isEditable 
                  ? 'You can edit Style, Tempo & Chords' 
                  : canSuggest 
                  ? 'You can preview & suggest songs to Leader' 
                  : 'View-Only (Managed by Keyboardist)'
              }
            >
              {canSuggest && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>}
              {isEditable ? 'EDITABLE' : (canSuggest ? 'SUGGEST' : 'VIEW ONLY')}
            </span>

            <button
              onClick={onShowQR}
              className="p-1.5 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 active-press"
              title="Share QR Code"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. SONG HEADER ROW: Title, Song Number & Language Checkboxes */}
        {currentSong && (
          <div className="mt-2 pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-baseline gap-2 truncate">
              <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded ${
                currentSong.type === 'Praise'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              }`}>
                {currentSong.type}
              </span>
              <h1 className="text-base sm:text-lg font-black text-white truncate">
                {(language === 'kannada' || language === 'both') && (currentSong.kannadaTitle || getKannadaTitle(currentSong))
                  ? (currentSong.kannadaTitle || getKannadaTitle(currentSong))
                  : currentSong.title}
              </h1>
              {(language === 'kannada' || language === 'both') && (currentSong.kannadaTitle || getKannadaTitle(currentSong)) && (
                <span className="text-xs text-slate-400 truncate hidden sm:inline">
                  ({currentSong.title})
                </span>
              )}
              {currentSong.songNumber && (
                <span className="text-base sm:text-lg font-mono font-bold text-slate-400">
                  {currentSong.songNumber}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={language === 'english' || language === 'both'}
                  onChange={() => {
                    if (language === 'english') setLanguage('kannada');
                    else if (language === 'kannada') setLanguage('both');
                    else setLanguage('kannada');
                  }}
                  className="rounded bg-slate-900 border-white/20 text-indigo-600 focus:ring-0"
                />
                <span className="text-[11px] font-medium">English</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={language === 'kannada' || language === 'both'}
                  onChange={() => {
                    if (language === 'kannada') setLanguage('english');
                    else if (language === 'english') setLanguage('both');
                    else setLanguage('english');
                  }}
                  className="rounded bg-slate-900 border-white/20 text-indigo-600 focus:ring-0"
                />
                <span className="text-[11px] font-medium">Kannada</span>
              </label>
            </div>
          </div>
        )}

        {/* 3. CRUCIAL PARAMETER GRID (From User Sketch Image 2)
            Row 1: Style = [ 75 ]                  Temp = [ 108 ]
            Row 2: Chords :- [ Cm ]                 [ Transpose ]
            (HIDDEN for Singer or Sound users!)
        */}
        {currentSong && !isSingerOrSound && (
          <div className="mt-2 p-2.5 rounded-xl bg-slate-950/90 border border-indigo-500/25 space-y-2">
            {/* ROW 1: Style = [ 75 ] on left, Temp = [ 108 ] on right */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="text-purple-300 font-bold">Style =</span>
                {isEditable ? (
                  <input
                    type="text"
                    value={styleInput}
                    onChange={(e) => setStyleInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.currentTarget.blur();
                        handleSaveStyle();
                      }
                    }}
                    onBlur={handleSaveStyle}
                    placeholder="75"
                    className="w-14 px-2 py-0.5 text-center font-mono font-black text-purple-300 bg-purple-950/50 border border-purple-500/40 rounded-lg outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                    title="Change Style and press ENTER to broadcast"
                  />
                ) : (
                  <span className="px-2.5 py-0.5 font-bold font-mono text-purple-300 bg-purple-950/40 border border-purple-500/20 rounded-lg">
                    {currentSong.styleNumber || '—'}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="text-emerald-300 font-bold">Temp =</span>
                {isEditable ? (
                  <input
                    type="number"
                    value={tempoInput}
                    onChange={(e) => setTempoInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.currentTarget.blur();
                        handleSaveTempo();
                      }
                    }}
                    onBlur={handleSaveTempo}
                    placeholder="108"
                    className="w-16 px-2 py-0.5 text-center font-mono font-black text-emerald-300 bg-emerald-950/50 border border-emerald-500/40 rounded-lg outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                    title="Change Tempo and press ENTER to broadcast"
                  />
                ) : (
                  <span className="px-2.5 py-0.5 font-bold font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-500/20 rounded-lg">
                    {currentSong.tempo || 72}
                  </span>
                )}
              </div>
            </div>

            {/* ROW 2: Chords :- [ Cm ] on left, [ Transpose ] on right */}
            <div className="flex items-center justify-between gap-3 pt-1.5 border-t border-white/5">
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="text-cyan-300 font-bold">Chords :-</span>
                {isEditable ? (
                  <input
                    type="text"
                    value={chordsInput}
                    onChange={(e) => setChordsInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.currentTarget.blur();
                        handleSaveChords();
                      }
                    }}
                    onBlur={() => handleSaveChords()}
                    placeholder="Cm"
                    className="w-16 px-2 py-0.5 text-center font-mono font-black text-cyan-300 bg-cyan-950/50 border border-cyan-500/40 rounded-lg outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    title="Type chord and press ENTER"
                  />
                ) : (
                  <span className="px-2.5 py-0.5 font-bold font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 rounded-lg">
                    {currentTargetChord}
                  </span>
                )}
              </div>

              {/* [ Transpose ] Button on right side of Chords, clearly down of Temp = 108 */}
              <div className="relative">
                {isEditable ? (
                  <button
                    onClick={() => setShowTransposeMenu(!showTransposeMenu)}
                    className="px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-mono font-extrabold text-xs shadow transition active-press flex items-center gap-1"
                  >
                    <span>Transpose</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                ) : (
                  <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-white/5">
                    Key: {currentTargetChord}
                  </span>
                )}

                {/* CLEAN WHITE TRANSPOSE DROPDOWN:
                    If current chord is G (Major) -> Only Major Chords (C, C#, D, D#, E, F, F#, G, G#, A, A#, B)
                    If current chord is Cm (Minor) -> Only Minor Chords (Cm, C#m, Dm, D#m, Em, Fm, F#m, Gm, G#m, Am, A#m, Bm)
                */}
                {showTransposeMenu && isEditable && (
                  <div className="absolute right-0 top-full mt-1.5 w-44 bg-white text-slate-900 rounded-lg shadow-2xl border border-slate-200 z-50 overflow-hidden animate-fadeIn text-left">
                    <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <span>{activeChordIsMinor ? 'Minor Keys' : 'Major Keys'}</span>
                      <span className="text-indigo-600 font-mono font-black">{currentTargetChord}</span>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {availableTransposeKeys.map((k) => {
                        const keyVal = typeof k === 'string' ? k : k.value;
                        const keyDisp = typeof k === 'string' ? k : k.display;
                        const isSelected = currentTargetChord === keyVal;
                        return (
                          <button
                            key={keyVal}
                            onClick={() => handleSaveChords(keyVal)}
                            className={`w-full py-2.5 px-4 text-left font-sans text-sm font-semibold transition flex items-center justify-between border-b border-slate-100 last:border-none ${
                              isSelected
                                ? 'bg-indigo-50 text-indigo-600 font-bold'
                                : 'text-slate-900 hover:bg-slate-50'
                            }`}
                          >
                            <span>{keyDisp}</span>
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HIGH-VISIBILITY LIVE STAGE CUE BANNER (Broadcasted to all connected band members) */}
      {activeCue && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-black px-4 py-2 font-black shadow-2xl flex items-center justify-between z-30 animate-pulse border-b-2 border-yellow-300 shrink-0">
          <div className="flex items-center gap-2 mx-auto">
            <Radio className="w-4 h-4 text-black animate-spin" />
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest">
              STAGE CUE: {activeCue}
            </span>
          </div>
          {user?.isAdmin && onClearCue && (
            <button 
              onClick={onClearCue}
              className="p-1 rounded-full bg-black/20 hover:bg-black/40 text-black active-press transition ml-2"
              title="Dismiss Active Cue"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Save Notification Toast */}
      {saveToast && (
        <div className="bg-emerald-600 text-white text-xs font-bold py-1 px-3 text-center animate-fadeIn shrink-0 flex items-center justify-center gap-1.5">
          <Check className="w-3.5 h-3.5" />
          <span>{saveToast} Broadcasted to all stage devices!</span>
        </div>
      )}

      {/* Suggestion Alert for Admin / Keyboardist */}
      {suggestedSongAlert && (isEditable) && (
        <div className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white px-3 py-2 flex items-center justify-between gap-2 shadow-xl border-b border-cyan-400/50 animate-fadeIn shrink-0 z-30 text-xs">
          <div className="flex items-center gap-2 truncate">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0 animate-bounce" />
            <span className="truncate">
              <strong>{suggestedSongAlert.suggestedBy} ({suggestedSongAlert.role})</strong> suggested:{' '}
              <span className="underline font-bold">"{suggestedSongAlert.song?.title}"</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                onPushSong?.(suggestedSongAlert.song);
                onDismissSuggestion?.();
              }}
              className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-[11px] transition shadow"
            >
              Switch Now
            </button>
            <button
              onClick={onDismissSuggestion}
              className="p-1 text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. MAIN LYRICS BODY: Crisp font on pure black background with Reddish-Orange Chords above lines */}
      <main 
        ref={lyricsContainerRef}
        className="flex-1 overflow-y-auto px-5 py-4 mobile-scroll relative"
      >
        {allSongs.length > 1 && user?.isAdmin && (
          <>
            <button
              onClick={handlePrevSong}
              className="fixed left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-300 flex items-center justify-center shadow-lg active-press backdrop-blur-md"
              title="Previous Song (Admin Only)"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextSong}
              className="fixed right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-300 flex items-center justify-center shadow-lg active-press backdrop-blur-md"
              title="Next Song (Admin Only)"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}

        {currentSong ? (
          <div 
            style={{ fontSize: `${fontSize}px` }}
            className={`font-sans leading-relaxed tracking-wide text-white font-medium select-text ${
              canSeeSuggestions && showSuggestionsTray ? 'pb-60' : 'pb-28'
            }`}
          >
            {/* Show Kannada Lyrics if checked */}
            {(language === 'kannada' || language === 'both') && (
              <div className="mb-6">
                {renderLyricsLines(currentSong.kannadaLyrics || currentSong.lyricsText)}
              </div>
            )}

            {/* Show English Lyrics if checked */}
            {(language === 'english' || language === 'both') && (
              <div>
                {renderLyricsLines(currentSong.englishLyrics || currentSong.lyricsText)}
              </div>
            )}

            {!currentSong.kannadaLyrics && !currentSong.englishLyrics && !currentSong.lyricsText && (
              <div className="py-20 text-center text-slate-500 text-sm">
                No lyrics text available for this song.
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <Music className="w-12 h-12 text-slate-600 mb-2" />
            <p className="text-sm text-slate-400">Select a song from the top bar to begin.</p>
          </div>
        )}
      </main>

      {/* 5. DOWNSIDE BOX (1/4 OF PHONE SCREEN - RECENTLY VIEWED & LIVE CARDS)
          Can be toggled down (> down) to hide and up (> up) to expand!
          Visible ONLY for [Lead Singer, Drums, Keyboard, Admin]!
      */}
      {canSeeSuggestions && showSuggestionsTray && (
        <div className="fixed bottom-[54px] left-0 right-0 z-30 px-3 py-2 bg-[#090b10]/95 backdrop-blur-2xl border-t border-white/10 shadow-2xl h-[24vh] max-h-[165px] min-h-[130px] flex flex-col justify-between animate-fadeIn">
          {/* Section Header with [ > Down / Hide ] Toggle */}
          <div className="flex items-center justify-between px-1 mb-1.5 shrink-0">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{canSuggest ? "Recent / Live (Tap to Suggest):" : "Recent / Live Songs:"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-mono">
                {suggestionCards.length} cards
              </span>
              <button
                onClick={() => setShowSuggestionsTray(false)}
                className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white text-[11px] font-bold transition active-press"
                title="Hide Recent Songs Down (> down)"
              >
                <span>Hide</span>
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Cards Horizontal Scrolling Row (at least 3-4 cards visible) */}
          <div className="flex items-stretch gap-2.5 overflow-x-auto no-scrollbar flex-1 pb-1">
            {suggestionCards.map((song, i) => {
              const isCurrent = currentSong?.id === song.id;
              const snippet = getStartingLyricsSnippet(song);
              const cardKannadaTitle = song.kannadaTitle || (song.category !== 'english' && song.kannadaLyrics ? getKannadaTitle(song) : null);
              return (
                <button
                  key={song.id || i}
                  onClick={() => setPreviewSong(song)}
                  className={`w-36 min-w-[135px] max-w-[155px] p-2.5 rounded-xl border text-left transition-all active-press flex flex-col justify-between relative group select-none shrink-0 ${
                    isCurrent
                      ? 'bg-gradient-to-b from-indigo-950/70 to-slate-900 border-indigo-500/70 shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-400/40'
                      : 'bg-slate-900/90 hover:bg-slate-850 hover:border-white/20 border-white/10'
                  }`}
                  title="Click to preview starting lyrics and suggest"
                >
                  {/* Top row: Song number & Key */}
                  <div className="flex items-center justify-between gap-1 w-full mb-1">
                    <span className="text-[11px] font-mono font-black text-cyan-400">
                      {song.songNumber ? `#${song.songNumber}` : `Song ${i + 1}`}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                      isCurrent
                        ? 'bg-indigo-500/30 text-indigo-200 border-indigo-400/40'
                        : 'bg-slate-800 text-purple-300 border-purple-500/20'
                    }`}>
                      {song.chords || 'Cm'}
                    </span>
                  </div>

                  {/* Middle: Title (Kannada title on top if available!) */}
                  <div className="font-sans font-bold text-xs text-white line-clamp-2 leading-snug mb-1">
                    {cardKannadaTitle || song.title}
                  </div>

                  {/* Bottom: Subtitle / English transliteration or snippet */}
                  <div className="text-[10px] text-slate-400 truncate font-sans italic w-full">
                    {cardKannadaTitle ? song.title : (snippet || 'Tap for preview →')}
                  </div>

                  {isCurrent && (
                    <div className="absolute top-1.5 right-1.5 flex items-center" title="Currently Live">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* MINIMIZED RECENT SONGS TRAY DOCKED RIGHT ABOVE FOOTER (CLICK TO EXPAND > UP) */}
      {canSeeSuggestions && !showSuggestionsTray && (
        <div className="fixed bottom-[52px] left-0 right-0 z-30 flex justify-center pointer-events-none">
          <button
            onClick={() => setShowSuggestionsTray(true)}
            className="pointer-events-auto px-4 py-1.5 rounded-t-xl bg-[#090b10] hover:bg-slate-900 border-t border-x border-cyan-500/50 text-cyan-300 text-xs font-bold shadow-2xl flex items-center gap-1.5 transition active-press backdrop-blur-2xl animate-fadeIn"
            title="Open Recent / Live Songs Tray (> up)"
          >
            <ChevronUp className="w-4 h-4 text-cyan-400 animate-bounce" />
            <span>Recent / Live Songs ({suggestionCards.length})</span>
          </button>
        </div>
      )}

      {/* 6. MINI WINDOW PREVIEW MODAL
          When clicking any song card:
          - Shows starting lyrics in mini window
          - Close button [ ✕ ] at top
          - Suggest button [ 💡 Suggest ] at top
      */}
      {previewSong && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-fadeIn"
          onClick={() => setPreviewSong(null)}
        >
          <div 
            className="w-full max-w-sm sm:max-w-md bg-[#0b0e14] border border-white/20 rounded-2xl shadow-2xl flex flex-col max-h-[82vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MINI WINDOW HEADER WITH [ SUGGEST ] AND [ ✕ ] AT TOP AS REQUESTED */}
            <div className="px-3.5 py-3 bg-[#0f131c] border-b border-white/10 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2 truncate">
                <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {previewSong.songNumber ? `#${previewSong.songNumber}` : 'Song'}
                </span>
                <span className="font-bold text-sm text-white truncate">
                  {previewSong.title}
                </span>
              </div>

              {/* ACTION BUTTONS AT TOP AS REQUESTED */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    if (isEditable) {
                      onPushSong?.(previewSong);
                      triggerSaveToast(`Switched to "${previewSong.title}"`);
                    } else {
                      onSuggestSong?.(previewSong);
                      triggerSaveToast(`Suggested "${previewSong.title}" to Leader ✓`);
                    }
                    setPreviewSong(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg active-press flex items-center gap-1.5"
                  title={isEditable ? 'Push Live' : 'Suggest to Worship Leader'}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isEditable ? 'Switch' : 'Suggest'}</span>
                </button>

                <button
                  onClick={() => setPreviewSong(null)}
                  className="p-1.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white active-press"
                  title="Close preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mini Window Sub-Header Info */}
            <div className="px-3.5 py-1.5 bg-slate-950/60 border-b border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span>Key: <strong className="text-purple-300">{previewSong.chords || 'Cm'}</strong></span>
                <span>•</span>
                <span>Tempo: <strong className="text-emerald-300">{previewSong.tempo || 72} BPM</strong></span>
              </div>
              <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider">
                Starting Lyrics
              </span>
            </div>

            {/* Starting Lyrics Content */}
            <div className="p-4 overflow-y-auto flex-1 font-sans text-sm sm:text-base leading-relaxed text-slate-200 space-y-1.5">
              {getStartingLyricsLines(previewSong).map((line, idx) => (
                <div key={idx} className="min-h-[1.4em]">
                  {line}
                </div>
              ))}
              {getStartingLyricsLines(previewSong).length === 0 && (
                <div className="text-center py-8 text-slate-500 text-xs italic">
                  No lyrics snippet preview available for this song.
                </div>
              )}
            </div>

            {/* Bottom Primary Action Button */}
            <div className="p-3 bg-[#0f131c] border-t border-white/10">
              <button
                onClick={() => {
                  if (isEditable) {
                    onPushSong?.(previewSong);
                    triggerSaveToast(`Switched to "${previewSong.title}"`);
                  } else {
                    onSuggestSong?.(previewSong);
                    triggerSaveToast(`Suggested "${previewSong.title}" to Leader ✓`);
                  }
                  setPreviewSong(null);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-xl active-press flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isEditable ? 'Push Live to All Devices' : 'Suggest This Song to Admin'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. BOTTOM BAR: [ Auto Scroll ] [ Chords ] [ Font Size (Default 18) ] */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 pb-safe px-3 pt-2 bg-[#090b10] border-t border-white/10 backdrop-blur-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between gap-1.5">
          {/* Auto Scroll Button (Orange/Gold style from Image 1) */}
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition active-press border ${
              autoScroll
                ? 'bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-600/30'
                : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
            }`}
          >
            {autoScroll ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>Auto Scroll</span>
          </button>

          {/* Chords Display Button (from Image 1: 📖 Chords Gm) - REMOVED for Singer & Sound! Defaults to OFF */}
          {!isSingerOrSound && (
            <button
              onClick={() => setShowChords(!showChords)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition active-press ${
                showChords
                  ? 'bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-600/30'
                  : 'bg-slate-900 text-slate-400 border-white/10 hover:text-slate-200'
              }`}
              title={showChords ? 'Chords ON (Click to Hide)' : 'Chords OFF (Click to Show)'}
            >
              <span>📖 Chords {currentTargetChord}</span>
              <span className={`text-[9px] px-1 py-0.2 rounded font-mono font-bold ${
                showChords ? 'bg-amber-800/80 text-amber-100' : 'bg-slate-800 text-slate-400'
              }`}>
                {showChords ? 'ON' : 'OFF'}
              </span>
            </button>
          )}

          {/* Font Scaling [-A , +A] with DEFAULT SIZE = 18 */}
          <div className="flex items-center bg-slate-900 border border-white/10 rounded-xl p-0.5">
            <button
              onClick={() => setFontSize(s => Math.max(12, s - 2))}
              className="px-2.5 py-1 text-xs font-mono font-bold text-slate-300 hover:text-white active-press"
              title="Smaller font (-A)"
            >
              -A
            </button>
            <span className="text-xs font-mono font-black text-indigo-300 px-2 min-w-[28px] text-center" title="Current font size">
              {fontSize}
            </span>
            <button
              onClick={() => setFontSize(s => Math.min(36, s + 2))}
              className="px-2.5 py-1 text-xs font-mono font-bold text-slate-300 hover:text-white active-press"
              title="Larger font (+A)"
            >
              +A
            </button>
          </div>

          {/* Fullscreen */}
          <button
            onClick={toggleFullScreen}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white active-press"
            title="Toggle Fullscreen"
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </footer>
    </div>
  );
}
