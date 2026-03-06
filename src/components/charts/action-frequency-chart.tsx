'use client';

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Fold', value: 43, color: '#64748B' },
  { name: 'Call', value: 34, color: '#38BDF8' },
  { name: 'Raise', value: 23, color: '#34D399' }
];

export const ActionFrequencyChart = (): JSX.Element => (
  <div className="h-56">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
          {data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);
