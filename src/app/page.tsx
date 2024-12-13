'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
export default function Home({}) {

  useEffect(() => {
    if (localStorage.getItem('token')) {
      redirect('/user/home');
    } else {
      redirect('/auth/sign-in');
    }
  }, []);
}
