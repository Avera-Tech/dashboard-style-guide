import { useState, useEffect, useCallback } from "react";
import {
  Package,
  Plus,
  CheckCircle,
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
import type { Produto } from "@/modules/core/types/product";
import productsRepository from "@/modules/core/api/products";
import ProductsCollection from "@/modules/core/api/products";

export type { Produto };

const MOCK_PRODUTOS: any = [
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
    updatedAt: "2025-01-10",
    recurring: true,
    validityDays: 30,
    value: 320,
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
    updatedAt: "2025-01-15",
    recurring: false,
    validityDays: 7,
    value: 60,
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
    updatedAt: "2025-02-01",
    recurring: true,
    validityDays: 90,
    value: 850,
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
    updatedAt: "2024-12-20",
    recurring: false,
    validityDays: 1,
    value: 40,
  },
  {
    id: "5",
    name: "Pacote Semestral Premium",
    credits: 48,
    validity: "180 dias",
    type: "Plano",
    price: 1500,
    status: "active",
    usageLimitPeriod: "4 por semana",
    visibility: "Convidados",
    purchaseLimit: 1,
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01",
    recurring: true,
    validityDays: 180,
    value: 1500,
  },
];

const Produtos = () => {
  const repository = new ProductsCollection();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const fetchProdutos = useCallback(async () => {
    await repository.list().then(({ products }: { products: Produto[] }) => {
      setProdutos(products.map((p: Produto) => ({
        ...p,
        status: p.active ? "active" : "inactive",
        type: p.recurring ? "Plano" : "Avulso",
        price: Number(p.value),
        validity: p.validityDays + " dias",
      })));
    });
  }, [repository]);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const activeCount = produtos.filter((p) => p.status === "active").length;
  const inactiveCount = produtos.filter((p) => p.status === "inactive").length;

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
                {produtos.length}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">Gerencie os produtos e pacotes do CT</p>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="shadow-md shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
          <ProdutoFormDialog open={dialogOpen} onOpenChange={setDialogOpen} onSuccess={fetchProdutos} />
          <ProdutoFormDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} onSuccess={fetchProdutos} />
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
            value={String(produtos.length)}
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
          data={produtos}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default Produtos;
