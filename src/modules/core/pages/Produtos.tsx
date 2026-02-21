import { useState } from "react";
import {
  Package,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import StatCard from "@/modules/core/components/dashboard/StatCard";
import ProductTable from "@/modules/core/components/produtos/ProductTable";
import ProdutoFormDialog from "@/modules/core/components/produtos/ProdutoFormDialog";
import ProdutoProfileDialog from "@/modules/core/components/produtos/ProdutoProfileDialog";
import ProdutoDeleteDialog from "@/modules/core/components/produtos/ProdutoDeleteDialog";
import { toast } from "@/hooks/use-toast";

export interface Produto {
  id: string;
  name: string;
  credits: number;
  validity: string;
  type: string;
  price: number;
  status: "active" | "inactive" | "pending";
  usageLimitPeriod: string;
  visibility: string;
  purchaseLimit: number;
  createdAt: string;
}

const MOCK_PRODUTOS: Produto[] = [
  {
    id: "1",
    name: "Pacote Mensal Tennis",
    credits: 8,
    validity: "30 dias",
    type: "Plano",
    price: 320,
    status: "active",
    usageLimitPeriod: "2 por semana",
    visibility: "Todos",
    purchaseLimit: 1,
    createdAt: "2025-01-10",
  },
  {
    id: "2",
    name: "Aula Avulsa Tennis",
    credits: 1,
    validity: "7 dias",
    type: "Avulso",
    price: 60,
    status: "active",
    usageLimitPeriod: "Sem limite",
    visibility: "Todos",
    purchaseLimit: 10,
    createdAt: "2025-01-15",
  },
  {
    id: "3",
    name: "Pacote Trimestral Futevôlei",
    credits: 24,
    validity: "90 dias",
    type: "Plano",
    price: 850,
    status: "active",
    usageLimitPeriod: "3 por semana",
    visibility: "Alunos ativos",
    purchaseLimit: 1,
    createdAt: "2025-02-01",
  },
  {
    id: "4",
    name: "Day Use",
    credits: 1,
    validity: "1 dia",
    type: "Avulso",
    price: 40,
    status: "inactive",
    usageLimitPeriod: "1 por dia",
    visibility: "Todos",
    purchaseLimit: 5,
    createdAt: "2024-12-20",
  },
  {
    id: "5",
    name: "Pacote Semestral Premium",
    credits: 48,
    validity: "180 dias",
    type: "Plano",
    price: 1500,
    status: "pending",
    usageLimitPeriod: "4 por semana",
    visibility: "Convidados",
    purchaseLimit: 1,
    createdAt: "2025-03-01",
  },
];

const Produtos = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);

  const activeCount = MOCK_PRODUTOS.filter((p) => p.status === "active").length;
  const inactiveCount = MOCK_PRODUTOS.filter((p) => p.status === "inactive").length;

  const handleView = (produto: Produto) => {
    setSelectedProduto(produto);
    setProfileDialogOpen(true);
  };

  const handleEdit = (produto: Produto) => {
    setSelectedProduto(produto);
    setEditDialogOpen(true);
  };

  const handleDelete = (produto: Produto) => {
    setSelectedProduto(produto);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    toast({
      title: "Produto removido",
      description: `${selectedProduto?.name} foi removido com sucesso.`,
    });
    setDeleteDialogOpen(false);
    setSelectedProduto(null);
  };

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-foreground tracking-tight">Produtos</h1>
              <Badge variant="secondary" className="text-[10px] font-bold">
                {MOCK_PRODUTOS.length}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">Gerencie os produtos e pacotes do CT</p>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="shadow-md shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
          <ProdutoFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
          <ProdutoFormDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} />
          <ProdutoProfileDialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen} produto={selectedProduto} />
          <ProdutoDeleteDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            produtoName={selectedProduto?.name ?? null}
            onConfirm={handleConfirmDelete}
          />
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total de Produtos"
            value={String(MOCK_PRODUTOS.length)}
            change="+3"
            icon={Package}
            gradient="bg-gradient-to-br from-primary to-primary/70"
          />
          <StatCard
            label="Ativos"
            value={String(activeCount)}
            icon={CheckCircle}
            gradient="bg-gradient-to-br from-success to-success/70"
          />
          <StatCard
            label="Inativos"
            value={String(inactiveCount)}
            icon={XCircle}
            gradient="bg-gradient-to-br from-accent to-accent/70"
          />
        </div>

        <ProductTable
          data={MOCK_PRODUTOS}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default Produtos;
