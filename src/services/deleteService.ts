import { FileRecord } from "@/app/types";
import axios from "axios";

export const deleteService = async (id: number) => {
     const {data} = await axios.delete<FileRecord[]>(`/api/delete/${id}`);
     return data
  };
  
  