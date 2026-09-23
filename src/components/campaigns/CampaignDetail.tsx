'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  ChevronLeft,
  Plus,
  Bold,
  Italic,
  TextAlignStart,
  Type,
  Calendar as CalendarIcon,
  Users,
  Mail,
  MessageSquare,
  FileText,
} from 'lucide-react';

type TabKey = 'details' | 'sequence' | 'schedule' | 'launch';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'details', label: 'Details' },
  { key: 'sequence', label: 'Sequence' },
  { key: 'schedule', label: 'Schedule' },
  { key: 'launch', label: 'Launch' },
];

const LEGEND = [
  { name: 'Euro Campaign', color: '#2563eb' },
  { name: 'KSA Campaign', color: '#f97316' },
  { name: 'USA Campaign', color: '#16a34a' },
];

interface EmailStep {
  id: string;
  label: string;
  stepType: string;
  sendAfterDays: number;
  cc: string;
  bcc: string;
  subject: string;
  body: string;
  unsubscribe: boolean;
}

const INITIAL_STEPS: EmailStep[] = [
  {
    id: 'e1',
    label: 'Email 1',
    stepType: 'Opener',
    sendAfterDays: 3,
    cc: 'Wagertorky@gmail.com',
    bcc: 'Warwashofra@gmail.com , Wordtorex@gmail.com',
    subject: 'Laoret - Elevate Your Global Communication Strategy',
    body:
      'Hi {{first_name}} {{last_name}},\n\n{ai: one line on the specific pain or challenge their business faces}\n\nWe map where the delay actually sits before quoting, so you see the sequencing rather than a price list.\n\nHappy to send the one-page version instead of a 20-minute call.\n\n- {{sender_name}}',
    unsubscribe: true,
  },
  { id: 'e2', label: 'Email 2', stepType: 'Follow-up', sendAfterDays: 2, cc: '', bcc: '', subject: '', body: '', unsubscribe: true },
  { id: 'e3', label: 'Email 3', stepType: 'Breakup', sendAfterDays: 4, cc: '', bcc: '', subject: '', body: '', unsubscribe: true },
];

interface Lead {
  name: string;
  title: string;
  company: string;
}

const LEADS: Lead[] = [
  { name: 'Megan Delaney', title: 'VP Marketing', company: 'Luminly Platform' },
  { name: 'Owen Marsh', title: 'Head of Growth', company: 'Northgate Labs' },
  { name: 'Priya Chandra', title: 'CMO', company: 'Verona Systems' },
];

