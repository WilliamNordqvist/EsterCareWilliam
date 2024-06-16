'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getColumns } from '@/components/documentTable/columns';
import { DataTable } from '@/components/documentTable/dataTable';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { UploadDialogContent } from '@/components/uploadDialog';
import { useDocuments } from '@/context/documentContext';
import { getDocumentsService } from '@/services/getDocumentsService';

export default function Home() {
  const { documents, setDocuments } = useDocuments();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const columns = getColumns();

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
        className="mb-5  bg-[#5B1934] hover:bg-[#5B1934]"
        onClick={() => setIsDialogOpen(true)}
      >
        Upload File
      </Button>
      <Card className="p-3 w-[950px]">
        <DataTable data={documents} columns={columns} />
      </Card>

      <UploadDialogContent close={() => setIsDialogOpen(false)} />
    </Dialog>
  );
}
