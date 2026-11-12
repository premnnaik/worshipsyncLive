// Real-time Musical Chord Transposition Engine

const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const ENHARMONIC_MAP = {
  'DB': 'C#',
  'EB': 'D#',
  'GB': 'F#',
  'AB': 'G#',
  'BB': 'A#',
  'CB': 'B',
  'E#': 'F',
  'B#': 'C'
};

// Normalize note name to chromatic index 0-11
export function getNoteIndex(note) {
  if (!note) return -1;
  const upper = note.toUpperCase();
  const normalized = ENHARMONIC_MAP[upper] || upper;
  return CHROMATIC_SCALE.indexOf(normalized);
}

// Check if a chord string represents a minor key (e.g. Cm, Gm, Am, Dm, Em)
export function isMinorKey(chordStr) {
  if (!chordStr) return false;
  const first = chordStr.trim().split(/[\s/-]+/)[0];
  return /^[A-G][#b]?m\b/.test(first) || (first.length >= 2 && first.endsWith('m') && !first.toLowerCase().includes('maj'));
}

// Transpose a single chord token, e.g. "G" -> "C", "Am" -> "Dm", "D/F#" -> "G/B"
export function transposeChordToken(token, semitones) {
  if (semitones === 0) return token;

  // Regex to extract root note, chord quality/extensions, and optional slash bass note
  const regex = /^([A-G][#b]?)(.*?)(?:\/([A-G][#b]?))?$/;
  const match = token.match(regex);
  if (!match) return token;

  const [, root, extension = '', slashBass] = match;
  const rootIdx = getNoteIndex(root);
  if (rootIdx === -1) return token;

  const newRootIdx = (rootIdx + semitones + 120) % 12;
  const newRoot = CHROMATIC_SCALE[newRootIdx];

  let newBass = '';
  if (slashBass) {
    const bassIdx = getNoteIndex(slashBass);
    if (bassIdx !== -1) {
      const newBassIdx = (bassIdx + semitones + 120) % 12;
      newBass = '/' + CHROMATIC_SCALE[newBassIdx];
    }
  }

  return newRoot + extension + newBass;
}

// Check if a line is composed purely of chords
const CHORD_TOKEN_REGEX = /^[A-G][#b]?(?:m|maj|min|dim|aug|sus|add)?[0-9]*(?:\/[A-G][#b]?)?$/;

export function isChordLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/[^\x00-\x7F]/.test(trimmed)) return false; // Non-ASCII (Kannada, etc.)
  if (/[[\].,!?|:;]/.test(trimmed)) return false;
  const tokens = trimmed.split(/\s+/);
  return tokens.every(token => CHORD_TOKEN_REGEX.test(token));
}

// Transpose an entire chord line while preserving character positioning over words
export function transposeChordLine(line, semitones) {
  if (semitones === 0) return line;

  // Split line into words and whitespace segments to keep exact spacing
  return line.replace(/([A-G][#b]?(?:m|maj|min|dim|aug|sus|add)?[0-9]*(?:\/[A-G][#b]?)?)/g, (chord) => {
    return transposeChordToken(chord, semitones);
  });
}

// Calculate semitone shift between original chord (e.g. "G") and selected target chord (e.g. "C")
export function calculateSemitoneShift(originalChordStr, targetChordStr) {
  if (!originalChordStr || !targetChordStr) return 0;
  const origRoot = originalChordStr.trim().replace(/m$/, '').split(/[\s/-]+/)[0];
  const targetRoot = targetChordStr.trim().replace(/m$/, '').split(/[\s/-]+/)[0];

  const origIdx = getNoteIndex(origRoot);
  const targetIdx = getNoteIndex(targetRoot);

  if (origIdx === -1 || targetIdx === -1) return 0;
  return (targetIdx - origIdx + 12) % 12;
}
