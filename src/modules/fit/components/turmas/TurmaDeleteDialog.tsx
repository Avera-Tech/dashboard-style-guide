import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TurmaDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  turmaName: string | null;
  onConfirm: () => void;
}

const TurmaDeleteDialog = ({ open, onOpenChange, turmaName, onConfirm }: TurmaDeleteDialogProps) => {
  const [password, setPassword] = useState("");

  const handleOpenChange = (value: boolean) => {
    if (!value) setPassword("");
    onOpenChange(value);
  };

  const handleConfirm = () => {
    onConfirm();
    setPassword("");
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja remover a turma <span className="font-semibold text-foreground">{turmaName}</span>? Todos os alunos serão desvinculados. Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2 py-2">
          <Label htmlFor="delete-turma-password" className="text-sm">
            Digite sua senha para confirmar
          </Label>
          <Input
            id="delete-turma-password"
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!password.trim()}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TurmaDeleteDialog;
