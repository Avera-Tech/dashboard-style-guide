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

interface AlunoDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alunoName: string | null;
  onConfirm: () => void;
}

const AlunoDeleteDialog = ({ open, onOpenChange, alunoName, onConfirm }: AlunoDeleteDialogProps) => {
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
            Tem certeza que deseja remover <span className="font-semibold text-foreground">{alunoName}</span>? Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2 py-2">
          <Label htmlFor="delete-password" className="text-sm">
            Digite sua senha para confirmar
          </Label>
          <Input
            id="delete-password"
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

export default AlunoDeleteDialog;
