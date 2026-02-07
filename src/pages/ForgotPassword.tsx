import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import tennisCourt from "@/assets/tennis-court.jpg";

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex bg-background relative">
      {/* Left — Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-2xl m-4">
        <img src={tennisCourt} alt="Quadra de tênis" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-12">
          <h2 className="text-5xl font-extrabold text-white tracking-tight leading-tight">
            Tennis<span className="text-accent">UP</span>
          </h2>
          <p className="text-white/70 text-lg mt-2 max-w-md">
            Gerencie sua academia de tênis com inteligência e simplicidade.
          </p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-4">
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
              Tennis<span className="text-accent">UP</span>
            </h2>
          </div>

          {!submitted ? (
            <>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-foreground tracking-tight">Esqueceu sua senha?</h1>
                <p className="text-muted-foreground">
                  Informe seu email cadastrado e enviaremos um link para redefinir sua senha.
                </p>
              </div>

              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="seu@email.com" className="pl-10 h-12" />
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 text-base font-semibold gap-2">
                  <Send className="h-4 w-4" />
                  Enviar link de recuperação
                </Button>
              </form>
            </>
          ) : (
            <div className="space-y-4 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Verifique seu email</h1>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Enviamos um link de recuperação para o email informado. Verifique sua caixa de entrada e spam.
              </p>
              <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>
                Reenviar email
              </Button>
            </div>
          )}

          <div className="relative">
            <Separator />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            <Link to="/login" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" />
              Voltar para o login
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 right-6 lg:right-auto lg:left-1/2 lg:translate-x-1/4 text-right lg:text-center space-y-0.5">
        <p className="text-xs text-muted-foreground/60">Desenvolvido por <span className="font-semibold text-muted-foreground">Avera</span></p>
        <p className="text-[10px] text-muted-foreground/40">Versão 1.0.0</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
