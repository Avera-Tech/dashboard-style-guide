import { useState } from "react";
import {
  ListOrdered,
  Users,
  Bell,
  BellRing,
  Trash2,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Send,
  AlertCircle,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { MOCK_LISTA_ESPERA, type AulaListaEspera, type FilaAluno } from "@/data/lista-espera";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const ListaEspera = () => {
  const [expandedAula, setExpandedAula] = useState<string | null>(MOCK_LISTA_ESPERA[0]?.id ?? null);
  const [removeDialog, setRemoveDialog] = useState<{ aula: AulaListaEspera; aluno: FilaAluno } | null>(null);

  const totalNaFila = MOCK_LISTA_ESPERA.reduce((sum, a) => sum + a.fila.length, 0);
  const aulasLotadas = MOCK_LISTA_ESPERA.length;
  const notificados = MOCK_LISTA_ESPERA.reduce(
    (sum, a) => sum + a.fila.filter((f) => f.notificado).length,
    0
  );

  const toggleExpand = (id: string) => {
    setExpandedAula((prev) => (prev === id ? null : id));
  };

  const handleNotificarTodos = (aula: AulaListaEspera) => {
    toast({
      title: "Notificação enviada",
      description: `${aula.fila.length} aluno(s) na fila de "${aula.turmaNome}" (${formatData(aula.data)}) foram notificados.`,
    });
  };

  const handleRemover = () => {
    if (!removeDialog) return;
    toast({
      title: "Aluno removido da fila",
      description: `${removeDialog.aluno.alunoNome} foi removido da lista de espera.`,
    });
    setRemoveDialog(null);
  };

  const formatData = (data: string) =>
    format(parseISO(data), "EEE, dd MMM", { locale: ptBR });

  const formatDataEntrada = (data: string) =>
    format(parseISO(data), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-foreground tracking-tight">
                Lista de Espera
              </h1>
              <Badge variant="secondary" className="text-[10px] font-bold">
                {totalNaFila} na fila
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Gerencie alunos aguardando vaga em aulas lotadas
            </p>
          </div>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Aulas Lotadas"
            value={String(aulasLotadas)}
            icon={AlertCircle}
            gradient="bg-gradient-to-br from-destructive to-destructive/70"
          />
          <StatCard
            label="Alunos na Fila"
            value={String(totalNaFila)}
            icon={Users}
            gradient="bg-gradient-to-br from-primary to-primary/70"
          />
          <StatCard
            label="Já Notificados"
            value={String(notificados)}
            icon={BellRing}
            gradient="bg-gradient-to-br from-success to-success/70"
          />
        </div>

        {/* Aulas com fila */}
        <div className="space-y-3">
          {MOCK_LISTA_ESPERA.map((aula) => {
            const isExpanded = expandedAula === aula.id;
            return (
              <Card key={aula.id} className="overflow-hidden">
                <CardHeader
                  className="cursor-pointer hover:bg-muted/30 transition-colors py-4 px-5"
                  onClick={() => toggleExpand(aula.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                        <CardTitle className="text-base font-bold">
                          {aula.turmaNome}
                        </CardTitle>
                      </div>
                      <Badge variant="outline" className="text-xs font-medium">
                        {aula.modalidade}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatData(aula.data)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {aula.horarioInicio}–{aula.horarioFim}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          {aula.alunosInscritos}/{aula.maxAlunos}
                        </span>
                      </div>
                      <Badge className="bg-destructive/10 text-destructive border-destructive/20 font-bold text-xs">
                        {aula.fila.length} na fila
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="pt-0 px-5 pb-5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-muted-foreground">
                        Professor: <span className="font-medium text-foreground">{aula.professorNome}</span>
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNotificarTodos(aula);
                        }}
                        className="gap-1.5"
                      >
                        <Send className="h-3.5 w-3.5" />
                        Notificar Todos
                      </Button>
                    </div>

                    <div className="rounded-lg border border-border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/40">
                            <TableHead className="font-bold text-xs w-10">#</TableHead>
                            <TableHead className="font-bold text-xs">Aluno</TableHead>
                            <TableHead className="font-bold text-xs">Telefone</TableHead>
                            <TableHead className="font-bold text-xs">Entrada na Fila</TableHead>
                            <TableHead className="font-bold text-xs">Status</TableHead>
                            <TableHead className="font-bold text-xs text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {aula.fila.map((aluno, idx) => (
                            <TableRow key={aluno.id}>
                              <TableCell className="font-bold text-muted-foreground">
                                {idx + 1}º
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-semibold text-sm">{aluno.alunoNome}</p>
                                  <p className="text-xs text-muted-foreground">{aluno.email}</p>
                                </div>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {aluno.telefone}
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {formatDataEntrada(aluno.dataEntrada)}
                              </TableCell>
                              <TableCell>
                                {aluno.notificado ? (
                                  <Badge className="bg-success/10 text-success border-success/20 text-xs font-medium gap-1">
                                    <BellRing className="h-3 w-3" />
                                    Notificado
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary" className="text-xs font-medium gap-1">
                                    <Bell className="h-3 w-3" />
                                    Aguardando
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                    title="Notificar aluno"
                                    onClick={() =>
                                      toast({
                                        title: "Notificação enviada",
                                        description: `${aluno.alunoNome} foi notificado sobre a vaga.`,
                                      })
                                    }
                                  >
                                    <Send className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                    title="Remover da fila"
                                    onClick={() => setRemoveDialog({ aula, aluno })}
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Remove confirmation dialog */}
      <AlertDialog open={!!removeDialog} onOpenChange={(open) => !open && setRemoveDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover da lista de espera?</AlertDialogTitle>
            <AlertDialogDescription>
              {removeDialog && (
                <>
                  <span className="font-medium text-foreground">{removeDialog.aluno.alunoNome}</span> será
                  removido da fila de espera da aula{" "}
                  <span className="font-medium text-foreground">{removeDialog.aula.turmaNome}</span> (
                  {removeDialog && formatData(removeDialog.aula.data)}). Esta ação não pode ser desfeita.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemover}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default ListaEspera;
