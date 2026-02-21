import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle2, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import tennisCourt from "@/assets/tennis-court.jpg";

const VerifyAccount = () => {
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      setVerified(true);
    }
  };

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

          {!verified ? (
            <>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-foreground tracking-tight">Verificar conta</h1>
                <p className="text-muted-foreground">
                  Digite o código de 6 dígitos enviado para o seu email.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleVerify}>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={setCode}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="h-14 w-14 text-lg" />
                      <InputOTPSlot index={1} className="h-14 w-14 text-lg" />
                      <InputOTPSlot index={2} className="h-14 w-14 text-lg" />
                      <InputOTPSlot index={3} className="h-14 w-14 text-lg" />
                      <InputOTPSlot index={4} className="h-14 w-14 text-lg" />
                      <InputOTPSlot index={5} className="h-14 w-14 text-lg" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold"
                  disabled={code.length !== 6}
                >
                  Verificar
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Não recebeu o código?{" "}
                  <button
                    type="button"
                    className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Reenviar código
                  </button>
                </p>
              </form>
            </>
          ) : (
            <div className="space-y-4 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Conta verificada!</h1>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Sua conta foi verificada com sucesso. Agora você pode acessar todas as funcionalidades.
              </p>
              <Link to="/login">
                <Button className="mt-4">Ir para o login</Button>
              </Link>
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-0 lg:w-1/2 text-center space-y-0.5">
        <p className="text-xs text-muted-foreground/60">Desenvolvido por <span className="font-semibold text-muted-foreground">Avera</span></p>
        <p className="text-[10px] text-muted-foreground/40">Versão 1.0.0</p>
      </div>
    </div>
  );
};

export default VerifyAccount;
