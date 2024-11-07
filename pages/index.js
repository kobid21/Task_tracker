// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /login
    router.push('/login');
  }, [router]);

  return null; // You can return nothing since it's just redirecting
}
