import { ReactNode } from "react";
import {
  LayoutDashboard,
  Users as UsersIcon,
  GraduationCap,
  Briefcase,
  Package,
  Calendar,
  ClipboardList,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NavLink } from "@/components/NavLink";

const navItems: { label: string; icon: typeof LayoutDashboard; href: string; indent?: boolean }[] = [
  { label: "Visão Geral", icon: LayoutDashboard, href: "/" },
  { label: "Alunos", icon: GraduationCap, href: "/alunos" },
  { label: "Funcionários", icon: Briefcase, href: "/funcionarios" },
  { label: "Produtos", icon: Package, href: "/produtos" },
  { label: "Turmas", icon: Calendar, href: "/turmas" },
  { label: "Aulas", icon: ClipboardList, href: "/aulas" },
  { label: "Financeiro", icon: DollarSign, href: "/financeiro" },
  { label: "Contas a Receber", icon: ArrowDownCircle, href: "/financeiro/receber", indent: true },
  { label: "Contas a Pagar", icon: ArrowUpCircle, href: "/financeiro/pagar", indent: true },
  { label: "Relatórios", icon: BarChart3, href: "/relatorios" },
  { label: "Configurações", icon: Settings, href: "/configuracoes" },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 border-r border-border bg-card/50 backdrop-blur-sm flex-col min-h-screen sticky top-0">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-sm font-extrabold text-primary-foreground">D</span>
              </div>
              <div>
                <span className="font-bold text-sm text-foreground">Dashboard</span>
                <p className="text-[10px] text-muted-foreground font-medium">Painel administrativo</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                end={item.href === "/financeiro"}
                className={`w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted/60 ${item.indent ? "pl-9 text-xs" : ""}`}
                activeClassName="bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary hover:text-primary-foreground"
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 m-3 mb-4 rounded-xl bg-muted/40 border border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">AS</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">Ana Silva</p>
                <p className="text-[11px] text-muted-foreground truncate">Administradora</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
