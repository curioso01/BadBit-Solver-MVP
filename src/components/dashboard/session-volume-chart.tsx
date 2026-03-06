'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const volumeData = [
  { day: 'Seg', hands: 152 },
  { day: 'Ter', hands: 184 },
  { day: 'Qua', hands: 178 },
  { day: 'Qui', hands: 231 },
  { day: 'Sex', hands: 214 },
  { day: 'Sáb', hands: 167 },
  { day: 'Dom', hands: 205 }
];

export const SessionVolumeChart = (): JSX.Element => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={volumeData} margin={{ left: 4, right: 4, top: 12, bottom: 0 }}>
          <defs>
            <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" vertical={false} />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            dy={6}
          />
          <Tooltip
            cursor={{ stroke: 'rgba(56,189,248,0.35)', strokeWidth: 1 }}
            contentStyle={{
              backgroundColor: 'rgba(15,23,42,0.92)',
              border: '1px solid rgba(148,163,184,0.35)',
              borderRadius: '0.75rem',
              color: '#E2E8F0'
            }}
            labelStyle={{ color: '#CBD5E1' }}
          />
          <Area
            type="monotone"
            dataKey="hands"
            stroke="#38BDF8"
            strokeWidth={2.5}
            fill="url(#volumeGradient)"
            activeDot={{ r: 5, strokeWidth: 0, fill: '#7DD3FC' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
