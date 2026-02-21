import SectionHeader from "./SectionHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectorsSection = () => (
  <section>
    <SectionHeader title="Seletores" description="Checkboxes, radio buttons, switches e selects." />
    <div className="bg-card rounded-xl border border-border p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Checkboxes */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Checkbox</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox id="check1" defaultChecked />
              <Label htmlFor="check1">Opção selecionada</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="check2" />
              <Label htmlFor="check2">Opção não selecionada</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="check3" disabled />
              <Label htmlFor="check3" className="text-muted-foreground">Desabilitado</Label>
            </div>
          </div>
        </div>

        {/* Radio */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Radio</h3>
          <RadioGroup defaultValue="option1" className="space-y-3">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="option1" id="r1" />
              <Label htmlFor="r1">Opção 1</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="option2" id="r2" />
              <Label htmlFor="r2">Opção 2</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="option3" id="r3" />
              <Label htmlFor="r3">Opção 3</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Switch */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Switch</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sw1">Notificações</Label>
              <Switch id="sw1" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sw2">Modo escuro</Label>
              <Switch id="sw2" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sw3" className="text-muted-foreground">Desabilitado</Label>
              <Switch id="sw3" disabled />
            </div>
          </div>
        </div>

        {/* Select */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Select</h3>
          <div className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="opt1">Opção 1</SelectItem>
                <SelectItem value="opt2">Opção 2</SelectItem>
                <SelectItem value="opt3">Opção 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SelectorsSection;
