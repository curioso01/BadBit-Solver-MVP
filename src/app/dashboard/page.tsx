import { ActionFrequencyChart } from '@/components/charts/action-frequency-chart';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { SessionVolumeChart } from '@/components/dashboard/session-volume-chart';
import { Card } from '@/components/ui/card';

const stats = [
  {
    label: 'Mãos importadas',
    value: '1,248',
    hint: '+12% vs semana passada',
    trend: 'up' as const,
    accent: '#22D3EE'
  },
  {
    label: 'Sessões',
    value: '26',
    hint: '+3 novas sessões',
    trend: 'up' as const,
    accent: '#818CF8'
  },
  {
    label: 'Plataformas',
    value: '2',
    hint: 'GGPoker + UNKNOWN',
    trend: 'neutral' as const,
    accent: '#F59E0B'
  },
  {
    label: 'Spot frequente',
    value: 'BTN vs BB SRP',
    hint: '24.6% das mãos',
    trend: 'down' as const,
    accent: '#F43F5E'
  }
];

export default function DashboardPage(): JSX.Element {
  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-7 shadow-[0_30px_80px_-45px_rgba(56,189,248,0.8)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-indigo-400/20 blur-3xl" />

        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">Dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-50">Performance Overview</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Visão consolidada das últimas sessões com leitura rápida de frequência de ação, volume semanal e leaks
          prioritários.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <KpiCard key={s.label} label={s.label} value={s.value} hint={s.hint} trend={s.trend} accent={s.accent} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-3 border border-white/10 bg-slate-900/65 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-100">Volume semanal de mãos</h3>
              <p className="mt-1 text-xs text-slate-400">Comparativo diário das últimas 7 sessões</p>
            </div>
            <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200">
              1,331 mãos
            </span>
          </div>
          <SessionVolumeChart />
        </Card>

        <Card className="xl:col-span-2 border border-white/10 bg-slate-900/65 p-5">
          <h3 className="text-base font-semibold text-slate-100">Taxa fold / call / raise</h3>
          <p className="mb-3 mt-1 text-xs text-slate-400">Distribuição agregada em potes single-raised</p>
          <ActionFrequencyChart />
        </Card>
      </div>

      <Card className="border border-white/10 bg-slate-900/65 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-100">Leak Finder MVP</h3>
          <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-200">
            2 alertas críticos
          </span>
        </div>

        <ul className="grid gap-3 md:grid-cols-2">
          <li className="rounded-xl border border-rose-400/25 bg-rose-500/10 p-3 text-sm text-rose-100">
            ⚠️ Overfold em c-bet turn (66%)
          </li>
          <li className="rounded-xl border border-amber-400/25 bg-amber-500/10 p-3 text-sm text-amber-100">
            ⚠️ Raise frequency baixa no flop IP
          </li>
          <li className="rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-3 text-sm text-emerald-100">
            ✅ Boa defesa em 3bet pot OOP
          </li>
          <li className="rounded-xl border border-sky-400/25 bg-sky-500/10 p-3 text-sm text-sky-100">
            ℹ️ Multiway elevado em blinds (monitorar)
          </li>
        </ul>
      </Card>
    </section>
  );
}
