import axios from 'axios';

import { FileRecord } from '@/app/types';

export const uploadFileService = async (formData: FormData) => {
  const { data } = await axios.post<FileRecord[]>('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
