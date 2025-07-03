
import { Check, FileText } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onViewReport: () => void;
}

export function SuccessModal({ isOpen, onViewReport }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Relatório Gerado com Sucesso</h3>
          <p className="text-sm text-gray-500 mb-6">
            Seu relatório foi processado e está pronto para visualização.
          </p>
          <button
            onClick={onViewReport}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors flex items-center justify-center mx-auto"
          >
            <FileText className="w-5 h-5 mr-2" />
            <span>Visualizar Relatório</span>
          </button>
        </div>
      </div>
    </div>
  );
}
