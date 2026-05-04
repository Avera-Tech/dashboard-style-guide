import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Palette, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThemeSetupModalProps {
  onDismiss: () => void;
}

const ThemeSetupModal = ({ onDismiss }: ThemeSetupModalProps) => {
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();

  const handleGoToSettings = () => {
    onDismiss();
    navigate(clientId ? `/${clientId}/configuracoes?tab=aparencia` : "/configuracoes?tab=aparencia");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-card border border-border rounded-2xl shadow-2xl p-8">
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-5">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Palette className="h-8 w-8 text-primary" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">Personalize seu sistema</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Seu ambiente ainda não foi personalizado. Configure logo, cores e identidade visual
              para que o sistema reflita a sua marca.
            </p>
          </div>

          <div className="w-full space-y-3 pt-2">
            <Button className="w-full gap-2" onClick={handleGoToSettings}>
              Configurar agora
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="w-full text-muted-foreground" onClick={onDismiss}>
              Configurar mais tarde
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSetupModal;
