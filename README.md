# WorshipSync — Live Church Worship Stage Synchronizer

A real-time, web-based synchronization Progressive Web App (PWA) designed for church worship teams, worship leaders, instrumentalists, and vocalists.

---

## 🌟 Features Implemented

### 1. Centralized Landing Navigation
- **Create a Room**: Worship Leader / Admin initiates a live session, configures Public or PIN-protected access, and generates dynamic QR code & shareable link.
- **Join the Room**: Frictionless musician & vocalist entry with room code, PIN (if private), name, and role selector.
- **Songs Setup**: Standalone "Library Builder" to manage songs before service starts.

### 2. Standalone Library Builder (Songs Setup)
- **Title & Type**: Toggle between **Praise** and **Worship**.
- **Musical Metadata**:
  - **Tempo (BPM)** with interactive **Tap Tempo** calculator.
  - **Keyboard Style Number** (specifically for Yamaha PSR/Genos, Roland, Korg arranger keyboards).
  - **Chords & Key** progression.
- **Dual Lyrics Mode**:
  - **Option A**: Formatted plain text lyrics with automatic verse/chorus highlighting.
  - **Option B**: Screenshot / Image upload for chord charts & sheet music (with preview, zoom, and full-screen view).
- Persistent JSON file storage with default worship seed songs (*Way Maker*, *Goodness of God*, *Praise*).

### 3. Real-Time Live Sync (Performance Mode)
- **Zero-Latency Broadcast**: Admin selects a song and taps **"Push Live"** $\rightarrow$ instantly updates all connected screens.
- **Band Roster**: Real-time connected incomers list with names and instrument/vocal roles.
- **Stage Cues**: Instant 1-tap alerts broadcast across all screens (*"Chorus"*, *"Bridge"*, *"Key Change +1"*, *"Free Worship"*, *"Ending"*, or custom cue).
- **Pulsing Metronome**: Synchronized BPM visual indicator.
- **Wake Lock API**: Automatically prevents mobile and tablet screens from sleeping on music stands.
- **Stage Ergonomics**: High-contrast dark mode glassmorphism UI to eliminate glare under dark church stage lighting.

---

## 🚀 Running the App

### Option 1: Run Both with Single Command
```bash
npm run dev
```

### Option 2: Run Separately
**Backend Server:**
```bash
cd server
npm install
npm run dev
# Running on http://localhost:4000
```

**Frontend Client:**
```bash
cd client
npm install
npm run dev
# Running on http://localhost:5173
```

---

## 📱 Testing with Multiple Devices on Church Stage / Wi-Fi
1. Ensure your laptop and phone/tablet are on the same Wi-Fi network.
2. Look at the Vite output (e.g. `http://<your-local-ip>:5173/`).
3. Open `http://<your-local-ip>:5173/` on the laptop (create room as Admin).
4. On phone/tablet, scan the QR code displayed on the laptop or enter the 5-character Room Code.
5. Push any song or stage cue and watch the phone update instantaneously!
