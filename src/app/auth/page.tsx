'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useLocale } from '@/hooks/use-locale';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function AuthPage(): JSX.Element {
  const router = useRouter();
  const { dictionary } = useLocale();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = async (): Promise<void> => {
    setError(null);
    const fn = isSignup ? supabase.auth.signUp : supabase.auth.signInWithPassword;
    const { error: authError } = await fn({ email, password });
    if (authError) {
      setError(authError.message);
      return;
    }
    router.push('/onboarding');
  };

  return (
    <section className="grid place-items-center min-h-[70vh]">
      <Card className="max-w-md w-full space-y-4">
        <h1 className="text-2xl font-semibold text-center">{dictionary.auth.title}</h1>
        <Input placeholder={dictionary.auth.email} value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder={dictionary.auth.password} value={password} onChange={(e) => setPassword(e.target.value)} />
        {error ? <p className="text-red-400 text-sm">{error}</p> : null}
        <Button onClick={submit} className="w-full">{isSignup ? dictionary.auth.signup : dictionary.auth.login}</Button>
        <Button onClick={() => setIsSignup((s) => !s)} className="w-full bg-mint/20 text-mint border-mint/40">
          {isSignup ? dictionary.auth.login : dictionary.auth.signup}
        </Button>
      </Card>
    </section>
  );
}
