import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const SONGS_FILE = path.join(DATA_DIR, 'songs.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Pre-seeded songs matching user's uploaded images
const defaultSeedSongs = [
  {
    id: "song-nan-santoshakke",
    songNumber: "6818",
    title: "Nan Santoshakke Karana",
    type: "Worship",
    tempo: 108,
    styleNumber: "75",
    chords: "Gm",
    kannadaLyrics: `Gm
ನನ್ ಸಂತೋಷಕ್ಕೆ ಕಾರಣ ನೀವೇ ಯೇಸಯ್ಯ
F
ನೀವೇ ಯೇಸಯ್ಯ ನನ್ನ ಆಧಾರ ನೀನೇ
Gm
ನನ್ ಸಮೃದ್ಧಿಗೆ ಕಾರಣ ನೀವೇ ಯೇಸಯ್ಯ
F
ನೀವೇ ಯೇಸಯ್ಯ ನನ್ ಐಶ್ವರ್ಯ ನೀನೇ

Gm
ನಿನ್ ರಕ್ತಕೋಟೆಯಲ್ಲಿ ನನ್ನ ಮರೆಮಾಡಿದೆ
F               Cm
ಮರೆಮಾಡಿದೆ ದೇವಾ ಕಾಪಾಡಿದೆ
Gm              Dm
ನಿನ್ ಶಿಲುಬೆಯ ನೆರಳಲ್ಲಿ ಮರೆಮಾಡಿದೆ
F               Cm
ಮರೆಮಾಡಿದೆ ದೇವಾ ಕಾಪಾಡಿದೆ

Gm
ಸ್ತೋತ್ರ ಸ್ತೋತ್ರ ಯೇಸಯ್ಯ
F             Gm
ಸ್ತೋತ್ರ ಸ್ತೋತ್ರ ಯೇಸಯ್ಯ

Gm             G7              Am
1. ನಿನ್ನ ಪ್ರೀತಿಯ ವರ್ಣಿಸಲು ನನ್ನಿಂದ ಆಗದಯ್ಯ
Am                            D
ನಿನ್ನ ಕಾರ್ಯವ ವಿವರಿಸಲು ನನ್ನ ಬದುಕು ಸಾಲದಯ್ಯ
D                             Gm
ಬೇಟೆಗಾರನ ಬಲೆಯಿಂದಲೂ ಕಾಪಾಡಿದವನು ನೀವೇ ಯೇಸಯ್ಯ`,
    englishLyrics: `Gm
Nan santoshakke karana neeve Yesayya
F
Neeve Yesayya nanna aadhara neene
Gm
Nan samruddhige karana neeve Yesayya
F
Neeve Yesayya nan aishwarya neene

Gm
Nin rakthakotheyalli nanna maremaadide
F               Cm
Maremaadide Deva kaapadide
Gm              Dm
Nin shilubeya neralalli maremaadide
F               Cm
Maremaadide Deva kaapadide

Gm
Stotra stotra Yesayya
F             Gm
Stotra stotra Yesayya`,
    lyricsText: `Gm
ನನ್ ಸಂತೋಷಕ್ಕೆ ಕಾರಣ ನೀವೇ ಯೇಸಯ್ಯ
F
ನೀವೇ ಯೇಸಯ್ಯ ನನ್ನ ಆಧಾರ ನೀನೇ
Gm
ನನ್ ಸಮೃದ್ಧಿಗೆ ಕಾರಣ ನೀವೇ ಯೇಸಯ್ಯ
F
ನೀವೇ ಯೇಸಯ್ಯ ನನ್ ಐಶ್ವರ್ಯ ನೀನೇ`,
    lyricsImage: null,
    createdAt: new Date().toISOString()
  },
  {
    id: "song-tande-deva",
    songNumber: "5052",
    title: "Tande Deva Tande Deva Nanna",
    type: "Worship",
    tempo: 75,
    styleNumber: "42",
    chords: "G",
    kannadaLyrics: `G
ತಂದೆ ದೇವಾ ತಂದೆ ದೇವಾ
Am
ನನ್ನ ಸರ್ವವು ನೀನಯ್ಯ
D              G
ನೀವಿದ್ದರೆ ನನಗೆ ಸಾಕು ||2

G                    C
ನನ್ನ ಪ್ರಿಯನೇ ನನ್ನ ಪ್ರಾಣವೇ ನಿನ್ನಾರಾಧಿಸುವೆನು
Am                   D
ನನ್ ಜೀವವೇ ನನ್ನ ಸ್ನೇಹವೇ ನಿನ್ನಾರಾಧಿಸುವೆನು

G              G7              Am
1. ನಿನ್ನ ಪ್ರೀತಿಯ ವರ್ಣಿಸಲು ನನ್ನಿಂದ ಆಗದಯ್ಯ
Am                            D
ನಿನ್ನ ಕಾರ್ಯವ ವಿವರಿಸಲು ನನ್ನ ಬದುಕು ಸಾಲದಯ್ಯ
Em   Bm                       Am
ತಂದೆ ದೇವಾ ನನ್ನ ಆನಂದವೇ
C              D              G
ನೀನ್ ಬಳಿಯಲ್ಲೇ - ನನಗೆ ಸುಖವು

G              G7              Am
2. ನನ್ನ ಪ್ರಾಣ ಸ್ನೇಹಿತನೇ - ನಿನ್ ಸನ್ನಿಧಿ ಪರಿಮಳವೇ
Am                            D
ಸಿಹಿಯಾದ ಜೇನಿಗಿಂತ - ನಿನ್ನ ಪ್ರೀತಿ ಮಧುರವಯ್ಯ
Em   Bm                       Am
ತಂದೆ ದೇವಾ ನನ್ನ ಆನಂದವೇ
C              D              G
ನೀನ್ ಬಳಿಯಲ್ಲೇ - ನನಗೆ ಸುಖವು`,
    englishLyrics: `G
Tande Deva Tande Deva
Am
Nanna sarvavu neenayya
D              G
Neeviddare nanage saaku ||2

G                    C
Nanna priyane nanna praanave ninnaaraadhisuvenu
Am                   D
Nan jeevave nanna snehave ninnaaraadhisuvenu

G              G7              Am
1. Ninna preethiya varnisalu nanninda aagadayya
Am                            D
Ninna kaaryava vivarisalu nanna baduku saaladayya
Em   Bm                       Am
Tande Deva nanna aanandave
C              D              G
Neen baliyalle - nanage sukhavu`,
    lyricsText: `G
ತಂದೆ ದೇವಾ ತಂದೆ ದೇವಾ
Am
ನನ್ನ ಸರ್ವವು ನೀನಯ್ಯ
D              G
ನೀವಿದ್ದರೆ ನನಗೆ ಸಾಕು ||2`,
    lyricsImage: null,
    createdAt: new Date().toISOString()
  },
  {
    id: "song-way-maker",
    songNumber: "03",
    title: "Way Maker",
    type: "Worship",
    tempo: 68,
    styleNumber: "142",
    chords: "E",
    kannadaLyrics: "",
    englishLyrics: `E             B
You are here, moving in our midst
C#m           A
I worship You, I worship You
E             B
You are here, working in this place
C#m           A
I worship You, I worship You

E
(You are) Way Maker, Miracle Worker
B
Promise Keeper, Light in the darkness
C#m                 A
My God, that is who You are`,
    lyricsText: `E             B
You are here, moving in our midst
C#m           A
I worship You, I worship You`,
    lyricsImage: null,
    createdAt: new Date().toISOString()
  },
  {
    id: "song-hosanna",
    songNumber: "04",
    title: "Hosanna Hosanna",
    type: "Praise",
    tempo: 120,
    styleNumber: "88",
    chords: "G",
    kannadaLyrics: `G                 C
ಹೋಸನ್ನಾ ಹೋಸನ್ನಾ
D                 G
ಉನ್ನತದಲ್ಲಿ ಹೋಸನ್ನಾ ||2

C                 D
ರಾಜಾಧಿ ರಾಜನಿಗೆ ಹೋಸನ್ನಾ
C                 D
ಕರ್ತಾದಿ ಕರ್ತನಿಗೆ ಹೋಸನ್ನಾ ||2

G                 C
ಸ್ತುತಿ ಸ್ತುತಿ ಯೇಸುವಿಗೆ
D                 G
ಸದಾಕಾಲ ಸ್ತುತಿಯು ಆತನಿಗೆ`,
    englishLyrics: `G                 C
Hosanna Hosanna
D                 G
Hosanna in the highest ||2

C                 D
Hosanna to the King of Kings
C                 D
Hosanna to the Lord of Lords ||2`,
    lyricsText: `G                 C
ಹೋಸನ್ನಾ ಹೋಸನ್ನಾ
D                 G
ಉನ್ನತದಲ್ಲಿ ಹೋಸನ್ನಾ`,
    lyricsImage: null,
    createdAt: new Date().toISOString()
  },
  {
    id: "song-10000-reasons",
    songNumber: "05",
    title: "10,000 Reasons",
    type: "Praise",
    tempo: 72,
    styleNumber: "96",
    chords: "G",
    kannadaLyrics: `G       C         G         D
ನನ್ನಾತ್ಮವೇ ಕರ್ತನನ್ನು ಕೊಂಡಾಡು
Em      C       D
ಆತನ ಪವಿತ್ರ ನಾಮವನ್ನು
C       Em      C   D   Em
ಹೊಸ ಗೀತೆಯ ಹಾಡಿ ಕೊಂಡಾಡು
C           D        G
ಕರ್ತನ ಪವಿತ್ರ ನಾಮವ`,
    englishLyrics: `G       C         G         D
Bless the Lord, O my soul, O my soul
Em      C       D
Worship His holy name
C       Em      C   D   Em
Sing like never before, O my soul
C           D        G
I'll worship Your holy name`,
    lyricsText: `G       C         G         D
Bless the Lord, O my soul, O my soul`,
    lyricsImage: null,
    createdAt: new Date().toISOString()
  }
];

function sortSongsKannadaFirst(songsList) {
  return [...songsList].sort((a, b) => {
    const aIsEng = a.category === 'english' || a.id?.includes('way-maker') || a.id?.includes('10000');
    const bIsEng = b.category === 'english' || b.id?.includes('way-maker') || b.id?.includes('10000');
    if (aIsEng !== bIsEng) return aIsEng ? 1 : -1;
    return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
  });
}

function loadSongs() {
  try {
    if (!fs.existsSync(SONGS_FILE)) {
      fs.writeFileSync(SONGS_FILE, JSON.stringify(defaultSeedSongs, null, 2), 'utf-8');
      return sortSongsKannadaFirst(defaultSeedSongs);
    }
    const data = fs.readFileSync(SONGS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return sortSongsKannadaFirst(parsed);
  } catch (err) {
    console.error('Error loading songs:', err);
    return sortSongsKannadaFirst(defaultSeedSongs);
  }
}

function saveSongs(songs) {
  try {
    fs.writeFileSync(SONGS_FILE, JSON.stringify(songs, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving songs:', err);
  }
}

function getLocalNetworkIp() {
  const interfaces = os.networkInterfaces();
  let wifiIp = null;
  let fallbackIp = null;

  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        if (name.toLowerCase().includes('wi-fi') || name.toLowerCase().includes('wireless') || name.toLowerCase().includes('wlan')) {
          wifiIp = net.address;
        } else if (!fallbackIp && !net.address.startsWith('169.254')) {
          fallbackIp = net.address;
        }
      }
    }
  }

  return wifiIp || fallbackIp || 'localhost';
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] },
  maxHttpBufferSize: 35e6,
  pingInterval: 10000, // Ping every 10s to keep connection alive indefinitely
  pingTimeout: 60000   // Tolerate up to 60s of network jitter for 2+ hour sessions
});

