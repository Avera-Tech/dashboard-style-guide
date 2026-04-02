import { useState, useMemo } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, Bell } from "lucide-react";
import { MOCK_MEDICOS } from "@/modules/clinic/data/mock-medicos";

const ClinicMedicos = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return MOCK_MEDICOS;
    const q = search.toLowerCase();
    return MOCK_MEDICOS.filter(
      (m) =>
        m.nome.toLowerCase().includes(q) ||
        m.especialidade.toLowerCase().includes(q) ||
        m.crm.toLowerCase().includes(q)
    );
  }, [search]);

  const totalCadastrados = MOCK_MEDICOS.length;
  const ativosHoje = MOCK_MEDICOS.filter((m) => m.status === "online").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Médicos</h1>
            <p className="text-sm text-muted-foreground">administração / médicos</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar paciente, médico..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Subheader */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Médicos</h2>
            <p className="text-sm text-muted-foreground">
              {totalCadastrados} cadastrados · {ativosHoje} ativos hoje
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Cadastrar médico
          </Button>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((medico) => (
            <Card key={medico.id} className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <Avatar className="h-11 w-11">
                  <AvatarFallback
                    style={{ backgroundColor: medico.cor, color: "white" }}
                    className="text-sm font-semibold"
                  >
                    {medico.iniciais}
                  </AvatarFallback>
                </Avatar>
                <Badge
                  variant={medico.status === "online" ? "default" : "secondary"}
                  className={
                    medico.status === "online"
                      ? "bg-success/10 text-success hover:bg-success/20 border-0"
                      : "bg-muted text-muted-foreground hover:bg-muted border-0"
                  }
                >
                  {medico.status === "online" ? "Online" : "Offline"}
                </Badge>
              </div>

              <div>
                <p className="font-semibold text-foreground">{medico.nome}</p>
                <p className="text-sm text-muted-foreground">
                  {medico.crm} · {medico.especialidade}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <p className="text-lg font-bold text-foreground">{medico.atendimentosHoje}</p>
                  <p className="text-xs text-muted-foreground uppercase">Hoje</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{medico.atendimentosMes}</p>
                  <p className="text-xs text-muted-foreground uppercase">Mês</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{medico.avaliacao}</p>
                  <p className="text-xs text-muted-foreground uppercase">Avaliação</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClinicMedicos;
