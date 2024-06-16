import { AcceptedFiles } from '@/app/types';

import { Badge } from '../ui/badge';

type Props = {
  type: AcceptedFiles;
};

const mapTypes: Record<AcceptedFiles, string> = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpeg',
  'text/xml': 'xml',
  'application/xml': 'xml',
};

const typesColorSchema: Record<string, string> = {
  pdf: 'bg-black',
  jpeg: 'bg-blue-800',
  xml: 'bg-yellow-800',
};
export const TypeBadge = ({ type }: Props) => {
  const fileType = mapTypes[type];
  const colorClass = typesColorSchema[fileType] || 'bg-gray-500 text-white';

  return (
    <Badge className={`uppercase text-white ${colorClass}`}>{fileType}</Badge>
  );
};
