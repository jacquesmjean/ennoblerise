'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

const nav = [
  { href: '/portal', label: 'Dashboard', icon: '◆' },
  { href: '/portal/inquiries', label: 'Front Desk', icon: '☎' },
  { href: '/portal/applications', label: 'Applications', icon: '✍' },
  { href: '/portal/donations', label: 'Donations', icon: '♥' },
  { href: '/portal/grants', label: 'Grants', icon: '⛁' },
  { href: '/portal/contracts', label: 'Contracts', icon: '§' },
  { href: '/portal/partners', label: 'Partners & Countries', icon: '⚑' },
  { href: '/portal/staff', label: 'Staff', icon: '⚭' },
];

export default function PortalShell({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy">
        <p className="font-display text-gold-bright animate-shimmer">EnnobleRise…</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="horizon-strong flex min-h-screen items-center justify-center px-5">
        <form onSubmit={signIn} className="w-full max-w-sm border border-gold/30 bg-navy/80 p-8 backdrop-blur">
          <div className="flex items-center gap-3">
            <Image src="/images/emblem.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
            <div>
              <p className="font-display text-lg font-semibold text-ivory">
                Ennoble<span className="text-gold-bright">Rise</span>™
              </p>
              <p className="font-body text-[10px] uppercase tracking-wider2 text-gold-bright">Operations Portal</p>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="field-dark"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="field-dark"
            />
          </div>
          {error && <p className="mt-4 font-body text-sm text-red-400">{error}</p>}
          <button type="submit" className="btn-gold mt-6 w-full">
            Sign in
          </button>
          <p className="mt-5 font-body text-[11px] leading-relaxed text-ivory/45">
            Staff access only. Accounts are provisioned by your administrator.
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F4F1E8]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col bg-navy md:flex">
        <Link href="/portal" className="flex items-center gap-2.5 px-5 py-6">
          <Image src="/images/emblem.png" alt="" width={34} height={34} className="h-9 w-9 object-contain" />
          <div>
            <p className="font-display text-sm font-semibold text-ivory">
              Ennoble<span className="text-gold-bright">Rise</span>™
            </p>
            <p className="font-body text-[9px] uppercase tracking-wider2 text-gold-bright">Operations</p>
          </div>
        </Link>
        <nav className="flex-1 space-y-0.5 px-3">
          {nav.map((item) => {
            const active =
              item.href === '/portal' ? pathname === '/portal' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 font-body text-[13px] transition-colors ${
                  active
                    ? 'bg-gold/15 font-semibold text-gold-bright'
                    : 'text-ivory/65 hover:bg-white/5 hover:text-ivory'
                }`}
              >
                <span className="w-4 text-center text-gold/70">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-ivory/10 px-5 py-4">
          <p className="truncate font-body text-xs text-ivory/60">{session.user.email}</p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="mt-2 font-body text-xs font-semibold text-gold-bright hover:text-gold-pale"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center gap-3 overflow-x-auto bg-navy px-4 py-3 md:hidden">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap font-body text-xs ${
              pathname === item.href ? 'text-gold-bright font-semibold' : 'text-ivory/70'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <main className="flex-1 px-5 pb-16 pt-16 md:ml-60 md:px-10 md:pt-10">{children}</main>
    </div>
  );
}
