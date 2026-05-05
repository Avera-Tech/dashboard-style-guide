import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import averaLogo from "@/assets/avera-logo.png";
import { useTenant } from "@/contexts/ClientContext";
import { toast } from "@/hooks/use-toast";
import StepEmpresa, { StepEmpresaData } from "../components/onboarding/StepEmpresa";
import StepVisual, { StepVisualData, DEFAULT_VISUAL } from "../components/onboarding/StepVisual";
import StepModalidades, { StepModalidadesData, ModalidadeItem } from "../components/onboarding/StepModalidades";
import StepTiposProduto, { StepTiposProdutoData, TipoProdutoItem } from "../components/onboarding/StepTiposProduto";
import StepEndereco, { StepEnderecoData, EMPTY_ENDERECO } from "../components/onboarding/StepEndereco";
import StepPronto from "../components/onboarding/StepPronto";

const BASE    = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const jsonHdr = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
  "X-Client-Id": localStorage.getItem("clientId") ?? "",
});

// ── Steps definition ────────────────────────────────────────────────────────

interface StepMeta {
  id: number;
  label: string;
  title: string;
  description: string;
  skippable: boolean;
}

const STEPS: StepMeta[] = [
  {
    id: 1,
    label: "Empresa",
    title: "Vamos começar com o básico",
    description: "Confirme o nome da sua empresa e envie a logo.",
    skippable: false,
  },
  {
    id: 2,
    label: "Visual",
    title: "Como seu sistema vai parecer?",
    description: "Defina as cores principais da identidade visual.",
    skippable: true,
  },
  {
    id: 3,
    label: "Modalidades",
    title: "Quais atividades você oferece?",
    description: "Cadastre as modalidades do seu CT — ex: Tênis, Futevôlei, Padel.",
    skippable: false,
  },
  {
    id: 4,
    label: "Tipos de produto",
    title: "Como você vende seus serviços?",
    description: "Cadastre os tipos de produto — ex: Plano Mensal, Aula Avulsa, Pacote.",
    skippable: false,
  },
  {
    id: 5,
    label: "Endereço",
    title: "Onde fica seu negócio?",
    description: "Informe o endereço principal do seu CT.",
    skippable: true,
  },
  {
    id: 6,
    label: "Pronto!",
    title: "Tudo configurado!",
    description: "Seu sistema está pronto para usar.",
    skippable: false,
  },
];

// ── Step content ─────────────────────────────────────────────────────────────

interface StepContentProps {
  step: number;
  empresaData: StepEmpresaData;
  onEmpresaChange: (d: StepEmpresaData) => void;
  visualData: StepVisualData;
  onVisualChange: (d: StepVisualData) => void;
  modalidadesData: StepModalidadesData;
  onModalidadesChange: (d: StepModalidadesData) => void;
  tiposData: StepTiposProdutoData;
  onTiposChange: (d: StepTiposProdutoData) => void;
  enderecoData: StepEnderecoData;
  onEnderecoChange: (d: StepEnderecoData) => void;
  // step 6 summary props
  empresaName: string;
  modalidadesCount: number;
  tiposCount: number;
  hasEndereco: boolean;
}

const StepContent = ({ step, empresaData, onEmpresaChange, visualData, onVisualChange, modalidadesData, onModalidadesChange, tiposData, onTiposChange, enderecoData, onEnderecoChange, empresaName, modalidadesCount, tiposCount, hasEndereco }: StepContentProps) => {
  if (step === 1) return <StepEmpresa data={empresaData} onChange={onEmpresaChange} />;
  if (step === 2) return <StepVisual data={visualData} onChange={onVisualChange} />;
  if (step === 3) return <StepModalidades data={modalidadesData} onChange={onModalidadesChange} />;
  if (step === 4) return <StepTiposProduto data={tiposData} onChange={onTiposChange} />;
  if (step === 5) return <StepEndereco data={enderecoData} onChange={onEnderecoChange} />;
  if (step === 6) return <StepPronto empresaName={empresaName} modalidadesCount={modalidadesCount} tiposCount={tiposCount} hasEndereco={hasEndereco} />;
  return null;
};

const StepPlaceholder = ({ step }: { step: number }) => (
  <div className="flex flex-col items-center justify-center py-16 space-y-3 text-center">
    <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground">
      {step}
    </div>
    <p className="text-sm text-muted-foreground">Conteúdo do step {step} em breve</p>
  </div>
);

