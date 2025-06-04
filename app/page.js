'use client'
import Image from "next/image";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/signin'); // Using the new Next.js router
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]); // Only run when router changes
 
  return (
    <div className="flex items-center justify-center min-h-screen p-5 pb-20 sm:p-20">
      <main>
    
        <Image
          className="dark:invert"
          src="/logo.svg"
          alt="Next.js logo"
          width={600}
          height={400}
          priority
        />
        
      </main>
    </div>
  );
}