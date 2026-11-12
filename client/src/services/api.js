const API_BASE = window.location.port === '5173' ? 'http://' + window.location.hostname + ':4000/api' : '/api';

export async function getNetworkInfo() {
  try {
    const res = await fetch(`${API_BASE}/network-info`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('Network info failed:', err);
    return null;
  }
}

export async function getSongs() {
  const res = await fetch(`${API_BASE}/songs`);
  if (!res.ok) throw new Error('Failed to fetch songs');
  return res.json();
}

export async function createSong(songData) {
  const res = await fetch(`${API_BASE}/songs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(songData)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to save song');
  }
  return res.json();
}

export async function updateSong(id, songData) {
  const res = await fetch(`${API_BASE}/songs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(songData)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update song');
  }
  return res.json();
}

export async function deleteSong(id) {
  const res = await fetch(`${API_BASE}/songs/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete song');
  return res.json();
}

export async function getRoomInfo(code) {
  const res = await fetch(`${API_BASE}/rooms/${code}`);
  if (!res.ok) {
    return { exists: false };
  }
  return res.json();
}
