import { Card } from '@/components/ui/card';
import { ActionFrequencyChart } from '@/components/charts/action-frequency-chart';

const stats = [
  { label: 'Mãos importadas', value: '1,248' },
  { label: 'Sessões', value: '26' },
  { label: 'Plataformas', value: 'GGPoker / UNKNOWN' },
  { label: 'Spot frequente', value: 'BTN vs BB SRP' }
];

export default function DashboardPage(): JSX.Element {
  return (
    <section className="grid gap-4">
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <p className="text-xs text-slate-400">{s.label}</p>
            <p className="text-2xl mt-2 font-semibold">{s.value}</p>
          </Card>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <h3 className="font-semibold mb-2">Taxa fold/call/raise</h3>
          <ActionFrequencyChart />
        </Card>
        <Card>
          <h3 className="font-semibold mb-3">Leak Finder MVP</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>⚠️ Overfold em c-bet turn (66%)</li>
            <li>⚠️ Raise frequency baixa no flop IP</li>
            <li>✅ Boa defesa em 3bet pot OOP</li>
            <li>Flag: multiway elevado em blinds</li>
          </ul>
        </Card>
      </div>
    </section>
  );
}
