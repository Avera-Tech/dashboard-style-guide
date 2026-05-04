import { ReactNode, useState } from "react";
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
  MessageSquare,
  Dumbbell,
  Stethoscope,
  Clock,
  CalendarCheck,
  ListOrdered,
  Plug,
  ChevronDown,
  ShoppingCart,
  Megaphone,
  Building2,
  BoxesIcon,
  UserCheck,
  PhoneCall,
  Star,
  CreditCard,
  TrendingDown,
  Shield,
  ScrollText,
  Lock,
  HardDrive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { companyConfig } from "@/modules/core/data/company-config";
import { useTenant } from "@/contexts/ClientContext";
import { useCurrentUser, getInitials } from "@/hooks/use-current-user";
import averaLogo from "@/assets/avera-logo.png";

interface NavItem {
  label: string;
  icon: typeof LayoutDashboard;
  href: string;
  indent?: boolean;
}

interface NavGroup {
  label: string;
  icon: typeof LayoutDashboard;
  items: NavItem[];
  defaultOpen?: boolean;
  groupType?: "fit" | "clinic";
}

const fitNavGroups: NavGroup[] = [
  {
    label: "Core",
    icon: LayoutDashboard,
    defaultOpen: true,
    items: [
      { label: "Visão Geral", icon: LayoutDashboard, href: "/dashboard" },
      { label: "Produtos", icon: Package, href: "/produtos" },
      { label: "CRM", icon: MessageSquare, href: "/crm" },
      { label: "Vendas", icon: ShoppingCart, href: "/vendas" },
      { label: "Anúncios", icon: Megaphone, href: "/anuncios" },
      { label: "Financeiro", icon: DollarSign, href: "/financeiro" },
      { label: "Contas a Receber", icon: ArrowDownCircle, href: "/financeiro/receber", indent: true },
      { label: "Contas a Pagar", icon: ArrowUpCircle, href: "/financeiro/pagar", indent: true },
      { label: "Relatórios", icon: BarChart3, href: "/relatorios" },
      { label: "Cadastros", icon: ClipboardList, href: "/cadastros" },
      { label: "Configurações", icon: Settings, href: "/configuracoes" },
    ],
  },
  {
    label: "Operação Fit",
    icon: Dumbbell,
    defaultOpen: true,
    items: [
      { label: "Alunos", icon: GraduationCap, href: "/users" },
      { label: "Funcionários", icon: Briefcase, href: "/staff" },
      { label: "Turmas", icon: Calendar, href: "/turmas" },
      { label: "Aulas", icon: ClipboardList, href: "/aulas" },
      { label: "Agendamento", icon: CalendarCheck, href: "/agendamento" },
      { label: "Lista de Espera", icon: ListOrdered, href: "/lista-espera" },
      { label: "Integrações", icon: Plug, href: "/integracoes" },
    ],
  },
];

const clinicNavGroups: NavGroup[] = [
  {
    label: "Principal",
    icon: LayoutDashboard,
    defaultOpen: true,
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/clinica" },
      { label: "Agenda", icon: CalendarCheck, href: "/clinica/agenda" },
      { label: "Pacientes", icon: UsersIcon, href: "/clinica/pacientes" },
      { label: "Médicos", icon: Stethoscope, href: "/clinica/medicos" },
    ],
  },
  {
    label: "Operacional",
    icon: Building2,
    defaultOpen: true,
    items: [
      { label: "Salas e recursos", icon: Building2, href: "/clinica/salas" },
      { label: "Estoque", icon: BoxesIcon, href: "/clinica/estoque" },
      { label: "Escala médica", icon: Clock, href: "/clinica/escala" },
      { label: "Multi-unidades", icon: Building2, href: "/clinica/unidades" },
    ],
  },
  {
    label: "Paciente",
    icon: UserCheck,
    defaultOpen: true,
    items: [
      { label: "Confirmações WA", icon: PhoneCall, href: "/clinica/confirmacoes" },
      { label: "Painel de chamada", icon: MessageSquare, href: "/clinica/painel-chamada" },
      { label: "Satisfação / NPS", icon: Star, href: "/clinica/nps" },
    ],
  },
  {
    label: "Financeiro",
    icon: DollarSign,
    defaultOpen: false,
    items: [
      { label: "Convênios", icon: CreditCard, href: "/clinica/convenios" },
      { label: "DRE / Fluxo de caixa", icon: TrendingDown, href: "/clinica/dre" },
      { label: "Repasse médicos", icon: DollarSign, href: "/clinica/repasse" },
      { label: "Inadimplência", icon: ArrowDownCircle, href: "/clinica/inadimplencia" },
      { label: "Relatórios", icon: BarChart3, href: "/clinica/relatorios" },
    ],
  },
  {
    label: "Segurança",
    icon: Shield,
    defaultOpen: false,
    items: [
      { label: "Log de auditoria", icon: ScrollText, href: "/clinica/auditoria" },
      { label: "Permissões", icon: Lock, href: "/clinica/permissoes" },
      { label: "Backup", icon: HardDrive, href: "/clinica/backup" },
    ],
  },
];

const bothNavGroups: NavGroup[] = [
  ...fitNavGroups,
  {
    label: "Operação Clínica",
    icon: Stethoscope,
    defaultOpen: false,
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/clinica" },
      { label: "Pacientes", icon: UsersIcon, href: "/clinica/pacientes" },
      { label: "Agenda", icon: CalendarCheck, href: "/clinica/agenda" },
    ],
  },
];

function resolveNavGroups(): NavGroup[] {
  if (companyConfig.companyType === "clinic") return clinicNavGroups;
  if (companyConfig.companyType === "fit") return fitNavGroups;
  return bothNavGroups;
}

const navGroups: NavGroup[] = resolveNavGroups();

const SidebarGroup = ({ group }: { group: NavGroup }) => {
  const [open, setOpen] = useState(group.defaultOpen ?? true);

  return (
    <div className="space-y-0.5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70 hover:text-muted-foreground transition-colors"
      >
        <group.icon className="h-3.5 w-3.5" />
        <span className="flex-1 text-left">{group.label}</span>
        <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="space-y-0.5">
          {group.items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/financeiro" || item.href === "/clinica" || item.href === "/dashboard"}
              className={cn(
                "w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted/60",
                item.indent && "pl-9 text-xs"
              )}
              activeClassName="bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary hover:text-primary-foreground"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const tenant = useTenant();
  const currentUser = useCurrentUser();
  const logoSrc = tenant?.logo ?? averaLogo;
  const companyName = tenant?.name ?? companyConfig.companyName;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 border-r border-border bg-card/50 backdrop-blur-sm flex-col min-h-screen sticky top-0">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-center">
              <img src={logoSrc} alt={companyName} className="h-12 w-auto" />
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-3 overflow-y-auto">
            {navGroups.map((group) => (
              <SidebarGroup key={group.label} group={group} />
            ))}
          </nav>

          <div className="p-4 m-3 mb-4 rounded-xl bg-muted/40 border border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
                  {currentUser ? getInitials(currentUser.name) : "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{currentUser?.name ?? "—"}</p>
                <p className="text-[11px] text-muted-foreground truncate">{currentUser?.role ?? currentUser?.email ?? "—"}</p>
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
