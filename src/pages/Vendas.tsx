import { useState } from "react";
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  Tag,
  User,
  Percent,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { toast } from "@/hooks/use-toast";

interface ProdutoVenda {
  id: string;
  name: string;
  credits: number;
  price: number;
  type: string;
  validity: string;
}

const PRODUTOS_DISPONIVEIS: ProdutoVenda[] = [
  { id: "1", name: "Pacote Mensal Tennis", credits: 8, price: 320, type: "Plano", validity: "30 dias" },
  { id: "2", name: "Aula Avulsa Tennis", credits: 1, price: 60, type: "Avulso", validity: "7 dias" },
  { id: "3", name: "Pacote Trimestral Futevôlei", credits: 24, price: 850, type: "Plano", validity: "90 dias" },
  { id: "5", name: "Pacote Semestral Premium", credits: 48, price: 1500, type: "Plano", validity: "180 dias" },
];

const MOCK_ALUNOS = [
  { id: "1", name: "Carlos Silva" },
  { id: "2", name: "Ana Paula Costa" },
  { id: "3", name: "Pedro Mendes" },
  { id: "4", name: "Julia Ferreira" },
  { id: "5", name: "Rafael Santos" },
];

interface CartItem {
  produto: ProdutoVenda;
  quantity: number;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const Vendas = () => {
  const [step, setStep] = useState<"products" | "checkout">("products");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedAluno, setSelectedAluno] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("0");
  const [paymentType, setPaymentType] = useState("");

  const filteredProducts = PRODUTOS_DISPONIVEIS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (produto: ProdutoVenda) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.produto.id === produto.id);
      if (existing) {
        return prev.map((i) =>
          i.produto.id === produto.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { produto, quantity: 1 }];
    });
  };

  const updateQuantity = (produtoId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.produto.id === produtoId ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const subtotal = cart.reduce((sum, i) => sum + i.produto.price * i.quantity, 0);

  const discountAmount =
    discountType === "percentage"
      ? subtotal * (parseFloat(discountValue || "0") / 100)
      : parseFloat(discountValue || "0");

  const total = Math.max(0, subtotal - discountAmount);

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleFinalize = () => {
    if (!selectedAluno) {
      toast({ title: "Selecione um aluno", description: "É necessário vincular a venda a um aluno.", variant: "destructive" });
      return;
    }
    if (!paymentType) {
      toast({ title: "Selecione o pagamento", description: "Escolha o tipo de pagamento.", variant: "destructive" });
      return;
    }
    const alunoName = MOCK_ALUNOS.find((a) => a.id === selectedAluno)?.name;
    toast({
      title: "Venda finalizada!",
      description: `Venda de ${formatCurrency(total)} para ${alunoName} registrada com sucesso.`,
    });
    setCart([]);
    setStep("products");
    setSelectedAluno("");
    setDiscountValue("0");
    setPaymentType("");
  };

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step === "checkout" && (
              <Button variant="ghost" size="icon" onClick={() => setStep("products")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div>
              <h1 className="text-xl font-extrabold text-foreground tracking-tight">
                {step === "products" ? "Vendas" : "Vender Créditos"}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {step === "products"
                  ? "Selecione os produtos para venda"
                  : "Complete os dados da venda"}
              </p>
            </div>
          </div>
          {step === "products" && cart.length > 0 && (
            <Button onClick={() => setStep("checkout")} className="shadow-md shadow-primary/20">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Continuar ({totalItems})
            </Button>
          )}
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6">
        {step === "products" ? (
          <div className="space-y-6">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((produto) => {
                const inCart = cart.find((i) => i.produto.id === produto.id);
                return (
                  <Card
                    key={produto.id}
                    className={`cursor-pointer transition-all hover:shadow-md hover:shadow-primary/5 ${
                      inCart ? "border-primary ring-1 ring-primary/20" : ""
                    }`}
                    onClick={() => addToCart(produto)}
                  >
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="font-semibold text-sm text-foreground">{produto.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px]">
                              {produto.type}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground">
                              {produto.credits} crédito{produto.credits > 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                        {inCart && (
                          <Badge className="text-[10px]">{inCart.quantity}</Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{produto.validity}</span>
                        <span className="font-bold text-sm text-foreground">
                          {formatCurrency(produto.price)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Tag className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm">Nenhum produto encontrado</p>
              </div>
            )}
          </div>
        ) : (
          /* Checkout Step */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Checkout</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Aluno */}
                  <div className="space-y-2">
                    <Label>Aluno</Label>
                    <Select value={selectedAluno} onValueChange={setSelectedAluno}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pesquise o aluno..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_ALUNOS.map((a) => (
                          <SelectItem key={a.id} value={a.id}>
                            {a.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Discount + Payment */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Tipo de Desconto</Label>
                      <Select value={discountType} onValueChange={setDiscountType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Porcentagem (%)</SelectItem>
                          <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>
                        Desconto {discountType === "percentage" ? "(%)" : "(R$)"}
                      </Label>
                      <Input
                        type="number"
                        min="0"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Tipo de Pagamento</Label>
                      <Select value={paymentType} onValueChange={setPaymentType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pix">PIX</SelectItem>
                          <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                          <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                          <SelectItem value="dinheiro">Dinheiro</SelectItem>
                          <SelectItem value="boleto">Boleto</SelectItem>
                          <SelectItem value="externo">Pagamento Externo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  {/* Actions */}
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <Button
                      variant="outline"
                      className="min-w-[140px]"
                      onClick={() => setStep("products")}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="min-w-[140px] shadow-md shadow-primary/20"
                      onClick={handleFinalize}
                    >
                      Finalizar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resumo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.produto.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-foreground truncate mr-2">
                          {item.produto.name}
                        </p>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => updateQuantity(item.produto.id, -1)}
                            className="h-6 w-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.produto.id, 1)}
                            className="h-6 w-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Valor</span>
                        <span>{formatCurrency(item.produto.price)}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Subtotal</span>
                        <span>{formatCurrency(item.produto.price * item.quantity)}</span>
                      </div>
                      <Separator className="mt-2" />
                    </div>
                  ))}

                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Desconto</span>
                      <span className="text-destructive">- {formatCurrency(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-bold text-foreground text-lg">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Vendas;
