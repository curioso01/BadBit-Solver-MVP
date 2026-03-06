import { cn } from '@/lib/utils';
import type { ReplayAction, ReplayPlayer } from '@/types/replay';

type Props = { actions: ReplayAction[]; players: ReplayPlayer[]; currentActionIndex: number };

export const ActionTimeline = ({ actions, players, currentActionIndex }: Props): JSX.Element => (
  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
    {actions.map((action, index) => {
      const actor = players.find((player) => player.id === action.actorId);
      return (
        <div key={action.id} className={cn('rounded-xl border p-2 text-xs', index <= currentActionIndex ? 'border-electric/40 bg-electric/10' : 'border-white/10 bg-slate-900/40')}>
          <p className="font-medium">{action.street} • {actor?.name ?? action.actorId}</p>
          <p className="text-slate-300">{action.type}{action.amount ? ` ${action.amount}bb` : ''} · Pot {action.potAfterAction.toFixed(1)}bb</p>
        </div>
      );
    })}
  </div>
);
