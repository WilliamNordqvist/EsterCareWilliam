import React, { ReactNode, createContext, useContext, useState } from 'react';

import { FileRecord } from '@/app/types';

type DocumentsContextType = {
  documents: FileRecord[];
  setDocuments: (documents: FileRecord[]) => void;
};

const DocumentsContext = createContext<DocumentsContextType>({
  documents: [],
  setDocuments: () => {},
});

export const DocumentsProvider = ({ children }: { children: ReactNode }) => {
  const [documents, setDocuments] = useState<FileRecord[]>([]);

  return (
    <DocumentsContext.Provider value={{ documents, setDocuments }}>
      {children}
    </DocumentsContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentsContext);
  return context;
};
