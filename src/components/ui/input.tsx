import { cn } from '@/lib/utils';
import type { InputHTMLAttributes } from 'react';

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>): JSX.Element => (
  <input className={cn('w-full rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-sm', className)} {...props} />
);
