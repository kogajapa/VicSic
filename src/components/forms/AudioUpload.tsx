
import { useState, useRef } from 'react';
import { UploadCloud, FileMusic, X } from 'lucide-react';

interface AudioUploadProps {
  onFileSelect: (file: File) => void;
}

export function AudioUpload({ onFileSelect }: AudioUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    // Check file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert('O arquivo é muito grande. O tamanho máximo permitido é 100MB.');
      return;
    }

    setUploadedFile(file);
    
    // Create audio URL if it's an audio file
    if (file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
    
    onFileSelect(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  if (uploadedFile) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
            <FileMusic className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{uploadedFile.name}</p>
            <p className="text-xs text-gray-500">{formatFileSize(uploadedFile.size)}</p>
          </div>
          <button
            onClick={removeFile}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {audioUrl && (
          <div>
            <audio controls className="w-full">
              <source src={audioUrl} />
            </audio>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`drag-area rounded-lg flex flex-col items-center justify-center p-8 cursor-pointer border-2 border-dashed transition-all ${
        dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
        <UploadCloud className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">Arraste e solte o arquivo aqui</h3>
      <p className="text-sm text-gray-500 mb-4">ou clique para selecionar um arquivo</p>
      <p className="text-xs text-gray-400">Formatos suportados: MP4, PDF, TXT (máx. 100MB)</p>
      <input
        ref={fileInputRef}
        type="file"
        accept=".mp4,.pdf,.txt,audio/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
