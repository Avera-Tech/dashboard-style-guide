import { useMemo } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import StatCard from "@/modules/core/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  GraduationCap,
  DollarSign,
  TrendingUp,
  Calendar,
  ClipboardList,
  Package,
  MessageSquare,
  ShoppingCart,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  CalendarCheck,
  Megaphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Mock data ---
const revenueData = [
  { month: "Set", receita: 18200, despesa: 9800 },
  { month: "Out", receita: 21500, despesa: 11200 },
  { month: "Nov", receita: 19800, despesa: 10500 },
  { month: "Dez", receita: 24300, despesa: 12100 },
  { month: "Jan", receita: 22100, despesa: 11800 },
  { month: "Fev", receita: 26800, despesa: 13200 },
];

const attendanceData = [
  { day: "Seg", presentes: 42, ausentes: 6 },
  { day: "Ter", presentes: 38, ausentes: 8 },
  { day: "Qua", presentes: 45, ausentes: 3 },
  { day: "Qui", presentes: 40, ausentes: 7 },
  { day: "Sex", presentes: 35, ausentes: 5 },
  { day: "Sáb", presentes: 28, ausentes: 2 },
];

const modalidadeData = [
  { name: "Tênis", value: 45, color: "hsl(224, 60%, 45%)" },
  { name: "Futevôlei", value: 25, color: "hsl(39, 95%, 55%)" },
  { name: "Beach Tennis", value: 20, color: "hsl(152, 60%, 40%)" },
  { name: "Padel", value: 10, color: "hsl(207, 90%, 54%)" },
];

const newStudentsData = [
  { month: "Set", alunos: 8 },
  { month: "Out", alunos: 12 },
  { month: "Nov", alunos: 6 },
  { month: "Dez", alunos: 15 },
  { month: "Jan", alunos: 10 },
  { month: "Fev", alunos: 18 },
];

const recentActivities = [
  { id: 1, text: "João Silva fez check-in na aula de Tênis", time: "Há 12 min", icon: CheckCircle2, type: "success" },
  { id: 2, text: "Novo aluno cadastrado: Maria Oliveira", time: "Há 45 min", icon: UserPlus, type: "info" },
  { id: 3, text: "Pagamento recebido — Plano Mensal (R$ 350)", time: "Há 1h", icon: DollarSign, type: "success" },
  { id: 4, text: "Aula de Futevôlei cancelada (chuva)", time: "Há 2h", icon: AlertCircle, type: "warning" },
  { id: 5, text: "Lembrete enviado para 12 alunos", time: "Há 3h", icon: MessageSquare, type: "info" },
];

const upcomingClasses = [
  { id: 1, turma: "Tênis Avançado", hora: "14:00", professor: "Carlos M.", alunos: "6/8" },
  { id: 2, turma: "Futevôlei Iniciante", hora: "15:30", professor: "Ana P.", alunos: "10/12" },
  { id: 3, turma: "Beach Tennis", hora: "17:00", professor: "Roberto S.", alunos: "4/6" },
];

const topPlans = [
  { name: "Plano Mensal", vendas: 34, porcentagem: 68 },
  { name: "Plano Trimestral", vendas: 18, porcentagem: 45 },
  { name: "Aula Avulsa", vendas: 12, porcentagem: 30 },
];

const quickActions = [
  { label: "Alunos", icon: GraduationCap, href: "/users", color: "bg-primary/10 text-primary" },
  { label: "Aulas", icon: ClipboardList, href: "/aulas", color: "bg-success/10 text-success" },
  { label: "Turmas", icon: Calendar, href: "/turmas", color: "bg-accent/10 text-accent-foreground" },
  { label: "Financeiro", icon: DollarSign, href: "/financeiro", color: "bg-info/10 text-info" },
  { label: "Vendas", icon: ShoppingCart, href: "/vendas", color: "bg-warning/10 text-warning" },
  { label: "Produtos", icon: Package, href: "/produtos", color: "bg-destructive/10 text-destructive" },
  { label: "CRM", icon: MessageSquare, href: "/crm", color: "bg-primary/10 text-primary" },
  { label: "Anúncios", icon: Megaphone, href: "/anuncios", color: "bg-success/10 text-success" },
];

