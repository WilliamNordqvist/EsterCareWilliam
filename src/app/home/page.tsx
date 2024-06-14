'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { UploadDialogContent } from '@/components/uploadDialog';
import { getDocumentsService } from '@/services/getDocumentsService';
import { useDocuments } from '@/context/documentContext';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { documents, setDocuments } = useDocuments();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ['documents'],
    queryFn: getDocumentsService,
  });

  useEffect(() => {
    if (data) {
      setDocuments(data);
    }
  }, [data]);

  return (
    <Dialog open={isDialogOpen}>
      <Button
        className="bg-[#5B1934] hover:bg-[#5B1934]"
        onClick={() => setIsDialogOpen(true)}
      >
        Upload File
      </Button>
      <UploadDialogContent close={() => setIsDialogOpen(false)} />
    </Dialog>
  );
}
