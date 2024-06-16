import axios from 'axios';

import { FileRecord } from '@/app/types';

export const deleteService = async (id: number) => {
  const { data } = await axios.delete<FileRecord[]>(`/api/delete/${id}`);
  return data;
};