const revenueChartConfig = {
  receita: { label: "Receita", color: "hsl(224, 60%, 45%)" },
  despesa: { label: "Despesa", color: "hsl(0, 72%, 51%)" },
};

const attendanceChartConfig = {
  presentes: { label: "Presentes", color: "hsl(152, 60%, 40%)" },
  ausentes: { label: "Ausentes", color: "hsl(0, 72%, 51%)" },
};

const newStudentsChartConfig = {
  alunos: { label: "Novos Alunos", color: "hsl(207, 90%, 54%)" },
};

const formatCurrency = (v: number) => `R$ ${(v / 1000).toFixed(1)}k`;

const Index = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Bom dia, Ana! 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Aqui está o resumo da sua operação hoje, <span className="font-medium text-foreground">20 de fevereiro</span>.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Alunos Ativos"
            value="127"
            change="+8%"
            icon={GraduationCap}
            gradient="bg-gradient-to-br from-primary to-primary/70"
          />
          <StatCard
            label="Aulas este mês"
            value="84"
            change="+12%"
            icon={ClipboardList}
            gradient="bg-gradient-to-br from-success to-success/70"
          />
          <StatCard
            label="Receita Mensal"
            value="R$ 26,8k"
            change="+15%"
            icon={DollarSign}
            gradient="bg-gradient-to-br from-accent to-accent/70"
          />
          <StatCard
            label="Taxa de Presença"
            value="87%"
            change="+3%"
            icon={TrendingUp}
            gradient="bg-gradient-to-br from-info to-info/70"
          />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Acesso Rápido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.href)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted/60 transition-all group"
                >
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${action.color} transition-transform group-hover:scale-110`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Receita vs Despesa</CardTitle>
                <Badge variant="secondary" className="text-xs">Últimos 6 meses</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={revenueChartConfig} className="h-[280px] w-full">
                <BarChart data={revenueData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220, 13%, 88%)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={formatCurrency} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="receita" fill="var(--color-receita)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="despesa" fill="var(--color-despesa)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Modalidades Pie */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold">Modalidades</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={modalidadeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {modalidadeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2">
                {modalidadeData.map((m) => (
                  <div key={m.name} className="flex items-center gap-2 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                    <span className="text-muted-foreground">{m.name}</span>
                    <span className="font-bold text-foreground ml-auto">{m.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Attendance Chart */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Frequência Semanal</CardTitle>
                <Badge variant="secondary" className="text-xs">Esta semana</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={attendanceChartConfig} className="h-[220px] w-full">
                <BarChart data={attendanceData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220, 13%, 88%)" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="presentes" fill="var(--color-presentes)" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="ausentes" fill="var(--color-ausentes)" radius={[4, 4, 0, 0]} stackId="a" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* New Students Area Chart */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Novos Alunos</CardTitle>
                <Badge variant="secondary" className="text-xs">Últimos 6 meses</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={newStudentsChartConfig} className="h-[220px] w-full">
                <AreaChart data={newStudentsData}>
                  <defs>
                    <linearGradient id="alunosGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(207, 90%, 54%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(207, 90%, 54%)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220, 13%, 88%)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="alunos"
                    stroke="var(--color-alunos)"
                    strokeWidth={2.5}
                    fill="url(#alunosGradient)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row: Activities, Upcoming, Top Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Atividade Recente</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((a) => (
                <div key={a.id} className="flex items-start gap-3">
                  <div className={`mt-0.5 h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                    a.type === "success" ? "bg-success/10 text-success" :
                    a.type === "warning" ? "bg-warning/10 text-warning" :
                    "bg-info/10 text-info"
                  }`}>
                    <a.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground leading-snug">{a.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Classes */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Próximas Aulas</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => navigate("/aulas")}>
                  Ver todas <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingClasses.map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CalendarCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{c.turma}</p>
                    <p className="text-[11px] text-muted-foreground">{c.professor} · {c.alunos} alunos</p>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {c.hora}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Plans */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Planos Populares</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => navigate("/produtos")}>
                  Ver todos <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPlans.map((plan) => (
                <div key={plan.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{plan.name}</span>
                    <span className="text-xs font-bold text-muted-foreground">{plan.vendas} vendas</span>
                  </div>
                  <Progress value={plan.porcentagem} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
