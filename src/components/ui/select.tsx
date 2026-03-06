import { cn } from '@/lib/utils';
import type { SelectHTMLAttributes } from 'react';

export const Select = ({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>): JSX.Element => (
  <select className={cn('w-full rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-sm', className)} {...props} />
);
