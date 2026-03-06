import { cn } from '@/lib/utils';
import type { MatrixCell, RangeAction } from '@/types/replay';

const actionStyles: Record<RangeAction, string> = {
  RAISE: 'bg-electric/30 text-electric border-electric/40',
  CALL: 'bg-mint/25 text-mint border-mint/40',
  FOLD: 'bg-slate-800 text-slate-400 border-slate-700',
  '3BET': 'bg-purple-500/30 text-purple-200 border-purple-400/40'
};

export const RangeMatrix = ({ matrix }: { matrix: MatrixCell[] }): JSX.Element => (
  <div className="space-y-3">
    <div className="grid grid-cols-4 gap-2 text-xs">
      {(['RAISE', 'CALL', '3BET', 'FOLD'] as RangeAction[]).map((label) => (
        <span key={label} className={cn('rounded-lg px-2 py-1 border text-center', actionStyles[label])}>{label}</span>
      ))}
    </div>
    <div className="grid grid-cols-13 gap-1 rounded-xl bg-slate-950/70 p-2 border border-white/10">
      {matrix.map((cell) => (
        <div key={cell.combo} title={`${cell.combo} • ${cell.action} • ${Math.round(cell.weight * 100)}%`} className={cn('h-7 rounded border text-[10px] flex items-center justify-center font-medium', actionStyles[cell.action])}>
          {cell.combo}
        </div>
      ))}
    </div>
  </div>
);
