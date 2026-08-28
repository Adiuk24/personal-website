'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ENDPOINT = 'https://arifadito-api.netlify.app/.netlify/functions/track';

// No cookies, no localStorage id, no third-party script. One fire-and-forget
// beacon per page view; the server keeps daily counts only.
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    const payload = JSON.stringify({ path: pathname, ref: document.referrer || '' });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'application/json' }));
      } else {
        fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true });
      }
    } catch { /* analytics must never break the page */ }
  }, [pathname]);

  return null;
}
