import { useState, useRef } from "react";
import { X, Plus, Dumbbell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface ModalidadeItem {
  name: string;
  color: string;
}

export interface StepModalidadesData {
  items: ModalidadeItem[];
}

interface Props {
  data: StepModalidadesData;
  onChange: (d: StepModalidadesData) => void;
}

const SUGGESTIONS: ModalidadeItem[] = [
  { name: "Tênis",       color: "#3B82F6" },
  { name: "Padel",       color: "#8B5CF6" },
  { name: "Futevôlei",   color: "#F59E0B" },
  { name: "Natação",     color: "#06B6D4" },
  { name: "Musculação",  color: "#EF4444" },
  { name: "Yoga",        color: "#10B981" },
  { name: "Pilates",     color: "#EC4899" },
  { name: "Crossfit",    color: "#F97316" },
  { name: "Vôlei",       color: "#6366F1" },
  { name: "Basquete",    color: "#D97706" },
];

const DEFAULT_COLOR = "#3B82F6";

const isValidHex = (v: string) => /^#[0-9A-Fa-f]{6}$/.test(v);

const StepModalidades = ({ data, onChange }: Props) => {
  const [customName,  setCustomName]  = useState("");
  const [customColor, setCustomColor] = useState(DEFAULT_COLOR);
  const pickerRef = useRef<HTMLInputElement>(null);

  const selectedNames = new Set(data.items.map((i) => i.name.toLowerCase()));

  const toggleSuggestion = (s: ModalidadeItem) => {
    const key = s.name.toLowerCase();
    if (selectedNames.has(key)) {
      onChange({ items: data.items.filter((i) => i.name.toLowerCase() !== key) });
    } else {
      onChange({ items: [...data.items, s] });
    }
  };

  const addCustom = () => {
    const name = customName.trim();
    if (!name) return;
    if (selectedNames.has(name.toLowerCase())) {
      setCustomName("");
      return;
    }
    onChange({ items: [...data.items, { name, color: isValidHex(customColor) ? customColor : DEFAULT_COLOR }] });
    setCustomName("");
  };

  const remove = (name: string) =>
    onChange({ items: data.items.filter((i) => i.name !== name) });

  return (
    <div className="p-8 space-y-8">
      {/* Suggestions */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Sugestões</Label>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => {
            const active = selectedNames.has(s.name.toLowerCase());
            return (
              <button
                key={s.name}
                type="button"
                onClick={() => toggleSuggestion(s)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all"
                style={
                  active
                    ? { backgroundColor: s.color, borderColor: s.color, color: "#fff" }
                    : { backgroundColor: "transparent", borderColor: s.color + "60", color: s.color }
                }
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: active ? "rgba(255,255,255,0.7)" : s.color }}
                />
                {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom add */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">Adicionar personalizada</Label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-10 w-10 shrink-0 rounded-lg border border-border shadow-sm transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/40"
            style={{ backgroundColor: customColor }}
            onClick={() => pickerRef.current?.click()}
            aria-label="Escolher cor"
          />
          <input
            ref={pickerRef}
            type="color"
            className="sr-only"
            value={isValidHex(customColor) ? customColor : DEFAULT_COLOR}
            onChange={(e) => setCustomColor(e.target.value)}
          />
          <Input
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustom(); } }}
            placeholder="Ex: Beach Tennis"
            className="h-10 flex-1"
          />
          <Button type="button" variant="outline" size="icon" className="h-10 w-10 shrink-0" onClick={addCustom}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Selected list */}
      {data.items.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm font-semibold">
            Selecionadas <span className="text-muted-foreground font-normal">({data.items.length})</span>
          </Label>
          <div className="flex flex-wrap gap-2">
            {data.items.map((item) => (
              <span
                key={item.name}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: item.color }}
              >
                {item.name}
                <button
                  type="button"
                  onClick={() => remove(item.name)}
                  className="ml-0.5 hover:opacity-70 transition-opacity"
                  aria-label={`Remover ${item.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {data.items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-6 gap-2 text-center text-muted-foreground">
          <Dumbbell className="h-8 w-8 opacity-30" />
          <p className="text-sm">Nenhuma modalidade selecionada ainda.</p>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Você pode adicionar ou editar modalidades depois em Cadastros.
      </p>
    </div>
  );
};

export default StepModalidades;
