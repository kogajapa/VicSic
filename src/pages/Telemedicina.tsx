import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';

const TelemedicinaPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Layout title="Telemedicina">
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="grayscale opacity-60">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-7 h-7 flex items-center justify-center mr-2 text-primary">
                  <i className="ri-video-chat-line"></i>
                </div>
                Telemedicina
              </h1>
              <p className="text-gray-600 mt-1">Gerencie suas consultas virtuais e atenda seus pacientes remotamente</p>
            </div>
            <button id="new-appointment-btn" className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-button hover:bg-primary/90 transition-colors whitespace-nowrap">
              <div className="w-5 h-5 flex items-center justify-center mr-2">
                <i className="ri-add-line"></i>
              </div>
              <span>Nova Consulta</span>
            </button>
          </div>

          {/* Tabs de Navegação */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="flex border-b border-gray-200">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`tab-button flex-1 py-4 px-6 text-sm font-medium text-center focus:outline-none ${activeTab === 'dashboard' ? 'active' : ''}`}>
                Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('appointments')}
                className={`tab-button flex-1 py-4 px-6 text-sm font-medium text-center focus:outline-none ${activeTab === 'appointments' ? 'active' : ''}`}>
                Consultas
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`tab-button flex-1 py-4 px-6 text-sm font-medium text-center focus:outline-none ${activeTab === 'history' ? 'active' : ''}`}>
                Histórico
              </button>
              <button 
                onClick={() => setActiveTab('documents')}
                className={`tab-button flex-1 py-4 px-6 text-sm font-medium text-center focus:outline-none ${activeTab === 'documents' ? 'active' : ''}`}>
                Documentos
              </button>
            </div>

            {/* Conteúdo das Tabs */}
            <div className="p-6">
              {activeTab === 'dashboard' && (
                <div id="tab-content-dashboard">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Card de Estatísticas 1 */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Consultas Hoje</h3>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <i className="ri-calendar-line"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-3xl font-bold text-gray-900">5</p>
                          <p className="text-sm text-gray-500 mt-1">Próxima: 10:30</p>
                        </div>
                        <div className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                          +2 de ontem
                        </div>
                      </div>
                    </div>
                    {/* Card de Estatísticas 2 */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Tempo Médio</h3>
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <i className="ri-time-line"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-3xl font-bold text-gray-900">18<span className="text-xl">min</span></p>
                          <p className="text-sm text-gray-500 mt-1">Por consulta</p>
                        </div>
                        <div className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-800">
                          +2min da média
                        </div>
                      </div>
                    </div>
                    {/* Card de Estatísticas 3 */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Satisfação</h3>
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <i className="ri-star-line"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-3xl font-bold text-gray-900">4.8<span className="text-xl">/5</span></p>
                          <p className="text-sm text-gray-500 mt-1">28 avaliações</p>
                        </div>
                        <div className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                          +0.2 do mês passado
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Calendário e Próximas Consultas */}
                    <div className="md:col-span-2 bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Calendário de Consultas</h3>
                        <div className="flex space-x-2">
                          <button id="prev-month" className="p-1 rounded-full hover:bg-gray-100">
                            <div className="w-5 h-5 flex items-center justify-center text-gray-500">
                              <i className="ri-arrow-left-s-line"></i>
                            </div>
                          </button>
                          <span className="text-sm font-medium text-gray-700">Julho 2025</span>
                          <button id="next-month" className="p-1 rounded-full hover:bg-gray-100">
                            <div className="w-5 h-5 flex items-center justify-center text-gray-500">
                              <i className="ri-arrow-right-s-line"></i>
                            </div>
                          </button>
                        </div>
                      </div>
                      {/* Calendário */}
                      <div className="mb-6">
                        {/* Dias da semana */}
                        <div className="grid grid-cols-7 mb-2">
                          <div className="text-xs font-medium text-gray-500 text-center">Dom</div>
                          <div className="text-xs font-medium text-gray-500 text-center">Seg</div>
                          <div className="text-xs font-medium text-gray-500 text-center">Ter</div>
                          <div className="text-xs font-medium text-gray-500 text-center">Qua</div>
                          <div className="text-xs font-medium text-gray-500 text-center">Qui</div>
                          <div className="text-xs font-medium text-gray-500 text-center">Sex</div>
                          <div className="text-xs font-medium text-gray-500 text-center">Sáb</div>
                        </div>
                        {/* Dias do mês */}
                        <div className="grid grid-cols-7 gap-1">
                          <div className="calendar-day inactive">29</div>
                          <div className="calendar-day inactive">30</div>
                          <div className="calendar-day">1</div>
                          <div className="calendar-day">2</div>
                          <div className="calendar-day today">3</div>
                          <div className="calendar-day has-appointment">4</div>
                          <div className="calendar-day">5</div>
                          <div className="calendar-day">6</div>
                          <div className="calendar-day has-appointment">7</div>
                          <div className="calendar-day has-appointment">8</div>
                          <div className="calendar-day">9</div>
                          <div className="calendar-day selected has-appointment">10</div>
                          <div className="calendar-day has-appointment">11</div>
                          <div className="calendar-day">12</div>
                          <div className="calendar-day">13</div>
                          <div className="calendar-day has-appointment">14</div>
                          <div className="calendar-day">15</div>
                          <div className="calendar-day has-appointment">16</div>
                          <div className="calendar-day">17</div>
                          <div className="calendar-day has-appointment">18</div>
                          <div className="calendar-day">19</div>
                          <div className="calendar-day">20</div>
                          <div className="calendar-day has-appointment">21</div>
                          <div className="calendar-day">22</div>
                          <div className="calendar-day">23</div>
                          <div className="calendar-day has-appointment">24</div>
                          <div className="calendar-day">25</div>
                          <div className="calendar-day">26</div>
                          <div className="calendar-day">27</div>
                          <div className="calendar-day has-appointment">28</div>
                          <div className="calendar-day">29</div>
                          <div className="calendar-day">30</div>
                          <div className="calendar-day">31</div>
                          <div className="calendar-day inactive">1</div>
                          <div className="calendar-day inactive">2</div>
                        </div>
                      </div>
                      {/* Consultas do dia selecionado */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Consultas de 10/07/2025</h4>
                        <div className="space-y-3">
                          <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600">
                              <span className="text-sm font-medium">LM</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">Luísa Mendes</p>
                              <p className="text-xs text-gray-500">09:00 - 09:30 • Retorno</p>
                            </div>
                            <button className="flex items-center px-3 py-1 text-xs font-medium text-white bg-primary rounded-button hover:bg-primary/90 transition-colors whitespace-nowrap">
                              <div className="w-4 h-4 flex items-center justify-center mr-1">
                                <i className="ri-video-line"></i>
                              </div>
                              <span>Iniciar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Gráfico de Estatísticas */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                      <h3 className="text-sm font-medium text-gray-700 mb-4">Estatísticas Mensais</h3>
                      <div id="stats-chart" className="w-full h-64"></div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500">Total de Consultas</p>
                          <p className="text-lg font-bold text-gray-900">42</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500">Taxa de Comparecimento</p>
                          <p className="text-lg font-bold text-gray-900">92%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'appointments' && (
                <div id="tab-content-appointments" className="p-6">
                  <p>Conteúdo da aba de Consultas.</p>
                </div>
              )}
              {activeTab === 'history' && (
                <div id="tab-content-history" className="p-6">
                  <p>Conteúdo da aba de Histórico.</p>
                </div>
              )}
              {activeTab === 'documents' && (
                <div id="tab-content-documents" className="p-6">
                  <p>Conteúdo da aba de Documentos.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TelemedicinaPage;
