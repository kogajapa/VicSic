import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';

interface Message {
  from: 'patient' | 'agent';
  text: string;
  time: string;
  suggestions?: string[];
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  color: string;
  lastMessage: string;
  time: string;
  messages: Message[];
}

const AgenteDeAgendamentoPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: 'Marina Rodrigues',
      avatar: 'MR',
      color: 'blue',
      lastMessage: 'Confirmado para amanhã às 14:30',
      time: '09:45',
      messages: [
        { from: 'patient', text: 'Obrigada por confirmar!', time: '09:45' },
      ]
    },
    {
      id: 2,
      name: 'João Carlos Silva',
      avatar: 'JC',
      color: 'green',
      lastMessage: 'Solicitando reagendamento',
      time: '09:30',
      messages: [
        { from: 'patient', text: 'Bom dia! Gostaria de reagendar minha consulta de amanhã para a próxima semana.', time: '09:30' },
        { from: 'agent', text: 'Claro! Vou verificar os horários disponíveis para a próxima semana. Você tem preferência de horário?', time: '09:31' },
        { from: 'patient', text: 'Se possível no período da tarde, após às 14h.', time: '09:32' },
        { 
          from: 'agent', 
          text: 'Temos os seguintes horários disponíveis:', 
          time: '09:33',
          suggestions: [
            'Terça-feira, 09/07 - 14:30',
            'Quarta-feira, 10/07 - 15:00',
            'Quinta-feira, 11/07 - 14:00',
          ]
        },
      ]
    },
    {
      id: 3,
      name: 'Ana Paula Ferreira',
      avatar: 'AP',
      color: 'purple',
      lastMessage: 'Confirmação enviada',
      time: '09:15',
      messages: [
        { from: 'agent', text: 'Olá Ana, sua consulta para sexta-feira às 10:00 está confirmada. Enviamos os detalhes para o seu email.', time: '09:15' },
      ]
    },
    {
      id: 4,
      name: 'Rafael Lima',
      avatar: 'RL',
      color: 'orange',
      lastMessage: 'Consulta confirmada',
      time: 'Ontem',
      messages: []
    },
  ]);
  const [activeConversationId, setActiveConversationId] = useState(2);
  const [newMessage, setNewMessage] = useState('');

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    const updatedConversations = conversations.map(convo => {
      if (convo.id === activeConversationId) {
        const newMessageObj: Message = { 
          from: 'agent', 
          text: newMessage, 
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) 
        };
        
        return { 
          ...convo, 
          messages: [...convo.messages, newMessageObj],
          lastMessage: newMessage,
        };
      }
      return convo;
    });

    setConversations(updatedConversations);
    setNewMessage('');
  };
  // NOTA: Este componente é baseado em um arquivo HTML estático.
  // A interatividade (como troca de conversas, envio de mensagens) precisa ser implementada usando estado e manipuladores de eventos do React.
  return (
    <Layout title="Agente de Agendamento">
      <div className="flex-1 flex h-full bg-gray-50">
        <div className="grayscale opacity-60 w-full h-full flex">
          {/* Coluna da Lista de Conversas */}
          <div className="w-[320px] border-r border-gray-200 bg-white flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <div className="w-4 h-4 flex items-center justify-center text-gray-400">
                    <i className="ri-search-line"></i>
                  </div>
                </div>
                <input type="search" className="pl-10 pr-4 py-2 w-full bg-gray-50 border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Buscar conversas..." />
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              <div className="divide-y divide-gray-100">
                {conversations.map(convo => (
                  <div 
                    key={convo.id}
                    onClick={() => setActiveConversationId(convo.id)}
                    className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${activeConversationId === convo.id ? 'bg-primary/5 border-l-2 border-primary' : ''}`}>
                    <div className={`w-10 h-10 rounded-full bg-${convo.color}-100 flex items-center justify-center mr-3 text-${convo.color}-600`}>
                      <span className="text-sm font-medium">{convo.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{convo.name}</p>
                        <p className="text-xs text-gray-500">{convo.time}</p>
                      </div>
                      <div className="flex items-center mt-1">
                        <p className="text-xs text-gray-500 truncate">{convo.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 flex flex-col bg-white">
            {activeConversation ? (
              <>
                <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full bg-${activeConversation.color}-100 flex items-center justify-center mr-3 text-${activeConversation.color}-600`}>
                      <span className="text-sm font-medium">{activeConversation.avatar}</span>
                    </div>
                    <div>
                      <h2 className="text-sm font-medium text-gray-900">{activeConversation.name}</h2>
                      <p className="text-xs text-gray-500">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-user-line"></i>
                      </div>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-more-2-line"></i>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="flex justify-center mb-4">
                    <div className="bg-white rounded-lg px-3 py-1 text-xs text-gray-500 shadow-sm">
                      Hoje
                    </div>
                  </div>
                  <div className="space-y-4">
                    {activeConversation.messages.map((msg, index) => (
                      <div key={index} className={`flex ${msg.from === 'agent' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`${msg.from === 'agent' ? 'bg-primary text-white' : 'bg-white'} rounded-lg px-4 py-2 max-w-[70%] shadow-sm`}>
                          <p className="text-sm">{msg.text}</p>
                          {msg.suggestions && (
                            <div className="mt-2 space-y-2">
                              {msg.suggestions.map((s, i) => (
                                <button key={i} className="w-full text-left px-3 py-2 bg-white/10 rounded text-sm hover:bg-white/20 transition-colors">
                                  {s}
                                </button>
                              ))}
                            </div>
                          )}
                          <p className={`text-xs ${msg.from === 'agent' ? 'text-white/80' : 'text-gray-500'} mt-1 text-right`}>{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <button className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-calendar-line"></i>
                      </div>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-attachment-2"></i>
                      </div>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-emotion-line"></i>
                      </div>
                    </button>
                  </div>
                  <form onSubmit={handleSendMessage}>
                    <div className="relative">
                      <input 
                        type="text" 
                        className="w-full pl-4 pr-10 py-2 bg-gray-50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
                        placeholder="Digite uma mensagem..." 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/10 rounded-full transition-colors">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <i className="ri-send-plane-line"></i>
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Selecione uma conversa para começar
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default AgenteDeAgendamentoPage;
