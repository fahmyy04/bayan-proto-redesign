'use client';

import { Send } from 'lucide-react';

type WizardTab = 'details' | 'sequence' | 'schedule' | 'launch';

const TABS: { key: WizardTab; label: string }[] = [
  { key: 'details', label: 'Details' },
  { key: 'sequence', label: 'Sequence' },
  { key: 'schedule', label: 'Schedule' },
  { key: 'launch', label: 'Launch' },
];

const CAMPAIGN_BAR = [
  { name: 'Euro Campaign', color: '#2563EB' },
  { name: 'KSA Campaign', color: '#F97316' },
  { name: 'USA Campaign', color: '#16A34A' },
];

export function CampaignWizardShell({
  activeTab,
  breadcrumbLabel,
  children,
}: {
  activeTab: WizardTab;
  breadcrumbLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-6 py-4">
        <Send className="h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
        <h1 className="text-lg font-semibold text-slate-900">Campaigns</h1>
        <span className="text-sm text-slate-500">/ {breadcrumbLabel}</span>
      </div>

      {/* Wizard tabs */}
      <div className="flex items-center gap-6 px-6 pt-3">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`relative pb-2 text-sm font-medium transition-colors ${
              activeTab === tab.key ? 'text-slate-900' : 'text-slate-400'
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-teal-600" />
            )}
          </button>
        ))}
      </div>

      {/* Divider under tabs */}
      <div className="h-px bg-slate-100" />

      {/* Page body */}
      <div className="min-h-0 flex-1">{children}</div>

      {/* Bottom campaign bar */}
      <div className="grid grid-cols-3 border-t border-slate-100">
        {CAMPAIGN_BAR.map((c, i) => (
          <div
            key={c.name}
            className={`flex flex-wrap items-center gap-2 px-6 py-3 ${i > 0 ? 'border-l border-slate-100' : ''}`}
          >
            <Send className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
            <span className="text-sm text-slate-600">{c.name}</span>
            <span className="ml-auto h-0.5 w-8 rounded-full" style={{ backgroundColor: c.color }} />
          </div>
        ))}
      </div>
    </div>
  );
}