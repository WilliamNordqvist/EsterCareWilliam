export type AcceptedFiles =
  | 'application/pdf'
  | 'image/jpeg'
  | 'text/xml'
  | 'application/xml';
export type FileRecord = {
  id: number;
  filename: string;
  description: string;
  date: Date;
  filetype: AcceptedFiles;
  url: string;
  uploader: string;
};
