import { cn } from '@/lib/utils';
import type { PlayerStatus } from '@/types/replay';

const statusLabel: Record<PlayerStatus, string> = {
  active: 'ACTIVE',
  folded: 'FOLD',
  'all-in': 'ALL-IN',
  'sitting-out': 'SIT OUT'
};

export const PlayerBadge = ({ status }: { status: PlayerStatus }): JSX.Element => (
  <span
    className={cn(
      'text-[10px] uppercase tracking-wider rounded-full px-2 py-0.5 border',
      status === 'active' && 'text-mint border-mint/40 bg-mint/10',
      status === 'folded' && 'text-slate-400 border-slate-600 bg-slate-800/60',
      status === 'all-in' && 'text-amber-300 border-amber-500/60 bg-amber-500/20',
      status === 'sitting-out' && 'text-purple-300 border-purple-500/50 bg-purple-500/20'
    )}
  >
    {statusLabel[status]}
  </span>
);
