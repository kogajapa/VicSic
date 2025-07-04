import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NovoRelatorio from "./pages/NovoRelatorio";
import Pacientes from "./pages/Pacientes";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import Administrador from "./pages/Administrador";
import NotFound from "./pages/NotFound";
import { Sobre } from "./pages/Sobre";
import ReceituarioPage from "./pages/Receituario";
import TelemedicinaPage from "./pages/Telemedicina";
import AgenteDeAgendamentoPage from "./pages/AgenteDeAgendamento";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/novo-relatorio" element={<NovoRelatorio />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/administrador/*" element={<Administrador />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/receituario" element={<ReceituarioPage />} />
          <Route path="/telemedicina" element={<TelemedicinaPage />} />
          <Route path="/agente-de-agendamento" element={<AgenteDeAgendamentoPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
