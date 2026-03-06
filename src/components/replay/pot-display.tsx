import { motion } from 'framer-motion';

export const PotDisplay = ({ pot }: { pot: number }): JSX.Element => (
  <motion.div key={pot} initial={{ scale: 0.94, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
    <p className="text-xs uppercase text-slate-400 tracking-[0.2em]">Pot</p>
    <p className="text-3xl font-semibold text-mint">{pot.toFixed(1)}bb</p>
  </motion.div>
);
