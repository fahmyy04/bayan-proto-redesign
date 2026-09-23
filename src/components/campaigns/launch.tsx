'use client';

import { ChevronLeft, LayoutGrid, Mail, MessageSquare, Play, Users } from 'lucide-react';
import { CampaignWizardShell } from './wizard-shell';

const STATS = [
  { icon: Users, number: '10', label: 'Leads' },
  { icon: Mail, number: '130', label: 'Emails/day' },
  { icon: MessageSquare, number: '136', label: 'Messages' },
  { icon: LayoutGrid, number: '2', label: 'Templates' },
];

export function CampaignLaunch() {
  return (
    <CampaignWizardShell activeTab="launch" breadcrumbLabel="Europe campaign 2026">
      <div className="px-6 py-4">
        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-3">
          {STATS.map(({ icon: Icon, number, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-600">
                <Icon className="h-5 w-5 text-teal-600" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-lg font-bold leading-none text-slate-900">{number}</span>
                <span className="mt-1 text-sm text-slate-400">{label}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Sending info banner */}
        <div className="mt-4 rounded-lg bg-[#E9DFFB] px-4 py-3">
          <p className="text-sm font-semibold text-slate-900">Sending</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">
            Belgent sends this from 3 managed inboxes at about 130 emails a day, rising to 150 next
            week as newer inboxes finish warming. You do not need to connect or configure anything.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Previous
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            Launch campaign <Play className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </CampaignWizardShell>
  );
}