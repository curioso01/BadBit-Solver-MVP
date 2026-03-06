'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const streets = ['PREFLOP', 'FLOP', 'TURN', 'RIVER'] as const;

export default function ReplayPage(): JSX.Element {
  const [street, setStreet] = useState<(typeof streets)[number]>('PREFLOP');

  return (
    <section className="grid lg:grid-cols-[1fr_320px] gap-4">
      <Card className="min-h-[520px] relative overflow-hidden">
        <div className="absolute inset-8 rounded-full border border-mint/40 bg-gradient-to-b from-emerald-500/20 to-slate-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-xs uppercase tracking-widest text-slate-400">{street}</p>
          <p className="text-3xl font-bold mt-2">Pot 14.2bb</p>
          <p className="text-mint mt-2">Board: Ah 7d 2c</p>
        </div>
        <div className="absolute left-6 top-10">Hero (BTN) - 32bb</div>
        <div className="absolute right-6 top-20">BB - 44bb</div>
        <div className="absolute right-10 bottom-14">SB - 27bb</div>
      </Card>
      <Card>
        <h2 className="font-semibold">Replay Summary</h2>
        <div className="mt-3 space-y-2 text-sm text-slate-300">
          <p>Showdown: Hero shows As Kh</p>
          <p>Resultado: +12.5bb</p>
          <p>Blinds: 500/1000 ante 100</p>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {streets.map((s) => <Button key={s} onClick={() => setStreet(s)} className={street === s ? '' : 'bg-transparent text-slate-300 border-slate-600'}>{s}</Button>)}
        </div>
        <div className="flex gap-2 mt-4">
          <Button>Previous hand</Button>
          <Button>Next hand</Button>
        </div>
      </Card>
    </section>
  );
}