function isChordLine(line) {
  const t = line.trim();
  if (!t || /[^\x00-\x7F]/.test(t) || /[[\].,!?|:;]/.test(t)) return false;
  return t.split(/\s+/).every(tok => /^[A-G][#b]?(?:m|min|maj|dim|aug|sus|add)?[0-9]*(?:\/[A-G][#b]?)?$/.test(tok));
}

function extractFirstLyricsLine(text) {
  if (!text) return '';
  for (const l of text.split('\n')) {
    const t = l.trim();
    if (t && !isChordLine(t) && !(t.startsWith('[') && t.endsWith(']'))) {
      return t.replace(/\s*\|\|\s*\d+/, '').replace(/\s*-\s*\d+/, '').trim();
    }
  }
  return '';
}

app.use(cors());
app.use(express.json({ limit: '35mb' }));
app.use(express.urlencoded({ extended: true, limit: '35mb' }));

const activeRooms = new Map();

function generateRoomCode() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const numbers = '23456789';
  let code = '';
  for (let i = 0; i < 3; i++) code += letters.charAt(Math.floor(Math.random() * letters.length));
  for (let i = 0; i < 2; i++) code += numbers.charAt(Math.floor(Math.random() * numbers.length));
  return code;
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), roomsCount: activeRooms.size });
});

