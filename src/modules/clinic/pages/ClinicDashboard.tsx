import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import StatCard from "@/modules/core/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  CheckCircle2,
  DollarSign,
  Building2,
  ArrowRight,
  CalendarCheck,
  UserPlus,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  MOCK_CONSULTAS,
  MOCK_MEDICOS_ONLINE,
  MOCK_ESPECIALIDADES,
  statusConsultaConfig,
} from "@/modules/clinic/data/mock-clinica";

const quickActions = [
  { label: "Novo paciente", icon: UserPlus },
  { label: "Agendar", icon: CalendarCheck },
  { label: "Relatório", icon: FileText },
  { label: "Financeiro", icon: DollarSign },
];

const ClinicDashboard = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const maxConsultas = Math.max(...MOCK_ESPECIALIDADES.map((e) => e.consultas));

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              administração / visão geral
            </p>
          </div>
          <Button onClick={() => navigate("/clinica/agendamento")}>
            <CalendarCheck className="h-4 w-4 mr-2" />
            Ver agenda
          </Button>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        {/* Visão Geral + Data */}
        <div>
          <h2 className="text-lg font-bold text-foreground">Visão geral</h2>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Consultas Hoje"
            value="48"
            change="↑ 6 vs ontem"
            icon={Users}
            gradient="bg-gradient-to-br from-primary to-primary/70"
          />
          <StatCard
            label="Atendidos"
            value="31"
            change="64% do dia"
            icon={CheckCircle2}
            gradient="bg-gradient-to-br from-success to-success/70"
          />
          <StatCard
            label="Faturamento Hoje"
            value="R$14.2k"
            change="↑ R$2.1k vs média"
            icon={DollarSign}
            gradient="bg-gradient-to-br from-accent to-accent/70"
          />
          <StatCard
            label="Unidades Ativas"
            value="4"
            change="de 4 unidades"
            icon={Building2}
            gradient="bg-gradient-to-br from-info to-info/70"
          />
        </div>

        {/* Próximas Consultas + Calendário + Ações Rápidas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Próximas Consultas */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Próximas consultas</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs h-7">
                  Ver todas <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground pb-3">Horário</th>
                      <th className="text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground pb-3">Paciente</th>
                      <th className="text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground pb-3">Médico</th>
                      <th className="text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_CONSULTAS.map((consulta) => {
                      const config = statusConsultaConfig[consulta.status];
                      return (
                        <tr key={consulta.id} className="border-b border-border/50 last:border-0">
                          <td className="py-4">
                            <span className="text-sm font-semibold text-primary">{consulta.horario}</span>
                          </td>
                          <td className="py-4">
                            <div>
                              <p className="text-sm font-medium text-foreground">{consulta.paciente}</p>
                              <p className="text-xs text-muted-foreground">{consulta.pacienteId}</p>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="text-sm text-foreground">{consulta.medico}</span>
                          </td>
                          <td className="py-4">
                            <span className={`text-sm font-semibold ${config.className}`}>
                              {config.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar: Calendar + Quick Actions */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold">Calendário</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold">Ações rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.label}
                      variant="outline"
                      className="h-auto py-3 px-4 justify-start text-sm font-medium"
                    >
                      <action.icon className="h-4 w-4 mr-2 shrink-0" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Row: Médicos Online + Consultas por Especialidade */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Médicos Online */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Médicos online</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_MEDICOS_ONLINE.map((medico) => (
                <div key={medico.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback
                      className="text-xs font-bold text-primary-foreground"
                      style={{ backgroundColor: medico.cor }}
                    >
                      {medico.iniciais}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground truncate">{medico.nome}</p>
                      <span className="h-2 w-2 rounded-full bg-success shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground">{medico.especialidade}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-foreground">{medico.atendimentosHoje}</p>
                    <p className="text-[10px] text-muted-foreground">hoje</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Consultas por Especialidade */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Consultas por especialidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_ESPECIALIDADES.map((esp) => (
                <div key={esp.especialidade} className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-28 shrink-0 truncate">
                    {esp.especialidade}
                  </span>
                  <div className="flex-1">
                    <div className="relative h-7 rounded-md overflow-hidden bg-muted/40">
                      <div
                        className="absolute inset-y-0 left-0 rounded-md flex items-center pl-3"
                        style={{
                          width: `${(esp.consultas / maxConsultas) * 100}%`,
                          backgroundColor: esp.cor,
                        }}
                      >
                        <span className="text-xs font-bold text-primary-foreground">{esp.consultas}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClinicDashboard;
