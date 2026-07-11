'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { composeGrantDoc, type GrantInput } from '@/lib/grantTemplates';

export default function GrantWriter() {
  const supabase = createClient();
  const [input, setInput] = useState<GrantInput>({
    funder: '',
    program: 'general',
    amount: '',
    duration: '12 months',
    geography: '',
    docType: 'loi',
  });
  const [draft, setDraft] = useState<{ title: string; content: string } | null>(null);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);

  const set = (k: keyof GrantInput, v: string) => {
    setInput((i) => ({ ...i, [k]: v }));
    setSaved(false);
  };

  const generate = () => {
    if (!input.funder.trim()) return;
    setDraft(composeGrantDoc(input));
    setSaved(false);
  };

  const save = async () => {
    if (!draft) return;
    // Ensure a grant record exists for this funder
    const { data: grant } = await supabase
      .from('grants')
      .insert({
        funder: input.funder,
        title: draft.title,
        amount_requested: input.amount ? Number(input.amount) : null,
        program: input.program,
        stage: 'drafting',
      })
      .select('id')
      .single();
    await supabase.from('grant_documents').insert({
      grant_id: grant?.id ?? null,
      doc_type: input.docType,
      title: draft.title,
      content: draft.content,
    });
    setSaved(true);
  };

  const download = () => {
    if (!draft) return;
    const blob = new Blob([draft.content], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${draft.title.replace(/[^\w]+/g, '-').toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="portal-card mt-6 border-l-2 !border-l-gold">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between text-left">
        <div>
          <h2 className="font-display text-xl font-semibold text-navy">✦ Grant Writing Workbench</h2>
          <p className="mt-1 font-body text-sm text-ink/60">
            Generate a funder-ready Letter of Inquiry or full proposal narrative in the Trust&apos;s voice.
          </p>
        </div>
        <span className="font-display text-2xl text-gold">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="label text-navy/70">Funder name *</label>
              <input value={input.funder} onChange={(e) => set('funder', e.target.value)} className="field" placeholder="e.g., The Ford Foundation" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label text-navy/70">Document type</label>
                <select value={input.docType} onChange={(e) => set('docType', e.target.value)} className="field">
                  <option value="loi">Letter of Inquiry</option>
                  <option value="narrative">Full proposal narrative</option>
                </select>
              </div>
              <div>
                <label className="label text-navy/70">Program pillar</label>
                <select value={input.program} onChange={(e) => set('program', e.target.value)} className="field">
                  <option value="general">All pillars</option>
                  <option value="youth">Youth Ennoblement</option>
                  <option value="educators">Teacher Leadership</option>
                  <option value="women">Women&apos;s Financial Resilience</option>
                </select>
              </div>
              <div>
                <label className="label text-navy/70">Amount (USD)</label>
                <input type="number" value={input.amount} onChange={(e) => set('amount', e.target.value)} className="field" placeholder="50000" />
              </div>
              <div>
                <label className="label text-navy/70">Duration</label>
                <input value={input.duration} onChange={(e) => set('duration', e.target.value)} className="field" />
              </div>
            </div>
            <div>
              <label className="label text-navy/70">Geography</label>
              <input value={input.geography} onChange={(e) => set('geography', e.target.value)} className="field" placeholder="e.g., Sri Lanka and the Caribbean" />
            </div>
            <button onClick={generate} disabled={!input.funder.trim()} className="btn-gold !px-6 !py-2.5 text-xs disabled:opacity-50">
              Compose draft
            </button>
          </div>

          <div>
            {draft ? (
              <>
                <textarea
                  value={draft.content}
                  onChange={(e) => setDraft({ ...draft, content: e.target.value })}
                  rows={18}
                  className="field font-mono !text-[12.5px] leading-relaxed"
                />
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button onClick={save} className="btn-gold !px-5 !py-2 text-xs">
                    Save to grants pipeline
                  </button>
                  <button onClick={download} className="btn-ghost-dark !px-5 !py-2 text-xs">
                    Download .md
                  </button>
                  {saved && <span className="font-body text-xs font-semibold text-emerald-700">Saved ✓ (stage: drafting)</span>}
                </div>
              </>
            ) : (
              <div className="flex h-full min-h-[200px] items-center justify-center border border-dashed border-navy/20">
                <p className="max-w-xs text-center font-body text-sm text-ink/40">
                  Your draft will appear here — fully editable before you save or download.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
