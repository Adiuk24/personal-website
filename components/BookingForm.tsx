'use client';

import { useState } from 'react';
import { CalendarCheck } from 'lucide-react';

// Posts straight from the browser: FormSubmit 403s datacenter IPs and needs a
// real page Referer. The endpoint is Arif's already-public email, so there is
// no secret to protect here.
const BOOKING_ENDPOINT = 'https://formsubmit.co/ajax/adittoarif@gmail.com';

type Booking = { name: string; email: string; company: string; topic: string; preferred_time: string; notes: string };
type State = 'idle' | 'sending' | 'done' | 'invalid' | 'error';

const EMPTY: Booking = { name: '', email: '', company: '', topic: '', preferred_time: '', notes: '' };

const FIELDS: [keyof Booking, string][] = [
  ['name', 'Your name *'],
  ['email', 'Email *'],
  ['company', 'Company'],
  ['topic', 'What do you need help with?'],
  ['preferred_time', 'Preferred time (with timezone)'],
];

export default function BookingForm({
  accent = '#F27D26',
  size = 'page',
  onBooked,
}: {
  accent?: string;
  size?: 'page' | 'chat';
  onBooked?: (b: Booking) => void;
}) {
  const [booking, setBooking] = useState<Booking>(EMPTY);
  const [state, setState] = useState<State>('idle');

  const compact = size === 'chat';

  const submit = async () => {
    if (state === 'sending') return;
    if (!booking.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
      setState('invalid');
      return;
    }
    setState('sending');
    try {
      const r = await fetch(BOOKING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Booking request from ${booking.name} — arifadito.com`,
          _template: 'table',
          ...booking,
        }),
      });
      // FormSubmit answers 200 even when it refuses the message, so the body is
      // the only honest signal of delivery.
      const result = await r.json().catch(() => ({}));
      if (!r.ok || String(result.success) !== 'true') {
        throw new Error(result.message || `book failed ${r.status}`);
      }
      onBooked?.(booking);
      setState('done');
      setBooking(EMPTY);
    } catch (e) {
      console.error('Booking Error:', e);
      setState('error');
    }
  };

  if (state === 'done' && !onBooked) {
    return (
      <div className="p-8 glass rounded-[32px] border" style={{ borderColor: `${accent}55` }}>
        <div className="flex items-center gap-3" style={{ color: accent }}>
          <CalendarCheck size={20} />
          <p className="text-lg font-serif">Request sent.</p>
        </div>
        <p className="text-[#A19E95] text-sm font-light mt-3">
          Arif will reply by email to confirm a time. For anything urgent, email{' '}
          <a href="mailto:adittoarif@gmail.com" className="underline">adittoarif@gmail.com</a>.
        </p>
      </div>
    );
  }

  return (
    <div className={compact ? 'space-y-3' : 'space-y-4'}>
      <div className="flex items-center gap-2" style={{ color: accent }}>
        <CalendarCheck size={compact ? 15 : 18} />
        <span className={`${compact ? 'text-[11px]' : 'text-xs'} font-bold uppercase tracking-widest`}>
          Book a call with Arif
        </span>
      </div>

      {FIELDS.map(([field, placeholder]) => (
        <input
          key={field}
          type={field === 'email' ? 'email' : 'text'}
          value={booking[field]}
          onChange={e => {
            setBooking(prev => ({ ...prev, [field]: e.target.value }));
            if (state === 'invalid') setState('idle');
          }}
          placeholder={placeholder}
          className={`w-full bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-[#A19E95]/60 focus:outline-none transition-all ${
            compact ? 'py-2.5 px-4 text-[12px]' : 'py-3.5 px-5 text-sm'
          }`}
          onFocus={e => { e.currentTarget.style.borderColor = `${accent}80`; }}
          onBlur={e => { e.currentTarget.style.borderColor = ''; }}
        />
      ))}

      {state === 'invalid' && (
        <p className="text-[11px] text-red-400">Please add your name and a valid email address.</p>
      )}
      {state === 'error' && (
        <p className="text-[11px] text-red-400">
          Couldn&apos;t send that just now. Please email{' '}
          <a href="mailto:adittoarif@gmail.com" className="underline">adittoarif@gmail.com</a> directly — it reaches Arif the same way.
        </p>
      )}

      <button
        onClick={submit}
        disabled={state === 'sending'}
        style={{ backgroundColor: accent }}
        className={`w-full font-bold text-black rounded-xl hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 ${
          compact ? 'py-3 text-[12px]' : 'py-4 text-sm'
        }`}
      >
        {state === 'sending' ? 'Sending…' : 'Request booking'}
      </button>
    </div>
  );
}
