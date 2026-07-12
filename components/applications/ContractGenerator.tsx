'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { composeContract, contractTypeNames, type ContractInput } from '@/lib/contractTemplates';

export default function ContractGenerator() {
  const supabase = createClient();
  const [input, setInput] = useState<ContractInput>({
    contractType: 'nda',
    counterparty: '',
    counterpartyEmail: '',
    country: '',
    effectiveDate: '',
    term: 'one (1) year',
    scope: '',
    amount: '',
  });
  const [draft, setDraft] = useState<{ title: string; content: string } | null>(null);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);

  const set = (k: keyof ContractInput, v: string) => {
    setInput((i) => ({ ...i, [k]: v }));
    setSaved(false);
  };

  const generate = () => {
    if (!input.counterparty.trim()) return;
    setDraft(composeContract(input));
  };

  const save = async () => {
    if (!draft) return;
    await supabase.from('contracts').insert({
      contract_type: input.contractType,
      counterparty: input.counterparty,
      counterparty_email: input.counterpartyEmail,
      country: input.country,
      status: 'draft',
      effective_date: input.effectiveDate || null,
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
          <h2 className="font-display text-xl font-semibold text-navy">§ Contract Generator</h2>
          <p className="mt-1 font-body text-sm text-ink/60">
            NDA, partnership, third-party services, and scholarship agreements — generated, editable, and tracked.
          </p>
        </div>
        <span className="font-display text-2xl text-gold">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="label text-navy/70">Agreement type</label>
              <select value={input.contractType} onChange={(e) => set('contractType', e.target.value)} className="field">
                {Object.entries(contractTypeNames).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label text-navy/70">Counterparty *</label>
                <input value={input.counterparty} onChange={(e) => set('counterparty', e.target.value)} className="field" />
              </div>
              <div>
                <label className="label text-navy/70">Counterparty email</label>
                <input value={input.counterpartyEmail} onChange={(e) => set('counterpartyEmail', e.target.value)} className="field" />
              </div>
              <div>
                <label className="label text-navy/70">Jurisdiction / country</label>
                <input value={input.country} onChange={(e) => set('country', e.target.value)} className="field" placeholder="e.g., Illinois, USA" />
              </div>
              <div>
                <label className="label text-navy/70">Effective date</label>
                <input type="date" value={input.effectiveDate} onChange={(e) => set('effectiveDate', e.target.value)} className="field" />
              </div>
              <div>
                <label className="label text-navy/70">Term</label>
                <input value={input.term} onChange={(e) => set('term', e.target.value)} className="field" />
              </div>
              <div>
                <label className="label text-navy/70">Amount (USD, if any)</label>
                <input type="number" value={input.amount} onChange={(e) => set('amount', e.target.value)} className="field" />
              </div>
            </div>
            <div>
              <label className="label text-navy/70">Scope / purpose</label>
              <textarea value={input.scope} onChange={(e) => set('scope', e.target.value)} rows={3} className="field resize-none" placeholder="What this agreement covers…" />
            </div>
            <button onClick={generate} disabled={!input.counterparty.trim()} className="btn-gold !px-6 !py-2.5 text-xs disabled:opacity-50">
              Generate agreement
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
                    Save to contracts
                  </button>
                  <button onClick={download} className="btn-ghost-dark !px-5 !py-2 text-xs">
                    Download .md
                  </button>
                  {saved && <span className="font-body text-xs font-semibold text-emerald-700">Saved ✓ (status: draft)</span>}
                </div>
              </>
            ) : (
              <div className="flex h-full min-h-[200px] items-center justify-center border border-dashed border-navy/20">
                <p className="max-w-xs text-center font-body text-sm text-ink/40">
                  The generated agreement will appear here — review and edit before saving.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
