'use client';

import { QueryClientProvider } from '@tanstack/react-query';

import { DocumentsProvider } from '@/context/documentContext';

import { queryClient } from '../../../lib/queryClient';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DocumentsProvider>
      <QueryClientProvider client={queryClient}>
        <div className="p-4">{children}</div>
      </QueryClientProvider>
    </DocumentsProvider>
  );
}
