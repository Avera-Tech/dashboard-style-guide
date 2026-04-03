import { useState } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Bell } from "lucide-react";

const perfis = ["Admin", "Médico", "Caixa", "Recepção", "Auditoria"];

const funcionalidades = [
  { label: "Ver prontuários", perms: [true, true, false, false, true] },
  { label: "Editar prontuários", perms: [true, true, false, false, false] },
  { label: "Agendar consultas", perms: [true, false, false, true, false] },
  { label: "Acessar financeiro", perms: [true, false, true, false, false] },
  { label: "Relatórios gerenciais", perms: [true, false, false, false, true] },
  { label: "Gerenciar usuários", perms: [true, false, false, false, false] },
  { label: "Configurações", perms: [true, false, false, false, false] },
];

const ClinicPermissoes = () => {
  const [search, setSearch] = useState("");
  const [matrix, setMatrix] = useState(funcionalidades.map((f) => [...f.perms]));

  const toggle = (row: number, col: number) => {
    setMatrix((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = !next[row][col];
      return next;
    });
  };

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">Controle de acesso</h1>
            <p className="text-sm text-muted-foreground mt-0.5">segurança / permissões</p>
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
            <h2 className="text-lg font-semibold text-foreground">Controle de acesso</h2>
            <p className="text-sm text-muted-foreground">Permissões por perfil de usuário</p>
          </div>
          <Button>+ Novo perfil</Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Matriz de permissões</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-semibold uppercase text-muted-foreground tracking-wide py-3 pr-4">Funcionalidade</th>
                  {perfis.map((p) => (
                    <th key={p} className="text-center text-xs font-semibold uppercase text-muted-foreground tracking-wide py-3 px-4">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {funcionalidades.map((f, ri) => (
                  <tr key={f.label} className="border-b border-border last:border-0">
                    <td className="text-sm text-foreground py-4 pr-4">{f.label}</td>
                    {perfis.map((_, ci) => (
                      <td key={ci} className="text-center py-4 px-4">
                        <div className="flex justify-center">
                          <Checkbox checked={matrix[ri][ci]} onCheckedChange={() => toggle(ri, ci)} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClinicPermissoes;
