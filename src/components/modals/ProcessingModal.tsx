
import { LoaderCircle } from 'lucide-react';

interface ProcessingModalProps {
  isOpen: boolean;
  progress: number;
  status: string;
}

export function ProcessingModal({ isOpen, progress, status }: ProcessingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10 text-primary">
            <LoaderCircle className="w-8 h-8 animate-spin" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Processando Relatório</h3>
          <p className="text-sm text-gray-500 mb-4">
            Estamos analisando o conteúdo e gerando seu relatório. Isso pode levar alguns instantes.
          </p>
          <div className="progress-bar mb-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400">{status}</p>
        </div>
      </div>
    </div>
  );
}
