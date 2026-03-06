import { motion } from 'framer-motion';
import { BoardCards } from './board-cards';
import { PotDisplay } from './pot-display';
import { Seat } from './seat';
import type { ReplayPlayer } from '@/types/replay';

const seatCoordinates = [
  { top: '9%', left: '50%' },
  { top: '16%', left: '75%' },
  { top: '32%', left: '90%' },
  { top: '58%', left: '92%' },
  { top: '82%', left: '78%' },
  { top: '90%', left: '50%' },
  { top: '82%', left: '22%' },
  { top: '58%', left: '8%' },
  { top: '32%', left: '10%' }
];

type Props = {
  players: ReplayPlayer[];
  boardCards: string[];
  pot: number;
  actingPlayerId?: string;
};

export const PokerTable = ({ players, boardCards, pot, actingPlayerId }: Props): JSX.Element => (
  <div className="relative min-h-[640px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950">
    <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} className="absolute inset-[12%] rounded-full bg-gradient-to-b from-emerald-600/30 to-emerald-950/50 border border-mint/30" />

    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-2">
      <PotDisplay pot={pot} />
      <BoardCards cards={boardCards} />
    </div>

    {players.map((player, index) => (
      <Seat key={player.id} player={player} isActing={actingPlayerId === player.id} coordinates={seatCoordinates[index]} />
    ))}
  </div>
);
