import { useRef } from "react";
import { Palette } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface StepVisualData {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export const DEFAULT_VISUAL: StepVisualData = {
  primaryColor: "#3B82F6",
  secondaryColor: "#6c757d",
  accentColor: "#F59E0B",
};

interface Props {
  data: StepVisualData;
  onChange: (d: StepVisualData) => void;
}

const COLOR_FIELDS: { key: keyof StepVisualData; label: string; hint: string }[] = [
  { key: "primaryColor",   label: "Cor Principal",   hint: "Botões, links e destaques" },
  { key: "secondaryColor", label: "Cor Secundária",  hint: "Bordas e elementos de apoio" },
  { key: "accentColor",    label: "Cor de Destaque", hint: "Badges, tags e indicadores" },
];

const isValidHex = (v: string) => /^#[0-9A-Fa-f]{6}$/.test(v);

const StepVisual = ({ data, onChange }: Props) => {
  const pickerRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const setColor = (key: keyof StepVisualData, value: string) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="p-8 space-y-8">
      {/* Color pickers */}
      <div className="space-y-5">
        {COLOR_FIELDS.map(({ key, label, hint }) => (
          <div key={key} className="space-y-2">
            <Label className="text-sm font-semibold">{label}</Label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="h-10 w-10 shrink-0 rounded-lg border border-border shadow-sm transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/40"
                style={{ backgroundColor: data[key] }}
                onClick={() => pickerRefs.current[key]?.click()}
                aria-label={`Escolher ${label}`}
              />
              <input
                ref={(el) => { pickerRefs.current[key] = el; }}
                type="color"
                className="sr-only"
                value={isValidHex(data[key]) ? data[key] : "#000000"}
                onChange={(e) => setColor(key, e.target.value)}
              />
              <Input
                value={data[key]}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v.startsWith("#") && v.length <= 7) setColor(key, v);
                }}
                className={`font-mono h-10 w-36 ${!isValidHex(data[key]) ? "border-destructive" : ""}`}
                maxLength={7}
                placeholder="#000000"
              />
              <p className="text-xs text-muted-foreground hidden sm:block">{hint}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Live preview */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">Pré-visualização</Label>
        <div className="rounded-xl border border-border overflow-hidden shadow-sm bg-slate-50 dark:bg-slate-900">
          {/* Top bar */}
          <div className="flex items-center gap-2 px-4 py-2.5" style={{ backgroundColor: data.primaryColor }}>
            <div className="h-4 w-4 rounded bg-white/30" />
            <div className="h-2 w-24 rounded bg-white/60" />
            <div className="ml-auto flex gap-1.5">
              <div className="h-2 w-8 rounded bg-white/40" />
              <div className="h-2 w-8 rounded bg-white/40" />
            </div>
          </div>

          {/* Content area */}
          <div className="p-4 flex items-start gap-4">
            {/* Sidebar hint */}
            <div
              className="w-24 rounded-lg p-2 space-y-1.5 shrink-0"
              style={{ backgroundColor: data.secondaryColor + "18", border: `1px solid ${data.secondaryColor}30` }}
            >
              {[70, 50, 60].map((w, i) => (
                <div
                  key={i}
                  className="h-2 rounded"
                  style={{ width: `${w}%`, backgroundColor: i === 0 ? data.primaryColor + "80" : data.secondaryColor + "50" }}
                />
              ))}
            </div>

            {/* Card */}
            <div className="flex-1 rounded-lg border border-border bg-background p-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-28 rounded bg-slate-200 dark:bg-slate-700" />
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: data.accentColor }}
                >
                  Novo
                </span>
              </div>
              <div className="space-y-1">
                <div className="h-2 w-full rounded bg-slate-100 dark:bg-slate-800" />
                <div className="h-2 w-4/5 rounded bg-slate-100 dark:bg-slate-800" />
              </div>
              <button
                className="text-[10px] font-semibold px-3 py-1 rounded-md text-white shadow-sm"
                style={{ backgroundColor: data.primaryColor }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Palette className="h-3.5 w-3.5" />
        Você pode ajustar as cores a qualquer momento em Configurações → Aparência.
      </p>
    </div>
  );
};

export default StepVisual;