app.get('/api/network-info', (req, res) => {
  const localIp = getLocalNetworkIp();
  res.json({
    localIp,
    clientUrl: `http://${localIp}:5173`,
    port: 5173
  });
});

app.get('/api/songs', (req, res) => {
  const songs = loadSongs();
  res.json(songs);
});

app.post('/api/songs', (req, res) => {
  const { 
    title, kannadaTitle, songNumber, type, tempo, styleNumber, chords, 
    originalKey, category, lyricsText, kannadaLyrics, englishLyrics, lyricsImage 
  } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Song title is required' });
  }

  const songs = loadSongs();
  const nextNum = String(songs.length + 1).padStart(2, '0');
  const songChords = String(chords || '').trim();
  const songOrigKey = String(originalKey || songChords || 'C').trim();
  
  // Auto-detect category if not explicitly given
  const isKannada = /[\u0C80-\u0CFF]/.test((kannadaLyrics || '') + (lyricsText || ''));
  const songCat = category ? String(category).toLowerCase() : (isKannada ? 'kannada' : 'english');
  const finalKannadaTitle = kannadaTitle ? String(kannadaTitle).trim() : (songCat === 'kannada' ? extractFirstLyricsLine(kannadaLyrics || lyricsText) : '');

  const newSong = {
    id: `song-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    songNumber: songNumber ? String(songNumber).trim() : nextNum,
    title: title.trim(),
    kannadaTitle: finalKannadaTitle,
    type: type === 'Praise' ? 'Praise' : 'Worship',
    tempo: Number(tempo) || 72,
    styleNumber: String(styleNumber || '').trim(),
    chords: songChords || songOrigKey,
    originalKey: songOrigKey,
    category: songCat,
    lyricsText: String(lyricsText || kannadaLyrics || englishLyrics || '').trim(),
    kannadaLyrics: kannadaLyrics || '',
    englishLyrics: englishLyrics || '',
    lyricsImage: lyricsImage || null,
    createdAt: new Date().toISOString()
  };

  songs.unshift(newSong);
  saveSongs(songs);
  
  // Broadcast to all connected musicians and stage screens in real time
  io.emit('songs:updated', loadSongs());
  console.log(`[Song Added for All] "${newSong.title}" (#${newSong.songNumber})`);

  res.status(201).json(newSong);
});

app.put('/api/songs/:id', (req, res) => {
  const { id } = req.params;
  const { 
    title, kannadaTitle, songNumber, type, tempo, styleNumber, chords, 
    originalKey, category, lyricsText, kannadaLyrics, englishLyrics, lyricsImage 
  } = req.body;
  const songs = loadSongs();
  const index = songs.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Song not found' });
  }

  const existing = songs[index];
  const newCat = category !== undefined ? String(category).toLowerCase() : existing.category;
  const newKannadaLyrics = kannadaLyrics !== undefined ? kannadaLyrics : existing.kannadaLyrics;
  const newKannadaTitle = kannadaTitle !== undefined 
    ? String(kannadaTitle).trim() 
    : (existing.kannadaTitle || (newCat === 'kannada' ? extractFirstLyricsLine(newKannadaLyrics) : ''));

  songs[index] = {
    ...existing,
    title: title !== undefined ? title.trim() : existing.title,
    kannadaTitle: newKannadaTitle,
    songNumber: songNumber !== undefined ? String(songNumber).trim() : existing.songNumber,
    type: type !== undefined ? (type === 'Praise' ? 'Praise' : 'Worship') : existing.type,
    tempo: tempo !== undefined ? Number(tempo) : existing.tempo,
    styleNumber: styleNumber !== undefined ? String(styleNumber).trim() : existing.styleNumber,
    chords: chords !== undefined ? String(chords).trim() : existing.chords,
    originalKey: originalKey !== undefined ? String(originalKey).trim() : (existing.originalKey || existing.chords),
    category: newCat,
    lyricsText: lyricsText !== undefined ? String(lyricsText).trim() : existing.lyricsText,
    kannadaLyrics: newKannadaLyrics,
    englishLyrics: englishLyrics !== undefined ? englishLyrics : existing.englishLyrics,
    lyricsImage: lyricsImage !== undefined ? lyricsImage : existing.lyricsImage,
    updatedAt: new Date().toISOString()
  };

  saveSongs(songs);
  io.emit('songs:updated', loadSongs());
  res.json(songs[index]);
});

