import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Trend = 'up' | 'down' | 'neutral';

type KpiCardProps = {
  label: string;
  value: string;
  hint: string;
  trend?: Trend;
  accent: string;
};

const trendLabel: Record<Trend, string> = {
  up: '↑',
  down: '↓',
  neutral: '•'
};

export const KpiCard = ({ label, value, hint, trend = 'neutral', accent }: KpiCardProps): JSX.Element => {
  return (
    <Card className="relative overflow-hidden border border-white/10 bg-slate-900/70 p-5 shadow-[0_20px_60px_-30px_rgba(56,189,248,0.55)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-25 blur-2xl"
        style={{ backgroundColor: accent }}
      />

      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-50">{value}</p>

      <p
        className={cn(
          'mt-3 inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
          trend === 'up' && 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300',
          trend === 'down' && 'border-rose-400/35 bg-rose-500/10 text-rose-200',
          trend === 'neutral' && 'border-sky-400/25 bg-sky-500/10 text-sky-200'
        )}
      >
        {trendLabel[trend]} {hint}
      </p>
    </Card>
  );
};
