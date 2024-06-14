import { FileRecord } from "@/app/types";
import axios from "axios";

export const getDocumentsService = async () => {
    const {data} = await axios<FileRecord[]>('/api/getDocuments');
    return data;
  };
  
  