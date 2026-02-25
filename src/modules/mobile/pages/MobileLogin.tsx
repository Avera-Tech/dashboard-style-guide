import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import "@/styles/mobile.css";

const MobileLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mobile-login">
      {/* Centered content: logo + form + forgot */}
      <div className="mobile-login__center">
        <img src={logo} alt="TennisUP" className="mobile-login__logo-img" />

        <form
          className="mobile-login__form"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="email"
            placeholder="Email"
            className="h-12"
            autoComplete="email"
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              className="h-12 pr-12"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold rounded-lg mt-1">
            Entrar
          </Button>

          <div className="mobile-login__forgot">
            <Link to="/forgot-password">Esqueceu sua senha?</Link>
          </div>
        </form>
      </div>

      {/* Footer pinned to bottom */}
      <div className="mobile-login__footer">
        <div className="mobile-login__footer-separator" />
        <p className="mobile-login__footer-text">
          Primeira vez?{" "}
          <Link to="/verify" className="mobile-login__footer-link">
            Cadastre-se
          </Link>
        </p>
        <p className="mobile-login__brand">
          Desenvolvido por <strong>Avera</strong> · v1.0.0
        </p>
      </div>
    </div>
  );
};

export default MobileLogin;
