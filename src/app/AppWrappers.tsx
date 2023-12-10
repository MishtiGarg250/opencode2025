'use client';
import React, { ReactNode } from 'react';
import 'styles/App.css';
import 'styles/Contact.css';
import 'styles/MiniCalendar.css';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';
import theme from '../theme/theme';
import { AuthProvider } from 'contexts/AuthContext';

import {
 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function AppWrappers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>


    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>{' '}
    </CacheProvider>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}

    </QueryClientProvider></AuthProvider>
  );
}
