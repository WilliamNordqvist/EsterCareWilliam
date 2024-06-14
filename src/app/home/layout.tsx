'use client';

import { DocumentsProvider } from '@/context/documentContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../../lib/queryClient';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DocumentsProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </DocumentsProvider>
  );
}
