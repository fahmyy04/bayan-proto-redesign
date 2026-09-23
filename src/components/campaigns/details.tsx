'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { CampaignWizardShell } from './wizard-shell';

const INPUT_CLASS =
  'w-[363px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-teal-600 placeholder:text-slate-400';

const ERRORS = [
  'Campaign name already exists. Please choose a unique name.',
  'Campaign name cannot exceed 100 characters.',
  'Campaign name contains invalid characters. Only letters, numbers, hyphens, and underscores are allowed.',
];

const FIELD_CLASS =
  'w-[363px] appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-sm text-slate-700 outline-none focus:border-teal-600';

export function NewCampaign() {
  return (
    <CampaignWizardShell activeTab="details" breadcrumbLabel="New Campaign">
      <div className="px-6 py-4">
        {/* Campaign Name */}
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Campaign Name<span className="text-red-500">*</span>
        </label>
        <input value="Europe campaign 2026" readOnly className={INPUT_CLASS} />

        {/* Validation errors */}
        <ul className="mt-1.5 space-y-0.5 text-xs text-red-500">
          {ERRORS.map((e) => (
            <li key={e}>• {e}</li>
          ))}
        </ul>

        {/* Campaign Type */}
        <label className="mt-4 mb-1 block text-sm font-medium text-slate-700">
          Campaign Type<span className="text-red-500">*</span>
        </label>
        <div className="relative w-[363px]">
          <select defaultValue="Manual Campaign" className={FIELD_CLASS}>
            <option>Manual Campaign</option>
            <option>Automated Campaign</option>
            <option>Drip Campaign</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7B3FF2]"
            aria-hidden="true"
          />
        </div>

        {/* Lead List */}
        <label className="mt-4 mb-1 block text-sm font-medium text-slate-700">Choose lead list</label>
        <div className="relative w-[363px]">
          <select defaultValue="Teachers in USA 2026" className={FIELD_CLASS}>
            <option>Teachers in USA 2026</option>
            <option>Marketing Leads EU</option>
            <option>SaaS Founders KSA</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7B3FF2]"
            aria-hidden="true"
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-red-500 bg-white px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </CampaignWizardShell>
  );
}