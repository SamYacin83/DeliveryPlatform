import { UseFormReturn } from "react-hook-form";
import { AuthForm } from "../../pages/types";

interface RoleStepProps {
 readonly form: UseFormReturn<AuthForm>;
}

export default function RoleStep({ form }: RoleStepProps) {
  const { register } = form;
  return (
    <select 
      {...register("role")}
      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <option value="">Sélectionnez votre rôle</option>
      <option value="client">Client</option>
      <option value="delivery">Livreur</option>
      <option value="supplier">Fournisseur</option>
    </select>
  );
}
