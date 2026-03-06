import { motion, AnimatePresence } from 'framer-motion';

export const BoardCards = ({ cards }: { cards: string[] }): JSX.Element => (
  <div className="flex items-center justify-center gap-2 mt-3">
    <AnimatePresence>
      {cards.map((card) => (
        <motion.div
          key={card}
          initial={{ y: -20, opacity: 0, rotate: -6 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }}
          className="h-10 w-8 rounded-md bg-slate-100 text-slate-900 text-sm font-bold grid place-items-center"
        >
          {card}
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);
