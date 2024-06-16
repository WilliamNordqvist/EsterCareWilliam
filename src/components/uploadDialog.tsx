import { useMutation } from '@tanstack/react-query';
import { CircleX } from 'lucide-react';
import { LoaderCircle } from 'lucide-react';
import React, { useState } from 'react';

import { useDocuments } from '@/context/documentContext';
import { uploadFileService } from '@/services/uploadService';

import { FileUploadInput } from './fileUploadInput';
import { Button } from './ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

type Props = {
  close: () => void;
};

export const UploadDialogContent = ({ close }: Props) => {
  const { setDocuments } = useDocuments();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [uploader, setUploader] = useState<string>('');

  const {
    mutate: upLoadFile,
    reset: resetUploadFile,
    isPending: upLoadFileLoading,
  } = useMutation({
    mutationFn: (formData: FormData) => uploadFileService(formData),
    onSuccess: (res) => {
      setUploadedFile(null);
      setUploadedFileName('');
      setDescription('');
      setUploader('');
      resetUploadFile();
      setDocuments(res);
      close();
    },
    onError: (error: Error) => alert('Error uploading ' + error.message),
  });

  const onFileUpload = (file: File) => {
    setUploadedFile(file);
    setUploadedFileName(file.name);
  };

  const onSave = () => {
    if (!uploadedFile) return;
    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('description', description);
    formData.append('fileName', uploadedFileName);
    formData.append('uploader', uploader);
    upLoadFile(formData);
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <button
        className="absolute top-3 right-3"
        onClick={() => {
          setUploadedFile(null);
          setUploadedFileName('');
          resetUploadFile();
          close();
        }}
      >
        <CircleX className="text-[#5B1934]" />
      </button>

      <DialogHeader>
        <DialogTitle className="text-[#5B1934]">Upload File</DialogTitle>
        <DialogDescription>
          Please upload your files here. You can select files with the following
          formats: XML, PDF, and JPEG. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <FileUploadInput onFileUpload={onFileUpload} />
      <Label className="mt-5">File Name</Label>
      <Input
        disabled={!uploadedFile}
        value={uploadedFileName}
        onChange={(e) => setUploadedFileName(e.target.value)}
        placeholder="No file selected"
      />
      <Label>Description</Label>
      <Input
        value={description}
        disabled={!uploadedFile}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a description"
        maxLength={200}
      />
      <Label>Uploader Name</Label>
      <Input
        value={uploader}
        disabled={!uploadedFile}
        onChange={(e) => setUploader(e.target.value)}
        placeholder="Enter name"
      />

      <DialogFooter>
        <Button
          disabled={!uploadedFile}
          className="bg-[#5B1934] hover:bg-[#5B1934] w-[120px]"
          onClick={onSave}
        >
          {upLoadFileLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            'Save changes'
          )}
        </Button>
        <Button
          disabled={!uploadedFile}
          className="bg-red-800 hover:bg-red-800"
          onClick={() => {
            setUploadedFile(null);
            setUploadedFileName('No file selected');
          }}
        >
          Remove file
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
