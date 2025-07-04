import React, { useState } from 'react';
import { Search, Plus, UserSearch, Trash2, Pill, Eye, Save, FileText, FileLock, NotebookPen, FolderOpen, TestTube, X, Printer } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';

// Tipos de dados
type Patient = {
  id: string;
  name: string;
  initials: string;
  cpf: string;
  age: number;
  lastVisit: string;
  allergies: string;
  color: string;
};

type Medicine = {
  id: number;
  name: string;
  dosage: string;
  posology: string;
  duration: string;
};

// Dados de Exemplo
const mockPatients: Patient[] = [
  { id: '1', name: 'Mariana Rodrigues', initials: 'MR', cpf: '123.456.789-10', age: 32, lastVisit: '15/06/2025', allergies: 'Alergia a penicilina, hipertensão controlada', color: 'blue' },
  { id: '2', name: 'João Carlos Silva', initials: 'JC', cpf: '987.654.321-00', age: 45, lastVisit: '10/06/2025', allergies: 'Nenhuma', color: 'green' },
  { id: '3', name: 'Ana Paula Ferreira', initials: 'AP', cpf: '456.789.123-45', age: 28, lastVisit: '20/05/2025', allergies: 'Rinite alérgica', color: 'purple' },
];

// Componente para o cartão de tipo de receita
const PrescriptionTypeOption = ({ id, title, description, icon: Icon, checked, onChange }: { id: string, title: string, description: string, icon: React.ElementType, checked: boolean, onChange: (id: string) => void }) => (
  <div
    className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors relative ${checked ? 'border-primary shadow-md' : 'border-gray-200'}`}
    onClick={() => onChange(id)}
  >
    <input type="radio" name="prescription-type" id={id} className="absolute opacity-0" checked={checked} readOnly />
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 flex items-center justify-center mb-2 text-gray-500">
        <Icon className="w-8 h-8" />
      </div>
      <p className="text-sm font-medium text-gray-700 text-center">{title}</p>
      <p className="text-xs text-gray-500 text-center mt-1">{description}</p>
    </div>
    <div className={`absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center ${checked ? 'border-primary' : 'border-gray-300'}`}>
      {checked && <div className="w-3 h-3 rounded-full bg-primary"></div>}
    </div>
  </div>
);

const ReceituarioPage = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [patientSearch, setPatientSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([{ id: 1, name: '', dosage: '', posology: '', duration: '' }]);
  const [prescriptionType, setPrescriptionType] = useState('common');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Estado dos modais
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isSaveTemplateModalOpen, setIsSaveTemplateModalOpen] = useState(false);

  const handleAddMedicine = () => {
    setMedicines([...medicines, { id: Date.now(), name: '', dosage: '', posology: '', duration: '' }]);
  };

  const handleRemoveMedicine = (id: number) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  const handleMedicineChange = (id: number, field: keyof Omit<Medicine, 'id'>, value: string) => {
    setMedicines(medicines.map(med => med.id === id ? { ...med, [field]: value } : med));
  };

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setPatientSearch('');
    setShowSuggestions(false);
  };

  const filteredPatients = patientSearch
    ? mockPatients.filter(p =>
        p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
        p.cpf.includes(patientSearch)
      )
    : [];

  return (
    <Layout title="Receituário">
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="grayscale opacity-60">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <div className="w-7 h-7 flex items-center justify-center mr-2 text-primary">
              <NotebookPen />
            </div>
            Receituário
          </h1>
          <p className="text-gray-600 mt-1">Crie e gerencie prescrições médicas para seus pacientes</p>
        </div>
        <button onClick={() => setActiveTab('form')} className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-button hover:bg-primary/90 transition-colors whitespace-nowrap">
          <Plus className="w-5 h-5 mr-2" />
          <span>Nova Receita</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="flex border-b border-gray-200">
          <button onClick={() => setActiveTab('form')} className={`tab-button flex-1 py-4 px-6 text-sm font-medium text-center focus:outline-none ${activeTab === 'form' ? 'active' : ''}`}>
            Nova Receita
          </button>
          <button onClick={() => setActiveTab('history')} className={`tab-button flex-1 py-4 px-6 text-sm font-medium text-center focus:outline-none ${activeTab === 'history' ? 'active' : ''}`}>
            Histórico de Receitas
          </button>
        </div>

        {activeTab === 'form' && (
          <div className="p-6">
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Seleção de Paciente */}
              {!selectedPatient ? (
                <div className="mb-6">
                  <label htmlFor="patient" className="block text-sm font-medium text-gray-700 mb-2">Paciente</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <UserSearch className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="patient"
                      className="pl-10 pr-4 py-3 w-full bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Buscar paciente por nome ou CPF"
                      value={patientSearch}
                      onChange={(e) => { setPatientSearch(e.target.value); setShowSuggestions(true); }}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    />
                  </div>
                  {showSuggestions && filteredPatients.length > 0 && (
                     <div className="absolute mt-1 w-full md:w-1/2 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                       <ul className="py-1">
                         {filteredPatients.map(p => (
                           <li key={p.id} onClick={() => handlePatientSelect(p)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                             <div className={`w-8 h-8 rounded-full bg-${p.color}-100 flex items-center justify-center mr-3 text-${p.color}-600`}>
                               <span className="text-xs font-medium">{p.initials}</span>
                             </div>
                             <div>
                               <p className="text-sm font-medium">{p.name}</p>
                               <p className="text-xs text-gray-500">CPF: {p.cpf} | {p.age} anos</p>
                             </div>
                           </li>
                         ))}
                       </ul>
                     </div>
                  )}
                </div>
              ) : (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className={`w-10 h-10 rounded-full bg-${selectedPatient.color}-100 flex items-center justify-center mr-3 text-${selectedPatient.color}-600`}>
                        <span className="text-sm font-medium">{selectedPatient.initials}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{selectedPatient.name}</h4>
                        <p className="text-xs text-gray-500">CPF: {selectedPatient.cpf} | {selectedPatient.age} anos</p>
                        <p className="text-xs text-gray-500 mt-1">Última consulta: {selectedPatient.lastVisit}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedPatient(null)} className="text-xs text-primary hover:text-primary/80">
                      Alterar paciente
                    </button>
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <h5 className="text-xs font-medium text-gray-700 mb-1">Alergias e condições especiais:</h5>
                    <p className="text-xs text-gray-600">{selectedPatient.allergies}</p>
                  </div>
                </div>
              )}
              
              {/* Medicamentos */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Medicamentos</label>
                  <button type="button" onClick={handleAddMedicine} className="text-xs text-primary hover:text-primary/80 flex items-center">
                    <Plus className="w-4 h-4 mr-1" />
                    <span>Adicionar medicamento</span>
                  </button>
                </div>
                <div>
                  {medicines.map((med, index) => (
                    <div key={med.id} className="medicine-item mb-4 p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-sm font-medium text-gray-900">Medicamento {index + 1}</h4>
                        {medicines.length > 1 && (
                          <button type="button" onClick={() => handleRemoveMedicine(med.id)} className="text-gray-400 hover:text-red-500">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Nome do medicamento</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <Pill className="w-4 h-4 text-gray-400" />
                            </div>
                            <input type="text" value={med.name} onChange={(e) => handleMedicineChange(med.id, 'name', e.target.value)} className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Buscar medicamento" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Dosagem</label>
                          <input type="text" value={med.dosage} onChange={(e) => handleMedicineChange(med.id, 'dosage', e.target.value)} className="px-4 py-2 w-full bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Ex: 500mg" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Posologia</label>
                          <input type="text" value={med.posology} onChange={(e) => handleMedicineChange(med.id, 'posology', e.target.value)} className="px-4 py-2 w-full bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Ex: 1 comprimido a cada 8 horas" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Duração do tratamento</label>
                          <input type="text" value={med.duration} onChange={(e) => handleMedicineChange(med.id, 'duration', e.target.value)} className="px-4 py-2 w-full bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Ex: 7 dias" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instruções e Tipo */}
              <div className="mb-6">
                <label htmlFor="special-instructions" className="block text-sm font-medium text-gray-700 mb-2">Instruções Especiais</label>
                <textarea id="special-instructions" rows={3} value={specialInstructions} onChange={e => setSpecialInstructions(e.target.value)} className="px-4 py-2 w-full bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Instruções adicionais para o paciente..."></textarea>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Tipo de Receita</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <PrescriptionTypeOption id="common" title="Comum" description="Receita simples" icon={FileText} checked={prescriptionType === 'common'} onChange={setPrescriptionType} />
                    <PrescriptionTypeOption id="control" title="Controle Especial" description="Medicamentos controlados" icon={FileLock} checked={prescriptionType === 'control'} onChange={setPrescriptionType} />
                    <PrescriptionTypeOption id="antimicrobial" title="Antimicrobiano" description="Antibióticos e similares" icon={TestTube} checked={prescriptionType === 'antimicrobial'} onChange={setPrescriptionType} />
                </div>
              </div>

              {/* Ações */}
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setIsPreviewModalOpen(true)} className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-button hover:bg-primary/20 transition-colors whitespace-nowrap flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  <span>Visualizar</span>
                </button>
                <button type="button" onClick={() => setIsTemplatesModalOpen(true)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-button hover:bg-gray-200 transition-colors whitespace-nowrap flex items-center">
                  <FolderOpen className="w-5 h-5 mr-2" />
                  <span>Modelos</span>
                </button>
                <button type="button" onClick={() => setIsSaveTemplateModalOpen(true)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-button hover:bg-gray-200 transition-colors whitespace-nowrap flex items-center">
                  <Save className="w-5 h-5 mr-2" />
                  <span>Salvar como modelo</span>
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-button hover:bg-primary/90 transition-colors whitespace-nowrap">
                  Emitir Receita
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="p-6">
            <p>O histórico de receitas será implementado aqui.</p>
          </div>
        )}
      </div>
    </div>

      {/* Modais */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Visualização da Receita</h3>
              <button onClick={() => setIsPreviewModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
                {/* Conteúdo da visualização */}
                <p>Conteúdo da visualização da receita...</p>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                <button onClick={() => setIsPreviewModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-button hover:bg-gray-50 transition-colors whitespace-nowrap">
                    Fechar
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-button hover:bg-primary/90 transition-colors whitespace-nowrap flex items-center">
                    <Printer className="w-5 h-5 mr-2" />
                    <span>Imprimir</span>
                </button>
            </div>
          </div>
        </div>
      )}

      {isSaveTemplateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Salvar como Modelo</h3>
                    <button onClick={() => setIsSaveTemplateModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6">
                    <div className="mb-4">
                        <label htmlFor="template-name" className="block text-sm font-medium text-gray-700 mb-1">Nome do modelo</label>
                        <input type="text" id="template-name" className="px-4 py-2 w-full bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Ex: Fluoxetina - Depressão" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="template-description" className="block text-sm font-medium text-gray-700 mb-1">Descrição (opcional)</label>
                        <textarea id="template-description" rows={2} className="px-4 py-2 w-full bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Breve descrição do modelo..."></textarea>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                    <button onClick={() => setIsSaveTemplateModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-button hover:bg-gray-50 transition-colors whitespace-nowrap">
                        Cancelar
                    </button>
                    <button onClick={() => setIsSaveTemplateModalOpen(false)} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-button hover:bg-primary/90 transition-colors whitespace-nowrap">
                        Salvar modelo
                    </button>
                </div>
            </div>
        </div>
      )}
      
      {/* O modal de 'Modelos' pode ser implementado de forma similar */}

      </div>
    </Layout>
  );
};

export default ReceituarioPage;