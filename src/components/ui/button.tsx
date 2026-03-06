import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

export const Button = ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => (
  <button
    className={cn('rounded-xl px-4 py-2 font-medium transition bg-electric/20 text-electric border border-electric/40 hover:bg-electric/35 disabled:opacity-50', className)}
    {...props}
  />
);