export function CampaignDetail() {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>('details');
  const [campaignName, setCampaignName] = useState('Europe campaign 2026');
  const [campaignType, setCampaignType] = useState('Manual Campaign');
  const [leadList, setLeadList] = useState('Teachers in USA 2026');
  const [nameError] = useState(true);

  const [steps, setSteps] = useState<EmailStep[]>(INITIAL_STEPS);
  const [activeStepId, setActiveStepId] = useState('e1');
  const activeStep = steps.find((s) => s.id === activeStepId) ?? steps[0];

  const [leadIndex, setLeadIndex] = useState(2);
  const activeLead = LEADS[leadIndex % LEADS.length];

  const [startDate, setStartDate] = useState('');
  const [sendFrom, setSendFrom] = useState('');
  const [sendUntil, setSendUntil] = useState('');
  const [weekendPattern, setWeekendPattern] = useState('Saturday-Sunday (Western)');
  const [timezoneBasis, setTimezoneBasis] = useState("Each lead's local time");

  function updateStep<K extends keyof EmailStep>(id: string, key: K, value: EmailStep[K]) {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
  }

  function addStep() {
    const id = `e${steps.length + 1}`;
    setSteps((prev) => [
      ...prev,
      { id, label: `Email ${prev.length + 1}`, stepType: 'Follow-up', sendAfterDays: 2, cc: '', bcc: '', subject: '', body: '', unsubscribe: true },
    ]);
    setActiveStepId(id);
  }

  const tabIndex = TABS.findIndex((t) => t.key === tab);

  function goPrev() {
    if (tabIndex > 0) setTab(TABS[tabIndex - 1].key);
  }
  function goNext() {
    if (tabIndex < TABS.length - 1) setTab(TABS[tabIndex + 1].key);
  }

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
        <ChevronRight className="h-4 w-4 text-slate-800" />
        <button onClick={() => router.push('/campaigns')} className="font-semibold text-slate-900 hover:underline">
          Campaigns
        </button>
        <span className="text-slate-400">/</span>
        <span className="font-semibold text-slate-900">{campaignName}</span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-100 px-6">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`relative py-3 text-sm font-medium transition-colors ${
              tab === t.key ? 'text-teal-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {t.label}
            {tab === t.key && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-teal-600" />}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto">
        {tab === 'details' && (
          <div className="mx-auto max-w-xl px-6 py-8">
            <div className="mb-5">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Campaign Name<span className="text-red-500">*</span>
              </label>
              <input
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-500"
              />
              {nameError && (
                <ul className="mt-1.5 space-y-0.5 text-xs text-red-500">
                  <li>• Campaign name already exists. Please choose a unique name.</li>
                  <li>• Campaign name cannot exceed 100 characters.</li>
                  <li>• Campaign name contains invalid characters. Only letters, numbers, hyphens, and underscores are allowed.</li>
                </ul>
              )}
            </div>

            <div className="mb-5">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Campaign Type<span className="text-red-500">*</span>
              </label>
              <select
                value={campaignType}
                onChange={(e) => setCampaignType(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-500"
              >
                <option>Manual Campaign</option>
                <option>Automated Campaign</option>
                <option>Drip Campaign</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Choose lead list</label>
              <select
                value={leadList}
                onChange={(e) => setLeadList(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-500"
              >
                <option>Teachers in USA 2026</option>
                <option>Marketing Leads EU</option>
                <option>SaaS Founders KSA</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => router.push('/campaigns')}
                className="rounded-lg border border-red-300 px-5 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
              >
                Cancel
              </button>
              <button
                onClick={goNext}
                className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-5 py-2 text-sm font-medium text-white hover:bg-teal-700"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {tab === 'sequence' && (
          <div className="grid h-full grid-cols-1 lg:grid-cols-2">
            {/* Left: editor */}
            <div className="border-r border-slate-100 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-800">
                  {activeStep.label} of {steps.length}
                </span>
                <span className="text-xs text-slate-400">{steps.length} leads in step</span>
              </div>

              <div className="mb-5 flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
                {steps.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStepId(s.id)}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      activeStepId === s.id ? 'bg-teal-100 text-teal-700' : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
                <button
                  onClick={addStep}
                  className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-teal-600 hover:bg-teal-50"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Email
                </button>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">Step type</label>
                  <select
                    value={activeStep.stepType}
                    onChange={(e) => updateStep(activeStep.id, 'stepType', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500"
                  >
                    <option>Opener</option>
                    <option>Follow-up</option>
                    <option>Breakup</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">Send after</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={activeStep.sendAfterDays}
                      onChange={(e) => updateStep(activeStep.id, 'sendAfterDays', Number(e.target.value))}
                      className="w-16 rounded-lg border border-slate-200 px-2 py-2 text-sm outline-none focus:border-teal-500"
                    />
                    <span className="text-sm text-slate-500">Days</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-medium text-slate-500">CC</label>
                <input
                  value={activeStep.cc}
                  onChange={(e) => updateStep(activeStep.id, 'cc', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500"
                />
              </div>
              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-medium text-slate-500">BCC</label>
                <input
                  value={activeStep.bcc}
                  onChange={(e) => updateStep(activeStep.id, 'bcc', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500"
                />
              </div>
              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-medium text-slate-500">
                  Subject<span className="text-red-500">*</span>
                </label>
                <input
                  value={activeStep.subject}
                  onChange={(e) => updateStep(activeStep.id, 'subject', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500"
                />
              </div>
              <div className="mb-3">
                <label className="mb-1.5 block text-xs font-medium text-slate-500">
                  Email Body<span className="text-red-500">*</span>
                </label>
                <textarea
                  value={activeStep.body}
                  onChange={(e) => updateStep(activeStep.id, 'body', e.target.value)}
                  rows={8}
                  className="w-full resize-none rounded-t-lg border border-b-0 border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500"
                />
                <div className="flex items-center gap-1 rounded-b-lg border border-slate-200 bg-slate-50 px-2 py-1.5">
                  <button className="rounded p-1 text-slate-500 hover:bg-slate-200">
                    <Type className="h-3.5 w-3.5" />
                  </button>
                  <button className="rounded p-1 font-bold text-slate-500 hover:bg-slate-200">
                    <Bold className="h-3.5 w-3.5" />
                  </button>
                  <button className="rounded p-1 text-slate-500 hover:bg-slate-200">
                    <Italic className="h-3.5 w-3.5" />
                  </button>
                  <button className="rounded p-1 text-slate-500 hover:bg-slate-200">
                    <TextAlignStart className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <label className="flex items-center justify-between text-sm text-slate-700">
                Unsubscribe Message
                <button
                  onClick={() => updateStep(activeStep.id, 'unsubscribe', !activeStep.unsubscribe)}
                  className={`h-5 w-9 rounded-full transition-colors ${activeStep.unsubscribe ? 'bg-teal-600' : 'bg-slate-300'}`}
                >
                  <span
                    className={`block h-4 w-4 translate-y-0.5 rounded-full bg-white transition-transform ${
                      activeStep.unsubscribe ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </label>
            </div>

            {/* Right: preview */}
            <div className="bg-slate-50 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <button
                  onClick={() => setLeadIndex((i) => Math.max(0, i - 1))}
                  className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous lead
                </button>
                <span className="text-xs text-slate-400">
                  {leadIndex + 1} of {LEADS.length} leads
                </span>
                <button
                  onClick={() => setLeadIndex((i) => Math.min(LEADS.length - 1, i + 1))}
                  className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
                >
                  Next lead <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-4 flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-slate-400" />
                <span className="font-medium text-slate-800">{activeLead.name}</span>
                <span className="text-slate-400">· {activeLead.title} · {activeLead.company}</span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">Preview as a real read</p>
                <p className="mb-3 text-sm text-slate-700">Hi {activeLead.name.split(' ')[0]},</p>
                <p className="mb-3 text-sm leading-relaxed text-slate-600">
                  entering new markets without local content tends to be the bottleneck.
                </p>
                <p className="mb-3 text-sm leading-relaxed text-slate-600">
                  We map where the delay actually sits before quoting, so you see the sequencing rather than a
                  price list.
                </p>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  Happy to send the one-page version instead of a 20-minute call.
                </p>
                <p className="text-sm text-slate-500">- Anna Reid</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'schedule' && (
          <div className="px-6 py-8">
            <div className="grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Start Date</label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="dd-mm-yyyy"
                    className="w-full text-sm text-slate-800 outline-none"
                  />
                  <CalendarIcon className="h-4 w-4 shrink-0 text-teal-600" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Send from</label>
                <input
                  type="time"
                  value={sendFrom}
                  onChange={(e) => setSendFrom(e.target.value)}
                  placeholder="08:00 AM"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Send until</label>
                <input
                  type="time"
                  value={sendUntil}
                  onChange={(e) => setSendUntil(e.target.value)}
                  placeholder="05:00 PM"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="mt-6 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Week end pattern</label>
                <select
                  value={weekendPattern}
                  onChange={(e) => setWeekendPattern(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-500"
                >
                  <option>Saturday-Sunday (Western)</option>
                  <option>Friday-Saturday (Middle East)</option>
                  <option>Sunday only</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Timezone basis</label>
                <select
                  value={timezoneBasis}
                  onChange={(e) => setTimezoneBasis(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-500"
                >
                  <option>Each lead&apos;s local time</option>
                  <option>Sender&apos;s timezone</option>
                  <option>UTC</option>
                </select>
              </div>
            </div>

            <div className="mt-10 flex max-w-3xl items-center justify-between">
              <button
                onClick={goPrev}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <button
                onClick={goNext}
                className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-5 py-2 text-sm font-medium text-white hover:bg-teal-700"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {tab === 'launch' && (
          <div className="px-6 py-8">
            <div className="mb-6 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard icon={<Users className="h-4 w-4" />} value="10" label="Leads" />
              <StatCard icon={<Mail className="h-4 w-4" />} value="130" label="Emails/day" />
              <StatCard icon={<MessageSquare className="h-4 w-4" />} value="136" label="Messages" />
              <StatCard icon={<FileText className="h-4 w-4" />} value="2" label="Templates" />
            </div>

            <div className="mb-8 max-w-3xl rounded-xl bg-violet-100 px-5 py-4">
              <p className="mb-1 text-sm font-semibold text-violet-900">Sending</p>
              <p className="text-sm leading-relaxed text-violet-800">
                Goigent sends this from 3 managed inboxes at about 130 emails a day, rising to 130 next week as
                newer inboxes finish warming. You do not need to connect or configure anything.
              </p>
            </div>

            <div className="flex max-w-3xl items-center justify-between">
              <button
                onClick={goPrev}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <button className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-5 py-2 text-sm font-medium text-white hover:bg-teal-700">
                Launch campaign <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer legend */}
      <div className="flex flex-wrap items-center gap-6 border-t border-slate-100 px-6 py-3">
        {LEGEND.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-sm text-slate-600">
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span>{item.name}</span>
            <span className="h-0.5 w-8 rounded-full" style={{ backgroundColor: item.color }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-slate-800">{value}</p>
        <p className="text-xs text-slate-400">{label}</p>
      </div>
    </div>
  );
}