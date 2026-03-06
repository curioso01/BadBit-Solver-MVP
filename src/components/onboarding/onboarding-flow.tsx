'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/hooks/use-locale';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const OnboardingFlow = (): JSX.Element => {
  const router = useRouter();
  const { dictionary } = useLocale();
  const [index, setIndex] = useState(0);
  const steps = dictionary.onboarding.steps;

  const finish = (): void => {
    localStorage.setItem('badbit.onboarding_completed', '1');
    router.push('/dashboard');
  };

  return (
    <Card className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">{dictionary.onboarding.title}</h1>
      <motion.div key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-semibold">{steps[index].title}</h2>
        <p className="text-slate-300 mt-2">{steps[index].description}</p>
      </motion.div>
      <div className="flex gap-3 mt-6">
        <Button onClick={() => setIndex((v) => Math.max(0, v - 1))} disabled={index === 0}>{dictionary.onboarding.back}</Button>
        {index < steps.length - 1 ? (
          <Button onClick={() => setIndex((v) => v + 1)}>{dictionary.onboarding.next}</Button>
        ) : (
          <Button onClick={finish}>{dictionary.onboarding.start}</Button>
        )}
        <Button onClick={finish} className="ml-auto bg-transparent text-slate-300 border-slate-600">{dictionary.onboarding.skip}</Button>
      </div>
    </Card>
  );
};
