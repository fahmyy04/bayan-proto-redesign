'use client';

import {
  Bold,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Italic,
  Link,
  List,
  ListOrdered,
  Plus,
  SeparatorHorizontal,
  Strikethrough,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignStart,
  Type,
  Underline,
} from 'lucide-react';
import { CampaignWizardShell } from './wizard-shell';

const FIELD_CLASS =
  'h-[27px] w-full appearance-none rounded border border-slate-200 bg-white px-2 pr-6 text-[10px] text-slate-700 outline-none focus:border-teal-600';

const TOOL_ICON = 'flex h-[19px] w-[19px] items-center justify-center rounded text-slate-500';

function ToolbarRow() {
  return (
    <div className="flex h-[27px] items-center gap-0.5 border border-slate-200 bg-white px-1.5">
      <button type="button" className={TOOL_ICON} title="Paragraph format">
        <Type className="h-2.5 w-2.5" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="flex h-[19px] items-center gap-0.5 rounded px-1 text-[8px] text-slate-500"
      >
        Paragraph <ChevronDown className="h-2 w-2" aria-hidden="true" />
      </button>
      <span className="mx-0.5 h-3 w-px bg-slate-200" />
      <button type="button" className={TOOL_ICON} title="Bold">
        <Bold className="h-2.5 w-2.5" aria-hidden="true" />
      </button>
      <button type="button" className={TOOL_ICON} title="Italic">
        <Italic className="h-2.5 w-2.5" aria-hidden="true" />
      </button>
      <span className="mx-0.5 h-3 w-px bg-slate-200" />
      <button type="button" className={TOOL_ICON} title="Align left">
        <TextAlignStart className="h-2.5 w-2.5" aria-hidden="true" />
      </button>
      <button type="button" className={TOOL_ICON} title="Align center">
        <TextAlignCenter className="h-2.5 w-2.5" aria-hidden="true" />
      </button>
      <button type="button" className={TOOL_ICON} title="Align right">
        <TextAlignEnd className="h-2.5 w-2.5" aria-hidden="true" />
      </button>
      <span className="mx-0.5 h-3 w-px bg-slate-200" />
      <button type="button" className={TOOL_ICON} title="List">
        <List className="h-2.5 w-2.5" aria-hidden="true" />
      </button>
      <button type="button" className={TOOL_ICON} title="Ordered list">
        <ListOrdered className="h-2.5 w-2.5" aria-hidden="true" />
      </button>
      <button type="button" className={TOOL_ICON} title="Link">
        <Link className="h-2.5 w-2.5" aria-hidden="true" />
      </button>
      <button type="button" className={TOOL_ICON} title="Underline">
        <Underline className="h-2.5 w-2.5" aria-hidden="true" />
      </button>
      <button type="button" className={TOOL_ICON} title="Strikethrough">
        <Strikethrough className="h-2.5 w-2.5" aria-hidden="true" />
      </button>
      <button type="button" className={TOOL_ICON} title="Separator">
        <SeparatorHorizontal className="h-2.5 w-2.5" aria-hidden="true" />
      </button>
    </div>
  );
}

const CHIP = 'rounded bg-[#F1EBFF] px-1 py-[2px] text-[8px] leading-none text-[#7B3FF2]';

const VARIABLE_GROUPS: { label: string; chips: string[] }[] = [
  { label: 'Lead', chips: ['{{first_name}}', '{{last_name}}', '{{Title}}', '{{Seniority}}'] },
  { label: 'Company', chips: ['{{Company}}', '{{domain}}', '{{Industry}}', '{{country}}'] },
  { label: 'Scoring', chips: ['{{fit_score}}', '{{fit_reason}}'] },
  { label: 'Profile', chips: ['{{pain}}', '{{value_prop}}'] },
  { label: 'Sender', chips: ['{{sender_name}}', '{{sender_title}}', '{{offer}}'] },
  { label: 'AI', chips: ['{{ai: recent signal}}', '{{ai: their pain}}', '{{ai: what they do}}'] },
];

const EMAIL_BODY = `Hi {{first_name}} {{last_name}}.

[ai: one line on the specific pain or challenge this team faces]

We map where the delay actually sits before quoting, so
you see the sequencing rather than a price list.

Happy to send the one-page version instead of [offer].

— {{sender_name}}`;

const PREVIEW_LINES = [
  'Hi Megan Delaney,',
  'entering new markets without local content tends to be',
  'the bottleneck.',
  'We map where the delay actually sits before quoting, so',
  'you see the sequencing rather than a price list.',
  'Happy to send the one-page version instead of [offer].',
  '— Anna Reid',
];

