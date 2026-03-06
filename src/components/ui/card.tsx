import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div className={cn('glass rounded-2xl p-4', className)} {...props} />
);
