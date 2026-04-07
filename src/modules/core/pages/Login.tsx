import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import tennisCourt from "@/assets/tennis-court.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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

      {/* Right — Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-4">
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
              Tennis<span className="text-accent">UP</span>
            </h2>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground tracking-tight">Bem-vindo</h1>
            <p className="text-muted-foreground">Entre com seus dados para fazer login</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate("/"); }}>
            <div className="space-y-2">
              <Label htmlFor="email">Usuário</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="seu@email.com" className="pl-10 h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold">
              Entrar
            </Button>
          </form>

          <div className="relative">
            <Separator />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Esqueceu sua senha?{" "}
            <Link to="/forgot-password" className="text-primary font-medium hover:underline">
              Recuperar senha
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

export default Login;
