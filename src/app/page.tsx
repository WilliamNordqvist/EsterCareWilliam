'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
// import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    router.refresh();
    console.log(res);
  };

  return (
    <div className="w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/landing.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <Card className="mx-auto grid w-[450px] gap-6 px-12 py-10 bg-[#5B1934]">
          <div className="grid gap-2 text-center text-[#ede7e1]">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="text-[#ede7e1]" htmlFor="email">
                Email
              </Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-[#ede7e1]" htmlFor="password">
                Password
              </Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                required
              />
            </div>
            <Button onClick={handleSignIn} className="w-full" type="submit">
              Login
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
