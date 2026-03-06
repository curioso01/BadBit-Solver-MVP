import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PlayerBadge } from './player-badge';
import type { ReplayPlayer } from '@/types/replay';

type SeatProps = {
  player: ReplayPlayer;
  isActing: boolean;
  coordinates: { top: string; left: string };
};

export const Seat = ({ player, isActing, coordinates }: SeatProps): JSX.Element => (
  <motion.div
    style={coordinates}
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: player.status === 'folded' ? 0.6 : 1, scale: isActing ? 1.04 : 1 }}
    transition={{ duration: 0.28 }}
    className={cn(
      'absolute -translate-x-1/2 -translate-y-1/2 w-36 rounded-2xl border p-2 bg-slate-900/70 backdrop-blur-lg',
      player.isHero ? 'border-electric/70 shadow-[0_0_30px_rgba(56,189,248,0.25)]' : 'border-white/10',
      isActing && 'ring-2 ring-mint/60'
    )}
  >
    <div className="flex items-center justify-between gap-2">
      <p className="text-xs font-semibold truncate">{player.name}</p>
      <PlayerBadge status={player.status} />
    </div>
    <p className="text-[11px] text-slate-400 mt-1">{player.position} • {player.stack.toFixed(1)}bb</p>
    {player.cards ? (
      <motion.div initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-2 flex gap-1">
        {player.cards.map((card) => <span key={card} className="rounded-md px-1.5 py-0.5 text-xs bg-slate-800 border border-white/10">{card}</span>)}
      </motion.div>
    ) : null}
  </motion.div>
);
