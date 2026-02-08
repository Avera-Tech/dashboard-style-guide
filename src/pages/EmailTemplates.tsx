import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const brandColor = "#2b5aad";
const accentColor = "#e9a319";
const bgColor = "#f4f5f7";
const cardBg = "#ffffff";
const textColor = "#1c2a4a";
const mutedText = "#6b7a94";

const VerificationEmail = () => (
  <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: bgColor, padding: "40px 0" }}>
    <div style={{ maxWidth: 480, margin: "0 auto", backgroundColor: cardBg, borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      {/* Header */}
      <div style={{ backgroundColor: brandColor, padding: "32px 32px 24px", textAlign: "center" as const }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>
          Tennis<span style={{ color: accentColor }}>UP</span>
        </h1>
      </div>
      {/* Body */}
      <div style={{ padding: "32px" }}>
        <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, color: textColor }}>Verifique sua conta</h2>
        <p style={{ margin: "0 0 24px", fontSize: 15, color: mutedText, lineHeight: 1.6 }}>
          Use o código abaixo para verificar sua conta no TennisUP. O código expira em 10 minutos.
        </p>
        <div style={{ backgroundColor: bgColor, borderRadius: 10, padding: "20px", textAlign: "center" as const, margin: "0 0 24px" }}>
          <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: 8, color: brandColor, fontFamily: "'JetBrains Mono', monospace" }}>
            482917
          </span>
        </div>
        <p style={{ margin: "0 0 8px", fontSize: 13, color: mutedText, lineHeight: 1.5 }}>
          Se você não solicitou este código, ignore este email.
        </p>
      </div>
      {/* Footer */}
      <div style={{ borderTop: "1px solid #e8eaed", padding: "20px 32px", textAlign: "center" as const }}>
        <p style={{ margin: 0, fontSize: 12, color: "#a0aab8" }}>
          © 2025 TennisUP · Desenvolvido por <strong style={{ color: mutedText }}>Avera</strong>
        </p>
      </div>
    </div>
  </div>
);

const PasswordResetEmail = () => (
  <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: bgColor, padding: "40px 0" }}>
    <div style={{ maxWidth: 480, margin: "0 auto", backgroundColor: cardBg, borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      {/* Header */}
      <div style={{ backgroundColor: brandColor, padding: "32px 32px 24px", textAlign: "center" as const }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>
          Tennis<span style={{ color: accentColor }}>UP</span>
        </h1>
      </div>
      {/* Body */}
      <div style={{ padding: "32px" }}>
        <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, color: textColor }}>Redefinir sua senha</h2>
        <p style={{ margin: "0 0 24px", fontSize: 15, color: mutedText, lineHeight: 1.6 }}>
          Recebemos uma solicitação para redefinir a senha da sua conta. Clique no botão abaixo para criar uma nova senha.
        </p>
        <div style={{ textAlign: "center" as const, margin: "0 0 24px" }}>
          <a
            href="#"
            style={{
              display: "inline-block",
              backgroundColor: brandColor,
              color: "#fff",
              padding: "14px 32px",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Redefinir senha
          </a>
        </div>
        <p style={{ margin: "0 0 16px", fontSize: 13, color: mutedText, lineHeight: 1.5 }}>
          Este link expira em 1 hora. Se você não solicitou a redefinição, ignore este email.
        </p>
        <div style={{ backgroundColor: bgColor, borderRadius: 8, padding: "12px 16px" }}>
          <p style={{ margin: 0, fontSize: 12, color: mutedText, wordBreak: "break-all" as const }}>
            https://app.tennisup.com/reset-password?token=abc123xyz
          </p>
        </div>
      </div>
      {/* Footer */}
      <div style={{ borderTop: "1px solid #e8eaed", padding: "20px 32px", textAlign: "center" as const }}>
        <p style={{ margin: 0, fontSize: 12, color: "#a0aab8" }}>
          © 2025 TennisUP · Desenvolvido por <strong style={{ color: mutedText }}>Avera</strong>
        </p>
      </div>
    </div>
  </div>
);

const WelcomeEmail = () => (
  <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: bgColor, padding: "40px 0" }}>
    <div style={{ maxWidth: 480, margin: "0 auto", backgroundColor: cardBg, borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      {/* Header */}
      <div style={{ backgroundColor: brandColor, padding: "32px 32px 24px", textAlign: "center" as const }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>
          Tennis<span style={{ color: accentColor }}>UP</span>
        </h1>
      </div>
      {/* Body */}
      <div style={{ padding: "32px" }}>
        <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, color: textColor }}>Bem-vindo ao TennisUP! 🎾</h2>
        <p style={{ margin: "0 0 20px", fontSize: 15, color: mutedText, lineHeight: 1.6 }}>
          Sua conta foi criada com sucesso. Estamos felizes em ter você conosco!
        </p>
        <p style={{ margin: "0 0 20px", fontSize: 15, color: textColor, lineHeight: 1.6 }}>
          Com o TennisUP você pode:
        </p>
        <ul style={{ margin: "0 0 24px", padding: "0 0 0 20px", fontSize: 14, color: mutedText, lineHeight: 2 }}>
          <li>📅 Gerenciar agendamentos de quadras</li>
          <li>👥 Controlar alunos e professores</li>
          <li>📊 Acompanhar relatórios e métricas</li>
          <li>💳 Gerenciar pagamentos e mensalidades</li>
        </ul>
        <div style={{ textAlign: "center" as const, margin: "0 0 24px" }}>
          <a
            href="#"
            style={{
              display: "inline-block",
              backgroundColor: brandColor,
              color: "#fff",
              padding: "14px 32px",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Acessar minha conta
          </a>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: mutedText }}>
          Se tiver alguma dúvida, estamos à disposição para ajudar.
        </p>
      </div>
      {/* Footer */}
      <div style={{ borderTop: "1px solid #e8eaed", padding: "20px 32px", textAlign: "center" as const }}>
        <p style={{ margin: 0, fontSize: 12, color: "#a0aab8" }}>
          © 2025 TennisUP · Desenvolvido por <strong style={{ color: mutedText }}>Avera</strong>
        </p>
      </div>
    </div>
  </div>
);

const EmailTemplates = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Templates de Email</h1>
            <p className="text-sm text-muted-foreground">Pré-visualização dos emails enviados pelo sistema</p>
          </div>
        </div>

        <Tabs defaultValue="verification" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="verification">Verificação</TabsTrigger>
            <TabsTrigger value="reset">Recuperação</TabsTrigger>
            <TabsTrigger value="welcome">Boas-vindas</TabsTrigger>
          </TabsList>

          <TabsContent value="verification" className="rounded-xl border border-border overflow-hidden">
            <VerificationEmail />
          </TabsContent>

          <TabsContent value="reset" className="rounded-xl border border-border overflow-hidden">
            <PasswordResetEmail />
          </TabsContent>

          <TabsContent value="welcome" className="rounded-xl border border-border overflow-hidden">
            <WelcomeEmail />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmailTemplates;