// ── Progress bar ─────────────────────────────────────────────────────────────

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center gap-2">
    {STEPS.map((s, idx) => {
      const done    = current > s.id;
      const active  = current === s.id;
      const isLast  = idx === STEPS.length - 1;

      return (
        <div key={s.id} className="flex items-center gap-2 flex-1 min-w-0">
          {/* Circle */}
          <div
            className={cn(
              "h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
              done   && "bg-primary text-primary-foreground",
              active && "bg-primary text-primary-foreground ring-4 ring-primary/20",
              !done && !active && "bg-muted text-muted-foreground"
            )}
          >
            {done ? <Check className="h-4 w-4" /> : s.id}
          </div>

          {/* Label — hidden on small screens except active */}
          <span
            className={cn(
              "text-xs font-medium truncate hidden sm:block",
              active && "text-foreground",
              !active && "text-muted-foreground"
            )}
          >
            {s.label}
          </span>

          {/* Connector line */}
          {!isLast && (
            <div className="flex-1 h-px mx-1 transition-colors duration-300"
              style={{ backgroundColor: done ? "hsl(var(--primary))" : "hsl(var(--border))" }}
            />
          )}
        </div>
      );
    })}
  </div>
);

// ── Main component ───────────────────────────────────────────────────────────

const isValidHex = (v: string) => /^#[0-9A-Fa-f]{6}$/.test(v);

