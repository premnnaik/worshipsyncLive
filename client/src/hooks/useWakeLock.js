import { useEffect, useState, useCallback, useRef } from 'react';

export function useWakeLock() {
  const [isLocked, setIsLocked] = useState(false);
  const [supported, setSupported] = useState(false);
  const sentinelRef = useRef(null);
  const fallbackVideoRef = useRef(null);

  const requestWakeLock = useCallback(async () => {
    // 1. Modern Screen Wake Lock API (Chrome, Edge, Opera, Safari 16.4+)
    if ('wakeLock' in navigator) {
      try {
        if (sentinelRef.current && !sentinelRef.current.released) {
          setIsLocked(true);
          return true;
        }
        const sentinel = await navigator.wakeLock.request('screen');
        sentinelRef.current = sentinel;
        setIsLocked(true);

        sentinel.addEventListener('release', () => {
          sentinelRef.current = null;
          setIsLocked(false);
        });
        return true;
      } catch (err) {
        console.warn('Native WakeLock request failed:', err);
      }
    }

    // 2. Fallback keep-alive for iOS Safari or older browsers:
    try {
      if (!fallbackVideoRef.current && typeof document !== 'undefined') {
        const video = document.createElement('video');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('muted', '');
        video.muted = true;
        video.loop = true;
        video.width = 1;
        video.height = 1;
        video.style.position = 'fixed';
        video.style.top = '-9999px';
        video.style.opacity = '0.01';
        video.style.pointerEvents = 'none';

        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        if (canvas.captureStream) {
          const stream = canvas.captureStream(1);
          video.srcObject = stream;
          video.play().catch(() => {});
          fallbackVideoRef.current = video;
          document.body.appendChild(video);
          setIsLocked(true);
          return true;
        }
      }
    } catch (e) {
      // ignore
    }

    return false;
  }, []);

  const releaseWakeLock = useCallback(async () => {
    if (sentinelRef.current) {
      try {
        await sentinelRef.current.release();
      } catch (e) {}
      sentinelRef.current = null;
    }
    if (fallbackVideoRef.current) {
      try {
        fallbackVideoRef.current.pause();
        fallbackVideoRef.current.remove();
      } catch (e) {}
      fallbackVideoRef.current = null;
    }
    setIsLocked(false);
  }, []);

  useEffect(() => {
    setSupported('wakeLock' in navigator);

    // Initial lock request
    requestWakeLock();

    // Re-acquire when user returns to tab or wakes device
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };

    // Re-acquire on user interactions
    const handleUserInteraction = () => {
      if (!sentinelRef.current) {
        requestWakeLock();
      }
    };

    // Periodic check every 20 seconds to guarantee 2+ hours continuous live session
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible' && !sentinelRef.current) {
        requestWakeLock();
      }
    }, 20000);

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('click', handleUserInteraction, { passive: true });

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      releaseWakeLock();
    };
  }, [requestWakeLock, releaseWakeLock]);

  return { isLocked, supported, requestWakeLock, releaseWakeLock };
}
