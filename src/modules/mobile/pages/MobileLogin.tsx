import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import "@/styles/mobile.css";

const MobileLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mobile-login">
      {/* Logo / Header */}
      <div className="mobile-login__header">
        <h1 className="mobile-login__logo-text">
          Tennis<span className="mobile-login__logo-accent">UP</span>
        </h1>
        <p className="mobile-login__subtitle">
          Gerencie sua academia com simplicidade
        </p>
      </div>

      {/* Form */}
      <form
        className="mobile-login__form"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="mobile-login__input-wrapper">
          <input
            type="email"
            placeholder="Email"
            className="mobile-login__input"
            autoComplete="email"
          />
        </div>

        <div className="mobile-login__input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            className="mobile-login__input mobile-login__input--password"
            autoComplete="current-password"
          />
          <button
            type="button"
            className="mobile-login__eye-btn"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button type="submit" className="mobile-login__submit">
          Entrar
        </button>

        <div className="mobile-login__forgot">
          <Link to="/forgot-password">Esqueceu sua senha?</Link>
        </div>
      </form>

      {/* Footer */}
      <div className="mobile-login__footer">
        <div className="mobile-login__footer-separator" />
        <p className="mobile-login__footer-text">
          Primeira vez?{" "}
          <Link to="/verify" className="mobile-login__footer-link">
            Cadastre-se
          </Link>
        </p>
        <p className="mobile-login__brand">
          Desenvolvido por <strong>Avera</strong>
        </p>
      </div>
    </div>
  );
};

export default MobileLogin;
