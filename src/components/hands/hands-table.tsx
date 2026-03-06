'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';

type HandRow = { id: string; date: string; table: string; blinds: string; heroCards: string; result: string };

const rows: HandRow[] = [
  { id: '1', date: new Date().toISOString(), table: 'Final Table 9-max', blinds: '500/1000', heroCards: 'As Kh', result: '+12.5bb' },
  { id: '2', date: new Date(Date.now() - 3600000).toISOString(), table: 'Mid Stages', blinds: '200/400', heroCards: 'Qd Qh', result: '-4.2bb' }
];

export const HandsTable = (): JSX.Element => {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => rows.filter((r) => r.table.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <div className="space-y-3">
      <Input placeholder="Buscar torneio/mesa" value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="overflow-x-auto glass rounded-2xl">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-400">
            <tr><th className="p-3">Data</th><th>Mesa</th><th>Blinds</th><th>Hero</th><th>Resultado</th></tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-t border-white/10 hover:bg-white/5">
                <td className="p-3"><Link href={`/hands/${row.id}`}>{new Intl.DateTimeFormat(undefined, { dateStyle: 'short', timeStyle: 'short' }).format(new Date(row.date))}</Link></td>
                <td>{row.table}</td><td>{row.blinds}</td><td>{row.heroCards}</td><td>{row.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-400">Paginação MVP: página 1 de 1</p>
    </div>
  );
};
