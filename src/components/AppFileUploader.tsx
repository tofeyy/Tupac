
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, FileCheck, X } from 'lucide-react';

interface AppFileUploaderProps {
  label: string;
  currentFile?: File;
  fileName?: string;
  onFileSelect: (file: File | null, fileName?: string) => void;
}

const AppFileUploader: React.FC<AppFileUploaderProps> = ({
  label,
  currentFile,
  fileName,
  onFileSelect
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    // Check if file is APK or other app file
    const allowedTypes = ['.apk', '.ipa', '.exe', '.msi', '.deb', '.rpm'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      alert('الرجاء اختيار ملف تطبيق صحيح (APK, IPA, EXE, MSI, DEB, RPM)');
      return;
    }

    onFileSelect(file, file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeFile = () => {
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      
      {currentFile || fileName ? (
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <FileCheck className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">
                {currentFile?.name || fileName}
              </p>
              {currentFile && (
                <p className="text-sm text-green-600">
                  {formatFileSize(currentFile.size)}
                </p>
              )}
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-red-600 hover:text-red-800 hover:bg-red-50"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            اسحب ملف التطبيق هنا
          </p>
          <p className="text-sm text-gray-500 mb-4">
            أو انقر لاختيار ملف من جهازك
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            اختيار ملف
          </Button>
          <p className="text-xs text-gray-400 mt-2">
            الملفات المدعومة: APK, IPA, EXE, MSI, DEB, RPM
          </p>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".apk,.ipa,.exe,.msi,.deb,.rpm"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileSelect(file);
          }
        }}
      />
    </div>
  );
};

export default AppFileUploader;
