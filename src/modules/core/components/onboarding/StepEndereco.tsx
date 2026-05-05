import { useState } from "react";
import { MapPin, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export interface StepEnderecoData {
  zipCode:      string;
  street:       string;
  number:       string;
  complement:   string;
  neighborhood: string;
  city:         string;
  state:        string;
}

export const EMPTY_ENDERECO: StepEnderecoData = {
  zipCode: "", street: "", number: "", complement: "", neighborhood: "", city: "", state: "",
};

interface Props {
  data: StepEnderecoData;
  onChange: (d: StepEnderecoData) => void;
}

const formatZip = (v: string) => {
  const digits = v.replace(/\D/g, "").slice(0, 8);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
};

const StepEndereco = ({ data, onChange }: Props) => {
  const [fetching, setFetching] = useState(false);

  const set = <K extends keyof StepEnderecoData>(k: K, v: StepEnderecoData[K]) =>
    onChange({ ...data, [k]: v });

  const lookupCep = async () => {
    const digits = data.zipCode.replace(/\D/g, "");
    if (digits.length !== 8) {
      toast({ title: "CEP inválido", description: "Digite um CEP com 8 dígitos.", variant: "destructive" });
      return;
    }
    setFetching(true);
    try {
      const res  = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const json = await res.json();
      if (json.erro) {
        toast({ title: "CEP não encontrado", variant: "destructive" });
        return;
      }
      onChange({
        ...data,
        street:       json.logradouro ?? "",
        neighborhood: json.bairro     ?? "",
        city:         json.localidade ?? "",
        state:        json.uf         ?? "",
      });
    } catch {
      toast({ title: "Erro ao buscar CEP", variant: "destructive" });
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* CEP */}
      <div className="space-y-2">
        <Label htmlFor="zip" className="text-sm font-semibold">CEP</Label>
        <div className="flex gap-2">
          <Input
            id="zip"
            value={data.zipCode}
            onChange={(e) => set("zipCode", formatZip(e.target.value))}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); lookupCep(); } }}
            placeholder="00000-000"
            className="h-11 max-w-[160px] font-mono"
            maxLength={9}
          />
          <Button
            type="button"
            variant="outline"
            className="h-11 gap-2"
            onClick={lookupCep}
            disabled={fetching}
          >
            {fetching
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <Search className="h-4 w-4" />}
            {fetching ? "Buscando..." : "Buscar"}
          </Button>
        </div>
      </div>

      {/* Street */}
      <div className="space-y-2">
        <Label htmlFor="street" className="text-sm font-semibold">Logradouro</Label>
        <Input
          id="street"
          value={data.street}
          onChange={(e) => set("street", e.target.value)}
          placeholder="Rua, Avenida, Alameda..."
          className="h-11"
        />
      </div>

      {/* Number + Complement */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="number" className="text-sm font-semibold">Número</Label>
          <Input
            id="number"
            value={data.number}
            onChange={(e) => set("number", e.target.value)}
            placeholder="123"
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="complement" className="text-sm font-semibold">
            Complemento <span className="text-muted-foreground font-normal">(opcional)</span>
          </Label>
          <Input
            id="complement"
            value={data.complement}
            onChange={(e) => set("complement", e.target.value)}
            placeholder="Sala 2, Bloco B..."
            className="h-11"
          />
        </div>
      </div>

      {/* Neighborhood */}
      <div className="space-y-2">
        <Label htmlFor="neighborhood" className="text-sm font-semibold">Bairro</Label>
        <Input
          id="neighborhood"
          value={data.neighborhood}
          onChange={(e) => set("neighborhood", e.target.value)}
          placeholder="Centro"
          className="h-11"
        />
      </div>

      {/* City + State */}
      <div className="grid grid-cols-[1fr_100px] gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-semibold">Cidade</Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="São Paulo"
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state" className="text-sm font-semibold">Estado</Label>
          <Input
            id="state"
            value={data.state}
            onChange={(e) => set("state", e.target.value.toUpperCase().slice(0, 2))}
            placeholder="SP"
            className="h-11 font-mono uppercase"
            maxLength={2}
          />
        </div>
      </div>

      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        Você pode pular esta etapa e preencher o endereço depois em Configurações.
      </p>
    </div>
  );
};

export default StepEndereco;
