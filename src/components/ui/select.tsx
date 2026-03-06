import { cn } from '@/lib/utils';
import type { SelectHTMLAttributes } from 'react';

export const Select = ({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>): JSX.Element => (
  <select
    className={cn(
      'w-full rounded-xl bg-slate-950/70 border border-white/10 px-3 py-2 text-sm text-slate-100',
      'focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric/60',
      'max-h-72',
      className
    )}
    {...props}
  />
);
