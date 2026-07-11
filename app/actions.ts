'use server';

import { createClient } from '@/lib/supabase/server';

type ActionResult = { ok: boolean; error?: string };

function clean(value: FormDataEntryValue | null, max = 2000): string {
  return String(value ?? '').trim().slice(0, max);
}

export async function submitInquiry(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from('inquiries').insert({
    name: clean(formData.get('name'), 160),
    email: clean(formData.get('email'), 200),
    topic: clean(formData.get('topic'), 60) || 'other',
    message: clean(formData.get('message')),
    locale: clean(formData.get('locale'), 5) || 'en',
    source: clean(formData.get('source'), 40) || 'contact',
  });
  return { ok: !error, error: error?.message };
}

export async function submitJoinApplication(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();
  const role = clean(formData.get('role'), 40) || 'volunteer';
  const { error } = await supabase.from('applications').insert({
    role,
    name: clean(formData.get('name'), 160),
    email: clean(formData.get('email'), 200),
    country: clean(formData.get('country'), 90),
    organization: clean(formData.get('organization'), 200),
    message: clean(formData.get('message')),
    locale: clean(formData.get('locale'), 5) || 'en',
  });
  return { ok: !error, error: error?.message };
}

export async function submitPledge(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();
  const amount = Number(clean(formData.get('amount'), 12));
  if (!Number.isFinite(amount) || amount <= 0 || amount > 1000000) {
    return { ok: false, error: 'Invalid amount' };
  }
  const { error } = await supabase.from('donations').insert({
    donor_name: clean(formData.get('name'), 160),
    donor_email: clean(formData.get('email'), 200),
    amount,
    currency: 'USD',
    frequency: clean(formData.get('frequency'), 10) === 'monthly' ? 'monthly' : 'once',
    designation: clean(formData.get('designation'), 40) || 'greatest',
    dedication: clean(formData.get('dedication'), 300),
    note: clean(formData.get('note'), 1000),
    status: 'pledged',
    locale: clean(formData.get('locale'), 5) || 'en',
  });
  return { ok: !error, error: error?.message };
}

export async function subscribeNewsletter(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();
  const email = clean(formData.get('email'), 200);
  if (!email.includes('@')) return { ok: false, error: 'Invalid email' };
  const { error } = await supabase.from('subscribers').insert({
    email,
    locale: clean(formData.get('locale'), 5) || 'en',
  });
  // Unique-violation means already subscribed — treat as success.
  if (error && error.code === '23505') return { ok: true };
  return { ok: !error, error: error?.message };
}

export async function submitConciergeMessage(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from('inquiries').insert({
    name: clean(formData.get('name'), 160),
    email: clean(formData.get('email'), 200),
    topic: clean(formData.get('topic'), 60) || 'concierge',
    message: clean(formData.get('message')),
    locale: clean(formData.get('locale'), 5) || 'en',
    source: 'concierge',
  });
  return { ok: !error, error: error?.message };
}
