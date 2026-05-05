import { useState, useRef } from "react";
import { Building2, Upload, X, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useTenant } from "@/contexts/ClientContext";

const BASE      = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const authHdr   = (extra?: Record<string, string>) => ({
  Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
  "X-Client-Id": localStorage.getItem("clientId") ?? "",
  ...extra,
});

export interface StepEmpresaData {
  companyName: string;
  logoUrl: string;
}

interface Props {
  data: StepEmpresaData;
  onChange: (d: StepEmpresaData) => void;
}

const StepEmpresa = ({ data, onChange }: Props) => {
  const tenant          = useTenant();
  const [uploading, setUploading] = useState(false);
  const inputRef        = useRef<HTMLInputElement>(null);

  const setField = <K extends keyof StepEmpresaData>(k: K, v: StepEmpresaData[K]) =>
    onChange({ ...data, [k]: v });

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("logo", file);
      const res  = await fetch(`${BASE}/api/theme/upload/logo`, {
        method: "POST",
        headers: authHdr(),
        body: form,
      });
      const json = await res.json();
      if (json.success) {
        setField("logoUrl", json.url);
      } else {
        toast({ title: "Erro no upload", description: json.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Erro de conexão no upload", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Company name */}
      <div className="space-y-2">
        <Label htmlFor="company-name" className="text-sm font-semibold">
          Nome da empresa
        </Label>
        <Input
          id="company-name"
          value={data.companyName}
          onChange={(e) => setField("companyName", e.target.value)}
          placeholder={tenant?.name ?? "Nome da sua empresa"}
          className="h-12 text-base"
        />
        <p className="text-xs text-muted-foreground">
          Este nome aparece no sidebar e em documentos gerados pelo sistema.
        </p>
      </div>

      {/* Logo upload */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Logo da empresa</Label>

        {data.logoUrl ? (
          /* Preview */
          <div className="relative flex items-center gap-4 rounded-xl border border-border bg-muted/30 p-5">
            <div className="flex h-20 w-40 items-center justify-center rounded-lg bg-background border border-border">
              <img
                src={data.logoUrl}
                alt="Logo"
                className="h-full w-auto max-w-full object-contain p-2"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Logo enviada com sucesso
              </div>
              <p className="text-xs text-muted-foreground">
                Clique em "Trocar" para enviar outra imagem.
              </p>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-xs text-primary hover:underline font-medium"
              >
                Trocar logo
              </button>
            </div>
            <button
              type="button"
              onClick={() => setField("logoUrl", "")}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          /* Drop zone */
          <label
            className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/20 py-12 cursor-pointer transition-colors hover:border-primary/40 hover:bg-muted/40 ${uploading ? "opacity-60 pointer-events-none" : ""}`}
          >
            {uploading ? (
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            ) : (
              <>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium text-foreground">Clique para enviar a logo</p>
                  <p className="text-xs text-muted-foreground">PNG, SVG ou JPEG · máx. 2 MB · recomendado 200×60 px</p>
                </div>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
                e.target.value = "";
              }}
            />
          </label>
        )}

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Building2 className="h-3.5 w-3.5" />
          Você pode pular esta etapa e adicionar a logo depois em Configurações.
        </p>
      </div>
    </div>
  );
};

export default StepEmpresa;
