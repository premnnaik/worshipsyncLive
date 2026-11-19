// Real-time Musical Chord Transposition Engine

export const SHARP_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const FLAT_SCALE  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const ENHARMONIC_MAP = {
  'DB': 'C#',
  'EB': 'D#',
  'GB': 'F#',
  'AB': 'G#',
  'BB': 'A#',
  'CB': 'B',
  'FB': 'E',
  'E#': 'F',
  'B#': 'C'
};

const FLAT_ROOTS = new Set(['F', 'BB', 'EB', 'AB', 'DB', 'GB']);
const FLAT_MINOR_ROOTS = new Set(['D', 'G', 'C', 'F', 'BB', 'EB', 'AB']);

// Extract root note (e.g. "Em" -> "E", "C#m" -> "C#", "Bb" -> "Bb")
export function extractRootNote(chordStr) {
  if (!chordStr) return null;
  const match = chordStr.trim().match(/^([A-G][#b]?)/i);
  return match ? (match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase()) : null;
}

// Normalize note name to chromatic index 0-11
export function getNoteIndex(note) {
  if (!note) return -1;
  const upper = note.toUpperCase();
  const normalized = ENHARMONIC_MAP[upper] || upper;
  return SHARP_SCALE.indexOf(normalized);
}

// Check if a chord string represents a minor key (e.g. Cm, Gm, Am, Dm, Em)
export function isMinorKey(chordStr) {
  if (!chordStr) return false;
  const first = chordStr.trim().split(/[\s/-]+/)[0];
  return /^[A-G][#b]?m\b/.test(first) || (first.length >= 2 && first.endsWith('m') && !first.toLowerCase().includes('maj'));
}

// Check if target key should use flat scale (e.g. Cm, Fm, Gm, Dm, Bb, Eb, Ab, F)
export function shouldUseFlatScale(keyStr) {
  if (!keyStr) return false;
  const trimmed = keyStr.trim().split(/[\s/-]+/)[0];
  if (trimmed.includes('b')) return true;
  const root = extractRootNote(trimmed);
  if (!root) return false;
  const rootUpper = root.toUpperCase();
  const minor = isMinorKey(trimmed);
  if (minor) {
    return FLAT_MINOR_ROOTS.has(rootUpper);
  }
  return FLAT_ROOTS.has(rootUpper);
}

// Transpose a single chord token, e.g. "G" -> "C", "Am" -> "Dm", "D/F#" -> "G/B"
export function transposeChordToken(token, semitones, preferFlats = false) {
  if (semitones === 0) return token;

  // Regex to extract root note, chord quality/extensions, and optional slash bass note
  const regex = /^([A-G][#b]?)(.*?)(?:\/([A-G][#b]?))?$/;
  const match = token.match(regex);
  if (!match) return token;

  const [, root, extension = '', slashBass] = match;
  const rootIdx = getNoteIndex(root);
  if (rootIdx === -1) return token;

  const scale = preferFlats ? FLAT_SCALE : SHARP_SCALE;
  const newRootIdx = (rootIdx + semitones + 120) % 12;
  const newRoot = scale[newRootIdx];

  let newBass = '';
  if (slashBass) {
    const bassIdx = getNoteIndex(slashBass);
    if (bassIdx !== -1) {
      const newBassIdx = (bassIdx + semitones + 120) % 12;
      newBass = '/' + scale[newBassIdx];
    }
  }

  return newRoot + extension + newBass;
}

// Check if a line is composed purely of chords
const CHORD_TOKEN_REGEX = /^[A-G][#b]?(?:m|min|maj|dim|aug|sus|add)?[0-9]*(?:\/[A-G][#b]?)?$/;

export function isChordLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/[^\x00-\x7F]/.test(trimmed)) return false; // Non-ASCII (Kannada, Telugu, Hindi, etc.)
  if (/[[\].,!?|:;]/.test(trimmed)) return false;
  const tokens = trimmed.split(/\s+/);
  return tokens.every(token => CHORD_TOKEN_REGEX.test(token));
}

// Transpose an entire chord line while preserving character positioning over words
export function transposeChordLine(line, semitones, targetKeyOrPreferFlats = false) {
  if (semitones === 0) return line;
  const preferFlats = typeof targetKeyOrPreferFlats === 'boolean'
    ? targetKeyOrPreferFlats
    : shouldUseFlatScale(targetKeyOrPreferFlats);

  // Split line into words and whitespace segments to keep exact spacing
  return line.replace(/([A-G][#b]?(?:m|min|maj|dim|aug|sus|add)?[0-9]*(?:\/[A-G][#b]?)?)/g, (chord) => {
    return transposeChordToken(chord, semitones, preferFlats);
  });
}

// Calculate semitone shift between original base chord (e.g. "Em") and selected target chord (e.g. "Cm")
export function calculateSemitoneShift(originalChordStr, targetChordStr) {
  if (!originalChordStr || !targetChordStr) return 0;
  const origRoot = extractRootNote(originalChordStr);
  const targetRoot = extractRootNote(targetChordStr);

  if (!origRoot || !targetRoot) return 0;
  const origIdx = getNoteIndex(origRoot);
  const targetIdx = getNoteIndex(targetRoot);

  if (origIdx === -1 || targetIdx === -1) return 0;
  return (targetIdx - origIdx + 12) % 12;
}

// Detect original key from lyrics or song metadata
export function detectSongKey(song) {
  if (song?.originalKey) return song.originalKey;
  const text = song?.kannadaLyrics || song?.englishLyrics || song?.lyricsText || '';
  for (const line of text.split('\n')) {
    if (isChordLine(line)) {
      const match = line.trim().match(/^([A-G][#b]?(?:m|min|maj|dim|aug|sus|add)?[0-9]*)/);
      if (match) return match[1];
    }
  }
  return song?.chords || 'C';
}
