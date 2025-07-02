
import { useState, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PatientDropdown } from '@/components/forms/PatientDropdown';
import { ConsultTypeDropdown } from '@/components/forms/ConsultTypeDropdown';
import { AudioUpload } from '@/components/forms/AudioUpload';
import { TextEditor } from '@/components/forms/TextEditor';
import { ProcessingModal } from '@/components/modals/ProcessingModal';
import { SuccessModal } from '@/components/modals/SuccessModal';
import { ReportPreview } from '@/components/reports/ReportPreview';
import { FilePlus, ArrowLeft, FileText, Save, Mail, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Patient {
  id: string;
  name: string;
}

export default function NovoRelatorio() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedConsultType, setSelectedConsultType] = useState<string | null>(null);
  const [consultDate, setConsultDate] = useState('2025-07-01T14:00');
  const [activeTab, setActiveTab] = useState<'audio' | 'text'>('audio');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('Digite ou cole o texto da consulta aqui...');
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');
  const reportPreviewRef = useRef<HTMLDivElement>(null);

  const validateForm = () => {
    if (!selectedPatient) {
      alert('Por favor, selecione um paciente antes de processar o relatório.');
      return false;
    }

    if (!selectedConsultType) {
      alert('Por favor, selecione o tipo de consulta antes de processar o relatório.');
      return false;
    }

    if (activeTab === 'audio') {
      if (!uploadedFile) {
        alert('Por favor, faça upload de um arquivo de áudio antes de processar o relatório.');
        return false;
      }
    } else {
      if (textContent.trim() === '' || textContent === 'Digite ou cole o texto da consulta aqui...') {
        alert('Por favor, insira o texto da consulta antes de processar o relatório.');
        return false;
      }
    }

    return true;
  };

  const processReport = () => {
    if (!validateForm()) return;

    setShowProcessingModal(true);
    setProcessingProgress(0);

    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        const newProgress = prev + 5;
        
        if (newProgress <= 30) {
          setProcessingStatus('Analisando conteúdo...');
        } else if (newProgress <= 60) {
          setProcessingStatus('Identificando informações clínicas...');
        } else if (newProgress <= 90) {
          setProcessingStatus('Estruturando relatório...');
        } else {
          setProcessingStatus('Finalizando...');
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowProcessingModal(false);
            setShowSuccessModal(true);
          }, 500);
        }

        return newProgress;
      });
    }, 200);
  };

  const viewReport = () => {
    setShowSuccessModal(false);
    setShowReportPreview(true);
    setTimeout(() => {
      reportPreviewRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSaveDraft = (button: HTMLButtonElement) => {
    const originalText = button.textContent;
    button.textContent = 'Salvando...';
    button.disabled = true;
    
    setTimeout(() => {
      button.textContent = 'Salvo!';
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1500);
    }, 1000);
  };

  const handleFinalizeReport = (button: HTMLButtonElement) => {
    if (!showReportPreview) {
      alert('Por favor, processe o relatório antes de finalizá-lo.');
      return;
    }

    const originalText = button.textContent;
    button.textContent = 'Finalizando...';
    button.disabled = true;
    
    setTimeout(() => {
      button.textContent = 'Finalizado!';
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        alert('Relatório finalizado com sucesso!');
      }, 1500);
    }, 1000);
  };

  return (
    <Layout title="Novo Relatório">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center">
            <FilePlus className="w-7 h-7 mr-2 text-primary" />
            Relatório Completo
          </h1>
          <p className="text-muted-foreground mt-1">
            Crie um relatório detalhado a partir de áudio ou texto da consulta
          </p>
        </div>
        <Link
          to="/"
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Voltar</span>
        </Link>
      </div>

      {/* Informações Básicas */}
      <div className="bg-card rounded-lg shadow-sm p-6 border border-border mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Informações Básicas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Paciente</label>
            <PatientDropdown
              selectedPatient={selectedPatient}
              onSelect={setSelectedPatient}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Tipo de Consulta</label>
            <ConsultTypeDropdown
              selectedType={selectedConsultType}
              onSelect={setSelectedConsultType}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Data e Hora</label>
            <input
              type="datetime-local"
              value={consultDate}
              onChange={(e) => setConsultDate(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Conteúdo da Consulta */}
      <div className="bg-card rounded-lg shadow-sm p-6 border border-border mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Conteúdo da Consulta</h2>
        
        {/* Tabs */}
        <div className="border-b border-border mb-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('audio')}
              className={`py-2 px-1 font-medium text-sm focus:outline-none ${
                activeTab === 'audio'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground'
              }`}
            >
              Upload de Áudio
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`py-2 px-1 font-medium text-sm focus:outline-none ${
                activeTab === 'text' 
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground'
              }`}
            >
              Inserir Texto
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'audio' ? (
          <div className="mb-6">
            <AudioUpload onFileSelect={setUploadedFile} />
          </div>
        ) : (
          <div className="mb-6">
            <TextEditor content={textContent} onChange={setTextContent} />
          </div>
        )}

        {/* Process Button */}
        <div className="mt-6">
          <button
            onClick={processReport}
            className="px-6 py-3 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors flex items-center"
          >
            <FileText className="w-5 h-5 mr-2" />
            <span>Processar Relatório</span>
          </button>
        </div>
      </div>

      {/* Report Preview */}
      {showReportPreview && selectedPatient && selectedConsultType && (
        <div ref={reportPreviewRef} className="mb-6">
          <ReportPreview
            patient={selectedPatient}
            consultType={selectedConsultType}
            consultDate={consultDate}
          />
        </div>
      )}

      {/* Action Bar */}
      {showReportPreview && (
        <div className="sticky bottom-0 bg-card border-t border-border p-4 flex items-center justify-between">
          <div className="flex space-x-3">
            <button
              onClick={(e) => handleSaveDraft(e.currentTarget)}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              <span>Salvar Rascunho</span>
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>Enviar por Email</span>
            </button>
          </div>
          <button
            onClick={(e) => handleFinalizeReport(e.currentTarget)}
            className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors flex items-center"
          >
            <Check className="w-5 h-5 mr-2" />
            <span>Finalizar Relatório</span>
          </button>
        </div>
      )}

      {/* Modals */}
      <ProcessingModal
        isOpen={showProcessingModal}
        progress={processingProgress}
        status={processingStatus}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onViewReport={viewReport}
      />
    </Layout>
  );
}