export function CampaignSequence() {
  return (
    <CampaignWizardShell activeTab="sequence" breadcrumbLabel="Europe campaign 2026">
      <div className="flex gap-2 px-1.5 py-2">
        {/* ── LEFT — EDITOR ─────────────────────────── */}
        <div className="w-[312px] shrink-0 rounded border border-slate-200 bg-slate-50 p-2">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-semibold text-slate-800">Email 1 of 3</span>
            <span className="text-[8px] text-slate-400">Write once — it adapts to every lead</span>
          </div>

          {/* Email tabs */}
          <div className="mt-1.5 flex items-center gap-3 text-[9px]">
            <span className="relative pb-0.5 font-medium text-slate-800">
              Email 1
              <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-teal-600" />
            </span>
            <button type="button" className="text-slate-400 hover:text-slate-500">
              Email 2
            </button>
            <button type="button" className="text-slate-400 hover:text-slate-500">
              Email 3
            </button>
            <button
              type="button"
              className="flex items-center gap-0.5 text-[#7B3FF2] hover:opacity-80"
            >
              <Plus className="h-2.5 w-2.5" aria-hidden="true" /> Add Email
            </button>
          </div>

          {/* Step type / Send after */}
          <div className="mt-2 flex gap-2">
            <div className="flex-1">
              <label className="mb-0.5 block text-[9px] font-medium text-slate-700">Step type</label>
              <div className="relative">
                <select defaultValue="Opener" className={FIELD_CLASS}>
                  <option>Opener</option>
                  <option>Follow-up</option>
                  <option>Breakup</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[#7B3FF2]"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="w-[96px]">
              <label className="mb-0.5 block text-[9px] font-medium text-slate-700">Send after</label>
              <div className="relative">
                <select defaultValue="3 Days" className={FIELD_CLASS}>
                  <option>3 Days</option>
                  <option>5 Days</option>
                  <option>1 Week</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[#7B3FF2]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* CC / BCC */}
          <Field label="CC" value="Hagertorky@gmail.com . Esraammoud@gmail.com" />
          <Field label="BCC" value="Wargwashraf@gmail.com . Wardartek@gmail.com" />

          {/* Subject */}
          <label className="mt-2 mb-0.5 block text-[9px] font-medium text-slate-700">
            Subject<span className="text-red-500">*</span>
          </label>
          <input
            defaultValue="Looret - Elevate Your Global Communication Strategy"
            className="h-[27px] w-full rounded border border-slate-200 bg-white px-2 text-[10px] text-slate-700 outline-none focus:border-teal-600"
          />
          <div className="mt-1">
            <ToolbarRow />
          </div>

          {/* Email Body */}
          <label className="mt-2 mb-0.5 block text-[9px] font-medium text-slate-700">
            Email Body<span className="text-red-500">*</span>
          </label>
          <textarea
            defaultValue={EMAIL_BODY}
            className="h-[214px] w-full resize-none rounded-t border border-slate-200 bg-white px-2 py-1.5 text-[9px] leading-[15px] text-slate-700 outline-none focus:border-teal-600"
          />
          <ToolbarRow />

          {/* Unsubscribe */}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[9px] font-medium text-slate-700">Unsubscribe Message</span>
            <button type="button" className="relative h-3.5 w-6 rounded-full bg-teal-600" title="ON">
              <span className="absolute right-0.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white" />
            </button>
          </div>
        </div>

        {/* ── RIGHT — PREVIEW ───────────────────────── */}
        <div className="flex w-[333px] flex-col shrink-0 rounded border border-slate-200 bg-slate-50 p-2">
          <div className="flex items-center">
            <span className="text-[10px] font-semibold text-slate-800">Preview as a real lead</span>
          </div>

          {/* Navigate leads */}
          <div className="mt-1.5 flex items-center justify-between">
            <button
              type="button"
              className="flex h-[21px] items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 text-[9px] text-slate-500 hover:bg-slate-50"
            >
              <ChevronLeft className="h-3 w-3" aria-hidden="true" /> Previous lead
            </button>
            <span className="text-[9px] text-slate-400">3 of 10 leads</span>
            <button
              type="button"
              className="flex h-[21px] items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 text-[9px] text-slate-500 hover:bg-slate-50"
            >
              Next lead <ChevronRight className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>

          {/* Lead information */}
          <p className="mt-1 text-[9px] text-slate-400">
            Wegan Delaney · VP Marketing · Lumenly Platform
          </p>

          {/* Email preview card */}
          <div className="mt-2 flex flex-col rounded border border-slate-200 bg-white p-2">
            <span className="text-[9px] font-medium text-slate-800">Email as Wegan receives it</span>
            <div className="my-1.5 h-px bg-slate-200" />
            <div className="space-y-[5px] text-[9px] leading-[14px] text-slate-800">
              {PREVIEW_LINES.map((line) => (
                <p key={line}>{line || '\u00A0'}</p>
              ))}
            </div>
          </div>

          {/* Bottom nav */}
          <div className="mt-auto flex items-center justify-between pt-2">
            <button
              type="button"
              className="flex h-[27px] items-center gap-1 rounded bg-teal-600 px-3 text-[10px] font-medium text-white hover:bg-teal-700"
            >
              <ChevronLeft className="h-3 w-3" aria-hidden="true" /> Previous
            </button>
            <button
              type="button"
              className="flex h-[27px] items-center gap-1 rounded bg-teal-600 px-3 text-[10px] font-medium text-white hover:bg-teal-700"
            >
              Next <ChevronRight className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* ── VARIABLE CHIPS (below columns) ─────────── */}
      <div className="px-2 pb-3">
        <p className="mb-1 text-[8px] text-slate-400">Click to insert</p>
        <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
          {VARIABLE_GROUPS.map((group) => (
            <div key={group.label} className="flex items-center gap-1">
              <span className="text-[9px] font-medium text-slate-700">{group.label}:</span>
              <div className="flex flex-wrap gap-1">
                {group.chips.map((chip) => (
                  <button key={chip} type="button" className={CHIP}>
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CampaignWizardShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <>
      <label className="mt-2 mb-0.5 block text-[9px] font-medium text-slate-700">{label}</label>
      <input
        defaultValue={value}
        className="h-[27px] w-full rounded border border-slate-200 bg-white px-2 text-[10px] text-slate-700 outline-none focus:border-teal-600"
      />
    </>
  );
}