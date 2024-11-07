// pages/_app.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../styles/styles.css'; // Add this line

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (!isAuthenticated && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [router.pathname]);

  return <Component {...pageProps} />;
}

export default MyApp;
