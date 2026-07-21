"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedAdmin({ children }) {
  const router = useRouter();
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('vorixa-admin-token');
    if (!token) {
      setBlocked(true);
      router.replace('/login');
    }
  }, [router]);

  return blocked ? null : <>{children}</>;
}
