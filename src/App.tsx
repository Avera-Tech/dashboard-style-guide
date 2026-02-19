import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Alunos from "./pages/Alunos";
import Funcionarios from "./pages/Funcionarios";
import VerifyAccount from "./pages/VerifyAccount";
import Produtos from "./pages/Produtos";
import Turmas from "./pages/Turmas";
import Aulas from "./pages/Aulas";
import EmailTemplates from "./pages/EmailTemplates";
import Financeiro from "./pages/Financeiro";
import ContasReceber from "./pages/ContasReceber";
import ContasPagar from "./pages/ContasPagar";
import CRM from "./pages/CRM";
import NotFound from "./pages/NotFound";

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
          <Route path="/verify" element={<VerifyAccount />} />
          <Route path="/email-templates" element={<EmailTemplates />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
