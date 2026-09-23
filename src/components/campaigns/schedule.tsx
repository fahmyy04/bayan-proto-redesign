'use client';

import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { CampaignWizardShell } from './wizard-shell';

const DISABLED_FIELD =
  'h-[27px] w-full cursor-not-allowed rounded border border-slate-200 bg-[#F0F0F0] px-2 text-[10px] text-slate-400 outline-none';

export function CampaignSchedule() {
  return (
    <CampaignWizardShell activeTab="schedule" breadcrumbLabel="Europe campaign 2026">
      <div className="px-6 py-4">
        {/* Row 1 */}
        <div className="flex gap-3">
          <div className="flex flex-[1.6] flex-col">
            <label className="mb-1 block text-sm font-medium text-slate-700">Start Date</label>
            <div className="relative">
              <input
                placeholder="dd-mm-yyyy"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pr-10 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-teal-600"
              />
              <Calendar
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7B3FF2]"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <label className="mb-1 block text-sm font-medium text-slate-700">Send from</label>
            <input disabled defaultValue="08:00 AM" className={DISABLED_FIELD} />
          </div>
          <div className="flex flex-1 flex-col">
            <label className="mb-1 block text-sm font-medium text-slate-700">Send until</label>
            <input disabled defaultValue="05:00 PM" className={DISABLED_FIELD} />
          </div>
        </div>

        {/* Row 2 */}
        <div className="mt-4 flex gap-3">
          <div className="flex flex-1 flex-col">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Week end pattern
            </label>
            <div className="relative">
              <select
                defaultValue="Saturday-Sunday(Western)"
                className="w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-sm text-slate-700 outline-none focus:border-teal-600"
              >
                <option>Saturday-Sunday(Western)</option>
                <option>Friday-Saturday(Gulf)</option>
                <option>No weekends</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7B3FF2]"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <label className="mb-1 block text-sm font-medium text-slate-700">Timezone basis</label>
            <div className="relative">
              <select
                defaultValue="Each lead's local time"
                className="w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-sm text-slate-700 outline-none focus:border-teal-600"
              >
                <option>Each lead&apos;s local time</option>
                <option>Campaign timezone</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7B3FF2]"
                aria-hidden="true"
              />
            </div>
          </div>
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
            Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </CampaignWizardShell>
  );
}