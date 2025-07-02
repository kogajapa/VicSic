
import { Printer, Edit } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
}

interface ReportPreviewProps {
  patient: Patient;
  consultType: string;
  consultDate: string;
}

export function ReportPreview({ patient, consultType, consultDate }: ReportPreviewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Visualização do Relatório</h2>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" title="Imprimir">
            <Printer className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" title="Editar">
            <Edit className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="font-medium text-gray-900">Dados do Paciente</h3>
        <div className="mt-2 text-sm">
          <p><span className="text-gray-500">Nome:</span> <span>{patient.name}</span></p>
          <p><span className="text-gray-500">ID:</span> <span>{patient.id}</span></p>
          <p><span className="text-gray-500">Data da consulta:</span> <span>{formatDate(consultDate)}</span></p>
          <p><span className="text-gray-500">Tipo de consulta:</span> <span>{consultType}</span></p>
        </div>
      </div>

      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="font-medium text-gray-900">Resumo da Sessão</h3>
        <p className="mt-2 text-sm text-gray-700">
          Paciente compareceu à consulta de retorno relatando melhora parcial dos sintomas de ansiedade após início do tratamento medicamentoso há 30 dias. Refere que os episódios de pânico diminuíram em frequência, mas ainda apresenta insônia intermitente e preocupações excessivas com questões profissionais.
        </p>
      </div>

      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="font-medium text-gray-900">Sintomas/Queixas</h3>
        <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
          <li>Redução na frequência de episódios de pânico (1-2 por semana, anteriormente 4-5)</li>
          <li>Insônia intermitente (dificuldade para iniciar o sono 2-3 vezes por semana)</li>
          <li>Preocupações excessivas com desempenho profissional</li>
          <li>Melhora da irritabilidade</li>
          <li>Ausência de efeitos colaterais significativos da medicação</li>
        </ul>
      </div>

      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="font-medium text-gray-900">Evolução Clínica</h3>
        <p className="mt-2 text-sm text-gray-700">
          Paciente apresenta evolução favorável desde a última consulta, com resposta parcial ao tratamento medicamentoso instituído. Houve redução significativa dos episódios de pânico e da irritabilidade. Mantém, contudo, padrão de preocupação excessiva e dificuldades com o sono, embora em menor intensidade. Nega efeitos adversos importantes relacionados à medicação. Mantém boa adesão ao tratamento farmacológico e psicoterápico.
        </p>
      </div>

      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="font-medium text-gray-900">Hipóteses Diagnósticas</h3>
        <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
          <li>F41.1 - Transtorno de Ansiedade Generalizada</li>
          <li>F41.0 - Transtorno de Pânico (em remissão parcial)</li>
          <li>F51.0 - Insônia não-orgânica</li>
        </ul>
      </div>

      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="font-medium text-gray-900">Condutas</h3>
        <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
          <li>Manutenção do tratamento farmacológico atual com ajuste de dosagem</li>
          <li>Reforço das técnicas de controle respiratório para manejo dos sintomas ansiosos</li>
          <li>Orientações sobre higiene do sono</li>
          <li>Manutenção do acompanhamento psicoterápico semanal</li>
        </ul>
      </div>

      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="font-medium text-gray-900">Medicações</h3>
        <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
          <li>Escitalopram 15mg - 1 comprimido pela manhã (aumento da dose anterior de 10mg)</li>
          <li>Clonazepam 0,5mg - 1 comprimido à noite (manter)</li>
          <li>Zolpidem 5mg - 1 comprimido 30 minutos antes de dormir, se necessário para insônia (uso intermitente)</li>
        </ul>
      </div>

      <div>
        <h3 className="font-medium text-gray-900">Plano Terapêutico</h3>
        <p className="mt-2 text-sm text-gray-700">
          Manter acompanhamento psiquiátrico com retorno em 30 dias para reavaliação da resposta ao ajuste medicamentoso. Continuar psicoterapia cognitivo-comportamental semanal. Implementar técnicas de higiene do sono e gerenciamento de estresse. Monitorar efeitos da medicação e sintomas residuais, com orientação para contato em caso de piora ou efeitos adversos significativos.
        </p>
      </div>
    </div>
  );
}
