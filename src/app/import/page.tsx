'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function ImportPage(): JSX.Element {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (): Promise<void> => {
    const response = await fetch('/api/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rawText: text, source: 'PASTE' })
    });
    const data = (await response.json()) as { ok: boolean; platform: string };
    setMessage(data.ok ? `Importado com plataforma ${data.platform}` : 'Falha ao importar');
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-3">Importar Hand History</h1>
      <textarea className="w-full min-h-64 rounded-xl bg-slate-950/60 border border-white/10 p-3" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="flex gap-3 mt-3">
        <input
          type="file"
          accept=".txt"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const content = await file.text();
            setText(content);
          }}
        />
        <Button onClick={submit}>Processar</Button>
      </div>
      {message ? <p className="mt-2 text-sm text-mint">{message}</p> : null}
    </Card>
  );
}