const Onboarding = () => {
  const tenant                    = useTenant();
  const [step, setStep]           = useState(1);
  const [saving, setSaving]       = useState(false);
  const [empresaData, setEmpresaData] = useState<StepEmpresaData>({ companyName: "", logoUrl: "" });
  const [visualData,  setVisualData]       = useState<StepVisualData>(DEFAULT_VISUAL);
  const [modalidadesData, setModalidadesData] = useState<StepModalidadesData>({ items: [] });
  const [tiposData,       setTiposData]       = useState<StepTiposProdutoData>({ items: [] });
  const [enderecoData,    setEnderecoData]    = useState<StepEnderecoData>(EMPTY_ENDERECO);
  const tenantNameLoaded          = useRef(false);
  const navigate                  = useNavigate();
  const { clientId }              = useParams<{ clientId: string }>();

  useEffect(() => {
    if (tenant?.name && !tenantNameLoaded.current) {
      tenantNameLoaded.current = true;
      setEmpresaData((d) => ({ ...d, companyName: tenant.name }));
    }
  }, [tenant?.name]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (!stored) return;
      const t = JSON.parse(stored);
      setVisualData({
        primaryColor:   isValidHex(t.primaryColor)   ? t.primaryColor   : DEFAULT_VISUAL.primaryColor,
        secondaryColor: isValidHex(t.secondaryColor) ? t.secondaryColor : DEFAULT_VISUAL.secondaryColor,
        accentColor:    isValidHex(t.accentColor)    ? t.accentColor    : DEFAULT_VISUAL.accentColor,
      });
    } catch { /* ignore */ }
  }, []);

  const meta      = STEPS[step - 1];
  const isFirst   = step === 1;
  const isLast    = step === STEPS.length;

  const advance = async () => {
    if (isLast) {
      // Garantir que o registro de tema exista — é o que marca onboarding como concluído
      await fetch(`${BASE}/api/theme`, {
        method: "PUT", headers: jsonHdr(), body: JSON.stringify({}),
      }).catch(() => {});
      navigate(`/${clientId}/dashboard`, { replace: true });
    } else {
      setStep((s) => s + 1);
    }
  };

  const saveStep1 = async (): Promise<boolean> => {
    const name = empresaData.companyName.trim();
    if (name.length < 2) {
      toast({ title: "Nome muito curto", description: "Use ao menos 2 caracteres.", variant: "destructive" });
      return false;
    }
    if (name === (tenant?.name ?? "")) return true;
    try {
      const res  = await fetch(`${BASE}/api/company/name`, { method: "PATCH", headers: jsonHdr(), body: JSON.stringify({ company_name: name }) });
      const json = await res.json();
      if (!json.success) { toast({ title: "Erro ao salvar nome", description: json.error, variant: "destructive" }); return false; }
      return true;
    } catch {
      toast({ title: "Erro de conexão", variant: "destructive" });
      return false;
    }
  };

  const saveStep5 = async (): Promise<boolean> => {
    const { zipCode, street, number, neighborhood, city, state } = enderecoData;
    const hasData = city.trim() || street.trim();
    if (!hasData) return true; // user left it empty — treat as skipped

    if (!zipCode || !street || !number || !neighborhood || !city || !state) {
      toast({ title: "Preencha os campos obrigatórios", description: "CEP, logradouro, número, bairro, cidade e estado são obrigatórios.", variant: "destructive" });
      return false;
    }
    try {
      const res  = await fetch(`${BASE}/api/company/address`, {
        method: "PATCH",
        headers: jsonHdr(),
        body: JSON.stringify({
          zip_code: zipCode, street, number,
          complement: enderecoData.complement || null,
          neighborhood, city, state,
        }),
      });
      const json = await res.json();
      if (!json.success) { toast({ title: "Erro ao salvar endereço", description: json.error, variant: "destructive" }); return false; }
      return true;
    } catch {
      toast({ title: "Erro de conexão", variant: "destructive" });
      return false;
    }
  };

  const saveStep4 = async (): Promise<boolean> => {
    if (tiposData.items.length === 0) {
      toast({ title: "Adicione ao menos um tipo de produto", variant: "destructive" });
      return false;
    }
    try {
      await Promise.all(
        tiposData.items.map((item: TipoProdutoItem) =>
          fetch(`${BASE}/api/product-types`, {
            method: "POST",
            headers: jsonHdr(),
            body: JSON.stringify({ name: item.name, color: item.color }),
          })
        )
      );
      return true;
    } catch {
      toast({ title: "Erro de conexão ao salvar tipos de produto", variant: "destructive" });
      return false;
    }
  };

  const saveStep3 = async (): Promise<boolean> => {
    if (modalidadesData.items.length === 0) {
      toast({ title: "Adicione ao menos uma modalidade", variant: "destructive" });
      return false;
    }
    try {
      await Promise.all(
        modalidadesData.items.map((item: ModalidadeItem) =>
          fetch(`${BASE}/api/modalities`, {
            method: "POST",
            headers: jsonHdr(),
            body: JSON.stringify({ name: item.name, color: item.color }),
          })
        )
      );
      return true;
    } catch {
      toast({ title: "Erro de conexão ao salvar modalidades", variant: "destructive" });
      return false;
    }
  };

  const saveStep2 = async (): Promise<boolean> => {
    if (Object.values(visualData).some((v) => !isValidHex(v))) {
      toast({ title: "Cor inválida", description: "Use o formato #RRGGBB para todas as cores.", variant: "destructive" });
      return false;
    }
    try {
      const res  = await fetch(`${BASE}/api/theme`, { method: "PUT", headers: jsonHdr(), body: JSON.stringify(visualData) });
      const json = await res.json();
      if (!json.success) { toast({ title: "Erro ao salvar cores", description: json.error, variant: "destructive" }); return false; }
      try {
        const prev = JSON.parse(localStorage.getItem("theme") ?? "{}");
        localStorage.setItem("theme", JSON.stringify({ ...prev, ...visualData }));
      } catch { /* ignore */ }
      return true;
    } catch {
      toast({ title: "Erro de conexão", variant: "destructive" });
      return false;
    }
  };

  const goNext = async () => {
    setSaving(true);
    try {
      if (step === 1 && !(await saveStep1())) return;
      if (step === 2 && !(await saveStep2())) return;
      if (step === 3 && !(await saveStep3())) return;
      if (step === 4 && !(await saveStep4())) return;
      if (step === 5 && !(await saveStep5())) return;
    } finally {
      setSaving(false);
    }
    await advance();
  };

  const goBack  = () => setStep((s) => s - 1);
  const skipStep = () => { setStep((s) => s + 1); };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <img src={averaLogo} alt="Avera" className="h-8 w-auto" />
        <span className="text-xs text-muted-foreground font-medium">
          Configuração inicial · {step} de {STEPS.length}
        </span>
      </header>

      {/* Progress */}
      <div className="px-6 lg:px-16 pt-8 pb-4 max-w-3xl mx-auto w-full">
        <ProgressBar current={step} total={STEPS.length} />
      </div>

      {/* Content card */}
      <div className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-2xl">
          {/* Step header */}
          <div className="mb-8 space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Passo {step} de {STEPS.length}
            </p>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              {meta.title}
            </h1>
            <p className="text-sm text-muted-foreground">{meta.description}</p>
          </div>

          {/* Step body */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <StepContent
              step={step}
              empresaData={empresaData}       onEmpresaChange={setEmpresaData}
              visualData={visualData}         onVisualChange={setVisualData}
              modalidadesData={modalidadesData} onModalidadesChange={setModalidadesData}
              tiposData={tiposData}             onTiposChange={setTiposData}
              enderecoData={enderecoData}       onEnderecoChange={setEnderecoData}
              empresaName={empresaData.companyName}
              modalidadesCount={modalidadesData.items.length}
              tiposCount={tiposData.items.length}
              hasEndereco={!!(enderecoData.city && enderecoData.street)}
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={isFirst}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </Button>

            <div className="flex items-center gap-3">
              {meta.skippable && !isLast && (
                <Button variant="ghost" className="text-muted-foreground" onClick={skipStep}>
                  Pular esta etapa
                </Button>
              )}
              <Button onClick={goNext} disabled={saving} className="gap-1 shadow-md shadow-primary/20 min-w-32">
                {saving && "Salvando..."}
                {!saving && (isLast ? "Ir para o dashboard" : "Continuar")}
                {!saving && !isLast && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
