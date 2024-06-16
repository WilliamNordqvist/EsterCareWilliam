/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';

import { FileRecord } from '@/app/types';
import { useDocuments } from '@/context/documentContext';
import { deleteService } from '@/services/deleteService';

import { Button } from '../ui/button';
import { DataTableColumnHeader } from '../ui/data-table-column-header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { TypeBadge } from './typeBadge';

export const getColumns = () => {
  const { setDocuments } = useDocuments();

  const { mutate: deleteFile } = useMutation({
    mutationFn: (id: number) => deleteService(id),
    onSuccess: (res) => setDocuments(res),
  });

  const columns: ColumnDef<FileRecord>[] = [
    {
      accessorKey: 'filetype',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => <TypeBadge type={row.original.filetype} />,
    },
    {
      accessorKey: 'filename',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Filename" />
      ),
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
    },
    {
      accessorKey: 'uploader',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Uploaded by" />
      ),
    },
    {
      accessorKey: 'date',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => (
        <span className="text-[#5B1934]">
          {moment(row.original.date).format('YYYY-MM-DD')}
        </span>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="" align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteFile(row.original.id)}
                className="cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
              <Link href={row.original.url} target="_blank">
                <DropdownMenuItem className="cursor-pointer">
                  Open
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
