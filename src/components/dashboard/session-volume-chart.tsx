'use client';

import { AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { day: 'Mon', hands: 86 },
  { day: 'Tue', hands: 121 },
  { day: 'Wed', hands: 97 },
  { day: 'Thu', hands: 143 },
  { day: 'Fri', hands: 172 },
  { day: 'Sat', hands: 110 },
  { day: 'Sun', hands: 133 }
];

export const SessionVolumeChart = (): JSX.Element => (
  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="handsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.7} />
            <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="day" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip />
        <Area type="monotone" dataKey="hands" stroke="#38BDF8" fill="url(#handsGradient)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
