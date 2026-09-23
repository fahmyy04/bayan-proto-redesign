'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  LayoutGrid,
  Pause,
  Play,
  Archive,
  Trash,
  SlidersHorizontal,
  Plus,
  ChevronRight,
} from 'lucide-react';

type CampaignStatus = 'Done' | 'Paused' | 'Active' | 'Draft';

interface Campaign {
  id: string;
  name: string;
  totalLeads: number | null;
  sent: number | null;
  openRate: number | null;
  replyRate: number | null;
  deliveryRate: number | null;
  status: CampaignStatus;
}

const CAMPAIGNS: Campaign[] = [
  { id: '1', name: 'Euro campaign', totalLeads: 300, sent: 241, openRate: 31, replyRate: 14, deliveryRate: 2.1, status: 'Done' },
  { id: '2', name: 'KSA Campaign', totalLeads: 150, sent: 98, openRate: 27, replyRate: 9, deliveryRate: 1.0, status: 'Paused' },
  { id: '3', name: 'UK Campaign', totalLeads: 80, sent: 45, openRate: 22, replyRate: 6, deliveryRate: 3.5, status: 'Active' },
  { id: '4', name: 'UK Campaign', totalLeads: null, sent: null, openRate: null, replyRate: null, deliveryRate: null, status: 'Draft' },
  { id: '5', name: 'Euro campaign', totalLeads: 300, sent: 241, openRate: 31, replyRate: 14, deliveryRate: 2.1, status: 'Done' },
  { id: '6', name: 'KSA Campaign', totalLeads: 150, sent: 98, openRate: 27, replyRate: 9, deliveryRate: 1.0, status: 'Paused' },
  { id: '7', name: 'UK Campaign', totalLeads: 80, sent: 45, openRate: 22, replyRate: 6, deliveryRate: 3.5, status: 'Active' },
  { id: '8', name: 'UK Campaign', totalLeads: null, sent: null, openRate: null, replyRate: null, deliveryRate: null, status: 'Draft' },
];

const STATUS_STYLES: Record<CampaignStatus, string> = {
  Done: 'bg-emerald-100 text-emerald-600',
  Paused: 'bg-orange-200 text-orange-500',
  Active: 'bg-indigo-500 text-white',
  Draft: 'bg-slate-200 text-slate-400',
};

const LEGEND = [
  { name: 'Euro Campaign', color: '#2563eb' },
  { name: 'KSA Campaign', color: '#f97316' },
  { name: 'USA Campaign', color: '#16a34a' },
];

export default function CampaignsPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set(['1', '2']));

  const filtered = useMemo(
    () => CAMPAIGNS.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const allSelected = filtered.length > 0 && filtered.every((c) => selected.has(c.id));

  function toggleAll() {
    setSelected(() => {
      if (allSelected) return new Set();
      return new Set(filtered.map((c) => c.id));
    });
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function goToCampaign(id: string) {
    router.push(`/campaigns/${id}`);
  }

  const selectedCount = selected.size;

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-6 py-4">
        <ChevronRight className="h-4 w-4 shrink-0 text-slate-800" />
        <h1 className="text-lg font-semibold text-slate-900">Campaigns</h1>

        <div className="ml-2 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-400">
          <Search className="h-4 w-4" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for campaign..."
            className="w-40 bg-transparent text-slate-700 placeholder:text-slate-400 outline-none sm:w-56"
          />
        </div>

        <button className="flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
          <LayoutGrid className="h-4 w-4" />
        </button>

        {selectedCount > 0 && (
          <>
            <span className="text-sm text-slate-500">{selectedCount} selected</span>

            <button className="flex items-center gap-1.5 rounded-full bg-orange-400 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-orange-500">
              <Pause className="h-3.5 w-3.5" /> Pause
            </button>
            <button className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-emerald-600">
              <Play className="h-3.5 w-3.5" /> Resume
            </button>
            <button className="flex items-center gap-1.5 rounded-full bg-slate-800 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-slate-900">
              <Archive className="h-3.5 w-3.5" /> Archive
            </button>
            <button className="flex items-center gap-1.5 rounded-full bg-red-500 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-red-600">
              <Trash className="h-3.5 w-3.5" /> Delete
            </button>
          </>
        )}

        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">
            <Plus className="h-4 w-4" /> New Campaign
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-6">
        <table className="w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="w-10 border-b border-slate-100 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-slate-300 accent-teal-600"
                />
              </th>
              <th className="border-b border-slate-100 py-3 font-medium">Campaign Name</th>
              <th className="border-b border-slate-100 py-3 font-medium">Total Leads</th>
              <th className="border-b border-slate-100 py-3 font-medium">Sent</th>
              <th className="border-b border-slate-100 py-3 font-medium">Open Rate</th>
              <th className="border-b border-slate-100 py-3 font-medium">Reply Rate</th>
              <th className="border-b border-slate-100 py-3 font-medium">Delivery Rate</th>
              <th className="border-b border-slate-100 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                onClick={() => goToCampaign(c.id)}
                className="cursor-pointer hover:bg-slate-50"
              >
                <td className="border-b border-slate-100 py-3" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selected.has(c.id)}
                    onChange={() => toggleRow(c.id)}
                    className="h-4 w-4 rounded border-slate-300 accent-teal-600"
                  />
                </td>
                <td className="border-b border-slate-100 py-3 font-medium text-slate-800">{c.name}</td>
                <td className="border-b border-slate-100 py-3 text-slate-600">{c.totalLeads ?? ''}</td>
                <td className="border-b border-slate-100 py-3 text-slate-600">{c.sent ?? ''}</td>
                <td className="border-b border-slate-100 py-3 font-medium text-indigo-500">
                  {c.openRate !== null ? `${c.openRate}%` : ''}
                </td>
                <td className="border-b border-slate-100 py-3 font-medium text-emerald-500">
                  {c.replyRate !== null ? `${c.replyRate}%` : ''}
                </td>
                <td className="border-b border-slate-100 py-3 font-medium text-red-500">
                  {c.deliveryRate !== null ? `${c.deliveryRate}%` : ''}
                </td>
                <td className="border-b border-slate-100 py-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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