app.delete('/api/songs/:id', (req, res) => {
  const { id } = req.params;
  let songs = loadSongs();
  const initialLength = songs.length;
  songs = songs.filter(s => s.id !== id);

  if (songs.length === initialLength) {
    return res.status(404).json({ error: 'Song not found' });
  }

  saveSongs(songs);
  io.emit('songs:updated', loadSongs());
  res.json({ success: true, id });
});

app.get('/api/rooms/:code', (req, res) => {
  const code = req.params.code.toUpperCase();
  const room = activeRooms.get(code);
  if (!room) {
    return res.status(404).json({ exists: false, message: 'Room not found or session has ended' });
  }
  res.json({
    exists: true,
    code: room.code,
    isPrivate: room.isPrivate,
    incomersCount: room.incomers.length,
    hasActiveSong: !!room.currentSong
  });
});

// Serve frontend client in production (single-domain cloud deployment)
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/socket.io')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}



io.on('connection', (socket) => {
  console.log(`[Socket Connected] ID: ${socket.id}`);

  // Re-join existing room seamlessly after temporary Wi-Fi drop or tab switch
  socket.on('room:rejoin', (payload, callback) => {
    try {
      const { roomCode, isAdmin = false, name = 'Musician', role = 'Musician' } = payload || {};
      const code = String(roomCode || '').toUpperCase().trim();
      const room = activeRooms.get(code);

      if (!room) {
        return callback?.({ success: false, error: 'Room does not exist or has closed.' });
      }

      socket.join(`room_${code}`);
      socket.data.roomCode = code;
      socket.data.isAdmin = Boolean(isAdmin);
      socket.data.name = String(name).trim() || 'Band Member';
      socket.data.role = String(role).trim() || 'Musician';

      if (isAdmin) {
        room.hostSocketId = socket.id;
        io.to(`room_${code}`).emit('room:host_status', { online: true });
      } else {
        room.incomers = room.incomers.filter(m => m.id !== socket.id && m.name !== socket.data.name);
        room.incomers.push({
          id: socket.id,
          name: socket.data.name,
          role: socket.data.role,
          joinedAt: Date.now()
        });
        io.to(`room_${code}`).emit('room:members_updated', {
          incomers: room.incomers,
          count: room.incomers.length
        });
      }

      console.log(`[Rejoin Success] ${socket.data.name} (${isAdmin ? 'Admin' : socket.data.role}) reconnected to Room ${code}`);

      callback?.({
        success: true,
        room: {
          code: room.code,
          isPrivate: room.isPrivate,
          currentSong: room.currentSong,
          activeCue: room.activeCue,
          incomers: room.incomers
        }
      });
    } catch (err) {
      console.error('room:rejoin error:', err);
      callback?.({ success: false, error: err.message });
    }
  });

  // Periodic heartbeat sync check: guarantees 100% sync even if a WebSocket broadcast was missed
  socket.on('room:sync_check', (payload, callback) => {
    try {
      const { roomCode } = payload || {};
      const code = String(roomCode || '').toUpperCase().trim();
      const room = activeRooms.get(code);
      if (!room) {
        return callback?.({ success: false, error: 'Room not found.' });
      }
      callback?.({
        success: true,
        currentSong: room.currentSong,
        activeCue: room.activeCue
      });
    } catch (err) {
      callback?.({ success: false, error: err.message });
    }
  });

  socket.on('room:create', (payload, callback) => {
    try {
      const { isPrivate = false, pin = '', adminName = 'Worship Leader' } = payload || {};
      let code = generateRoomCode();
      while (activeRooms.has(code)) {
        code = generateRoomCode();
      }

      const allSongs = loadSongs();
      const initialSong = allSongs[0] || defaultSeedSongs[0];

      const roomData = {
        code,
        isPrivate: Boolean(isPrivate),
        pin: isPrivate ? String(pin).trim() : null,
        hostSocketId: socket.id,
        hostName: adminName,
        currentSong: initialSong,
        activeCue: null,
        incomers: [],
        createdAt: Date.now()
      };

      activeRooms.set(code, roomData);
      socket.join(`room_${code}`);
      socket.data.roomCode = code;
      socket.data.isAdmin = true;
      socket.data.name = adminName;
      socket.data.role = 'Admin / Worship Leader';

      callback?.({ success: true, room: roomData });
    } catch (err) {
      console.error('room:create error:', err);
      callback?.({ success: false, error: err.message });
    }
  });

  socket.on('room:join', (payload, callback) => {
    try {
      const { roomCode, pin = '', name = 'Musician', role = 'Guitarist' } = payload || {};
      const code = String(roomCode || '').toUpperCase().trim();
      const room = activeRooms.get(code);

      if (!room) {
        return callback?.({ success: false, error: 'Room does not exist or has closed.' });
      }

      if (room.isPrivate && room.pin) {
        if (String(pin).trim() !== String(room.pin).trim()) {
          return callback?.({ success: false, error: 'Incorrect room PIN. Please try again.' });
        }
      }

      const incomer = {
        id: socket.id,
        name: name.trim() || 'Band Member',
        role: role.trim() || 'Guitarist',
        joinedAt: Date.now()
      };

      room.incomers = room.incomers.filter(m => m.id !== socket.id);
      room.incomers.push(incomer);

      socket.join(`room_${code}`);
      socket.data.roomCode = code;
      socket.data.isAdmin = false;
      socket.data.name = incomer.name;
      socket.data.role = incomer.role;

      io.to(`room_${code}`).emit('room:members_updated', {
        incomers: room.incomers,
        count: room.incomers.length
      });

      callback?.({
        success: true,
        room: {
          code: room.code,
          isPrivate: room.isPrivate,
          currentSong: room.currentSong,
          activeCue: room.activeCue,
          incomers: room.incomers
        }
      });
    } catch (err) {
      console.error('room:join error:', err);
      callback?.({ success: false, error: err.message });
    }
  });

  socket.on('room:quick_edit', (payload, callback) => {
    try {
      const { roomCode, songId, updates } = payload || {};
      const code = String(roomCode || '').toUpperCase().trim();
      const room = activeRooms.get(code);

      if (!room) return callback?.({ success: false, error: 'Room not found.' });

      const userRole = (socket.data.role || '').toLowerCase();
      const isAllowed = socket.data.isAdmin || userRole.includes('keyboard') || userRole.includes('piano');

      if (!isAllowed) {
        return callback?.({ 
          success: false, 
          error: 'Only Admin and Keyboardist have permission to edit Style, Tempo, and Chords.' 
        });
      }

      if (room.currentSong && (room.currentSong.id === songId || !songId)) {
        room.currentSong = {
          ...room.currentSong,
          ...updates
        };
      }

      const songs = loadSongs();
      const targetId = songId || room.currentSong?.id;
      const sIndex = songs.findIndex(s => s.id === targetId);
      if (sIndex !== -1) {
        songs[sIndex] = {
          ...songs[sIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        saveSongs(songs);
      }

      io.to(`room_${code}`).emit('room:song_changed', {
        song: room.currentSong,
        updatedBy: socket.data.name || 'Keyboardist',
        updatedAt: Date.now()
      });

      console.log(`[Quick Edit by ${socket.data.name}] Room ${code} ->`, updates);
      callback?.({ success: true, song: room.currentSong });
    } catch (err) {
      console.error('room:quick_edit error:', err);
      callback?.({ success: false, error: err.message });
    }
  });

  socket.on('room:push_song', (payload, callback) => {
    try {
      const { roomCode, song } = payload || {};
      const code = String(roomCode || '').toUpperCase().trim();
      const room = activeRooms.get(code);
      if (!room) return callback?.({ success: false, error: 'Room not found.' });

      room.currentSong = song;
      room.activeCue = null;

      io.to(`room_${code}`).emit('room:song_changed', {
        song,
        pushedAt: Date.now()
      });

      console.log(`[Song Pushed] Room ${code}: "${song?.title}"`);
      callback?.({ success: true });
    } catch (err) {
      console.error('room:push_song error:', err);
      callback?.({ success: false, error: err.message });
    }
  });

  socket.on('room:suggest_song', (payload, callback) => {
    try {
      const { roomCode, song, suggestedBy = 'Lead Singer', role = 'Lead Singer' } = payload || {};
      const code = String(roomCode || '').toUpperCase().trim();
      const room = activeRooms.get(code);
      if (!room) return callback?.({ success: false, error: 'Room not found.' });

      io.to(`room_${code}`).emit('room:song_suggested', {
        song,
        suggestedBy,
        role,
        timestamp: Date.now()
      });

      console.log(`[Song Suggested] ${suggestedBy} (${role}) suggested "${song?.title}" in Room ${code}`);
      callback?.({ success: true });
    } catch (err) {
      console.error('room:suggest_song error:', err);
      callback?.({ success: false, error: err.message });
    }
  });

  socket.on('room:send_cue', (payload, callback) => {
    try {
      const { roomCode, cue } = payload || {};
      const code = String(roomCode || '').toUpperCase().trim();
      const room = activeRooms.get(code);
      if (!room) return callback?.({ success: false, error: 'Room not found.' });

      room.activeCue = cue;
      io.to(`room_${code}`).emit('room:cue_updated', { cue, timestamp: Date.now() });
      callback?.({ success: true });
    } catch (err) {
      callback?.({ success: false, error: err.message });
    }
  });

  socket.on('room:clear_cue', (payload, callback) => {
    try {
      const { roomCode } = payload || {};
      const code = String(roomCode || '').toUpperCase().trim();
      const room = activeRooms.get(code);
      if (room) {
        room.activeCue = null;
        io.to(`room_${code}`).emit('room:cue_updated', { cue: null, timestamp: Date.now() });
      }
      callback?.({ success: true });
    } catch (err) {
      callback?.({ success: false, error: err.message });
    }
  });

  socket.on('disconnect', () => {
    const code = socket.data.roomCode;
    if (code && activeRooms.has(code)) {
      const room = activeRooms.get(code);
      if (socket.data.isAdmin) {
        io.to(`room_${code}`).emit('room:host_status', { online: false });
      } else {
        room.incomers = room.incomers.filter(m => m.id !== socket.id);
        io.to(`room_${code}`).emit('room:members_updated', {
          incomers: room.incomers,
          count: room.incomers.length
        });
      }
    }
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalNetworkIp();
  console.log(`=========================================`);
  console.log(`  Live Worship Sync Backend Running!     `);
  console.log(`  Local: http://localhost:${PORT}         `);
  console.log(`  Wi-Fi / LAN IP: http://${localIp}:${PORT} `);
  console.log(`=========================================`);
});
