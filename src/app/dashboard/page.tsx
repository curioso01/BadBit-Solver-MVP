import { ActionFrequencyChart } from '@/components/charts/action-frequency-chart';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { SessionVolumeChart } from '@/components/dashboard/session-volume-chart';
import { Card } from '@/components/ui/card';

const leaks = [
  { title: 'Overfold turn vs delayed c-bet', detail: '66% fold em spots BTN vs BB (target <= 51%).', severity: 'high' },
  { title: '3-bet out of position baixo', detail: 'SB/BB 3-bet total 4.8% (target ~7-9%).', severity: 'medium' },
  { title: 'Multiway sem squeeze', detail: 'Apenas 9% squeeze em spots com dead money.', severity: 'medium' }
];

export default function DashboardPage(): JSX.Element {
  return (
    <section className="space-y-5">
      <header className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-electric">BADBIT SOLVER</p>
        <h1 className="text-3xl font-semibold mt-2">Poker Analytics Command Center</h1>
        <p className="text-slate-300 mt-2 max-w-2xl">Acompanhe volume, frequência de ações e leaks mais críticos em uma visão otimizada para decisões rápidas.</p>
      </header>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label="Mãos importadas" value="12,481" trend="+14.2% nos últimos 7 dias" highlight />
        <KpiCard label="Sessões" value="126" trend="Média 3.1h por sessão" />
        <KpiCard label="Winrate" value="+4.8bb/100" trend="Evolução consistente" />
        <KpiCard label="Spots mapeados" value="42" trend="BTN vs BB lidera volume" />
      </div>

      <div className="grid xl:grid-cols-[1.4fr_1fr] gap-4">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-lg">Volume de mãos por dia</h2>
            <span className="text-xs text-slate-400">Últimos 7 dias</span>
          </div>
          <SessionVolumeChart />
        </Card>
        <Card>
          <h2 className="font-semibold text-lg mb-3">Mix fold/call/raise</h2>
          <ActionFrequencyChart />
        </Card>
      </div>

      <div className="grid xl:grid-cols-[1fr_1fr] gap-4">
        <Card>
          <h3 className="font-semibold text-lg mb-3">Leak Finder Prioritário</h3>
          <div className="space-y-3">
            {leaks.map((leak) => (
              <div key={leak.title} className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{leak.title}</p>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full border ${leak.severity === 'high' ? 'text-rose-300 border-rose-500/50 bg-rose-500/20' : 'text-amber-200 border-amber-400/50 bg-amber-400/20'}`}>
                    {leak.severity === 'high' ? 'Alta prioridade' : 'Média prioridade'}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mt-2">{leak.detail}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-lg mb-3">Quick Insights</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="rounded-xl border border-white/10 bg-slate-950/50 p-3">Seu EV pós-flop cresce quando c-bet flop fica entre 56%-64%.</li>
            <li className="rounded-xl border border-white/10 bg-slate-950/50 p-3">Defesa BB vs min-open está acima da média: +2.1bb/100 no spot.</li>
            <li className="rounded-xl border border-white/10 bg-slate-950/50 p-3">Em 3-bet pots IP, o turn barrel está subutilizado (34%).</li>
          </ul>
        </Card>
      </div>
    </section>
  );
}
