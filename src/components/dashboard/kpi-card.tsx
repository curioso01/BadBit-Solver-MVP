import { cn } from '@/lib/utils';

type Props = { label: string; value: string; trend?: string; highlight?: boolean };

export const KpiCard = ({ label, value, trend, highlight }: Props): JSX.Element => (
  <div className={cn('rounded-2xl border p-4 bg-slate-900/60 backdrop-blur-xl', highlight ? 'border-electric/50 shadow-[0_0_28px_rgba(56,189,248,0.2)]' : 'border-white/10')}>
    <p className="text-xs uppercase tracking-[0.15em] text-slate-400">{label}</p>
    <p className="text-3xl font-semibold mt-3">{value}</p>
    {trend ? <p className="text-sm mt-2 text-mint">{trend}</p> : null}
  </div>
);
