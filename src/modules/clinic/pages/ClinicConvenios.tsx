import { useState } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Bell, Plus } from "lucide-react";
import { MOCK_CONVENIOS } from "@/modules/clinic/data/mock-convenios";

const ClinicConvenios = () => {
  const [search, setSearch] = useState("");

  const filtered = search
    ? MOCK_CONVENIOS.filter((c) => c.nome.toLowerCase().includes(search.toLowerCase()))
    : MOCK_CONVENIOS;

  const ativos = MOCK_CONVENIOS.filter((c) => c.status === "ativo").length;

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">Convênios</h1>
            <p className="text-sm text-muted-foreground mt-0.5">financeiro / convênios</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar paciente, médico..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 w-64" />
            </div>
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5 text-muted-foreground" /></Button>
          </div>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Convênios e planos</h2>
            <p className="text-sm text-muted-foreground">{ativos} convênios ativos</p>
          </div>
          <Button><Plus className="h-4 w-4 mr-1" /> Novo convênio</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((conv) => (
            <Card key={conv.id} className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <Avatar className="h-11 w-11">
                  <AvatarFallback style={{ backgroundColor: conv.cor, color: "white" }} className="text-sm font-bold">
                    {conv.iniciais}
                  </AvatarFallback>
                </Avatar>
                <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20 border-0 text-xs">
                  Ativo
                </Badge>
              </div>
              <div>
                <p className="font-semibold text-foreground">{conv.nome}</p>
                <p className="text-sm text-muted-foreground">{conv.plano}</p>
              </div>
              <div className="flex items-center gap-6 pt-1 border-t border-border">
                <div className="pt-3">
                  <p className="text-lg font-bold text-foreground">{conv.pacientes}</p>
                  <p className="text-xs text-muted-foreground uppercase">Pacientes</p>
                </div>
                <div className="pt-3">
                  <p className="text-lg font-bold text-foreground">{conv.receitaMes}</p>
                  <p className="text-xs text-muted-foreground uppercase">Mês</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClinicConvenios;
