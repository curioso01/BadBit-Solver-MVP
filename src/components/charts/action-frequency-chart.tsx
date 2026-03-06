'use client';

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Fold', value: 43, color: '#64748B' },
  { name: 'Call', value: 34, color: '#38BDF8' },
  { name: 'Raise', value: 23, color: '#34D399' }
];

export const ActionFrequencyChart = (): JSX.Element => (
  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={68}
          outerRadius={98}
          paddingAngle={3}
          stroke="rgba(15,23,42,0.85)"
          strokeWidth={3}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(15,23,42,0.92)',
            border: '1px solid rgba(148,163,184,0.35)',
            borderRadius: '0.75rem',
            color: '#E2E8F0'
          }}
          itemStyle={{ color: '#E2E8F0' }}
        />
      </PieChart>
    </ResponsiveContainer>

    <div className="mt-3 grid grid-cols-3 gap-2">
      {data.map((entry) => (
        <div key={entry.name} className="rounded-xl border border-white/10 bg-slate-900/50 px-3 py-2 text-center">
          <p className="text-[11px] uppercase tracking-wider text-slate-400">{entry.name}</p>
          <p className="mt-1 text-sm font-semibold text-slate-100">{entry.value}%</p>
        </div>
      ))}
    </div>
  </div>
);
