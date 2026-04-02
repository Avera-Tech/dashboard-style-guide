import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Core pages
import Index from "./modules/core/pages/Index";
import Login from "./modules/core/pages/Login";
import ForgotPassword from "./modules/core/pages/ForgotPassword";
import ResetPassword from "./modules/core/pages/ResetPassword";
import VerifyAccount from "./modules/core/pages/VerifyAccount";
import Produtos from "./modules/core/pages/Produtos";
import Financeiro from "./modules/core/pages/Financeiro";
import ContasReceber from "./modules/core/pages/ContasReceber";
import ContasPagar from "./modules/core/pages/ContasPagar";
import CRM from "./modules/core/pages/CRM";
import Vendas from "./modules/core/pages/Vendas";
import Anuncios from "./modules/core/pages/Anuncios";
import Configuracoes from "./modules/core/pages/Configuracoes";
import Cadastros from "./modules/core/pages/Cadastros";
import EmailTemplates from "./modules/core/pages/EmailTemplates";
import NotFound from "./modules/core/pages/NotFound";

// Clinic pages
import ClinicDashboard from "./modules/clinic/pages/ClinicDashboard";
import ClinicAgenda from "./modules/clinic/pages/ClinicAgenda";
import ClinicPacientes from "./modules/clinic/pages/ClinicPacientes";
import ClinicMedicos from "./modules/clinic/pages/ClinicMedicos";

// Fit pages
import Alunos from "./modules/fit/pages/Alunos";
import Funcionarios from "./modules/fit/pages/Funcionarios";
import Turmas from "./modules/fit/pages/Turmas";
import Aulas from "./modules/fit/pages/Aulas";
import ListaEspera from "./modules/fit/pages/ListaEspera";
import Integracoes from "./modules/fit/pages/Integracoes";

// Mobile pages
import MobileLogin from "./modules/mobile/pages/MobileLogin";
import MobileHome from "./modules/mobile/pages/MobileHome";
import MobileAgendar from "./modules/mobile/pages/MobileAgendar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/m/login" element={<MobileLogin />} />
          <Route path="/m/home" element={<MobileHome />} />
          <Route path="/m/agendar" element={<MobileAgendar />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/funcionarios" element={<Funcionarios />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/turmas" element={<Turmas />} />
          <Route path="/aulas" element={<Aulas />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/financeiro/receber" element={<ContasReceber />} />
          <Route path="/financeiro/pagar" element={<ContasPagar />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/lista-espera" element={<ListaEspera />} />
          <Route path="/vendas" element={<Vendas />} />
          <Route path="/integracoes" element={<Integracoes />} />
          <Route path="/anuncios" element={<Anuncios />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/cadastros" element={<Cadastros />} />
          <Route path="/verify" element={<VerifyAccount />} />
          <Route path="/email-templates" element={<EmailTemplates />} />
          <Route path="/clinica" element={<ClinicDashboard />} />
          <Route path="/clinica/agenda" element={<ClinicAgenda />} />
          <Route path="/clinica/pacientes" element={<ClinicPacientes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
