import axios from 'axios';

import { FileRecord } from '@/app/types';

export const getDocumentsService = async () => {
  const { data } = await axios<FileRecord[]>('/api/getDocuments');
  return data;
};
