// components/steps/ConfirmationStep.tsx

import { UseFormReturn } from "react-hook-form";
import { AuthForm } from "../../pages/types"; // Ajustez selon votre structure

interface ConfirmationStepProps {
  readonly form: UseFormReturn<AuthForm>;
}

export default function ConfirmationStep({ form }: ConfirmationStepProps) {
  const { watch } = form;
  const role = watch("role");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Récapitulatif de vos informations</h3>
      <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
        {/* 1) Infos personnelles */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Informations personnelles</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <p className="text-sm font-medium">Nom</p>
              <p className="text-sm">{watch("lastName")}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Prénom</p>
              <p className="text-sm">{watch("firstName")}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm overflow-ellipsis overflow-hidden">{watch("email")}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Téléphone</p>
              <p className="text-sm">{watch("phone")}</p>
            </div>
          </div>
        </div>

        {/* 2) Compte */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Compte</h4>
          <div className="mt-2">
            <div>
              <p className="text-sm font-medium">Nom d'utilisateur</p>
              <p className="text-sm">{watch("username")}</p>
            </div>
          </div>
        </div>

        {/* 3) Rôle */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Rôle</h4>
          <p className="text-sm mt-2 capitalize">
            {role === "delivery"
              ? "Livreur"
              : role === "supplier"
              ? "Fournisseur"
              : "Client"}
          </p>
        </div>

        {/* 4) Adresse */}
        {watch("address") && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Adresse</h4>
            <div className="mt-2 text-sm">
              {/* Affichage brut, à ajuster selon vos besoins */}
              <p>
                {watch("address.streetNumber")} {watch("address.street")}
              </p>
              <p>
                {watch("address.postalCode")} {watch("address.city")}
              </p>
              <p>{watch("address.country")}</p>
            </div>
          </div>
        )}

        {/* 5) Documents (si l’utilisateur en a fourni) */}
        {watch("documents") && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Documents fournis</h4>
            <div className="mt-2 space-y-1 text-sm">
              <p>
                • Pièce d'identité :{" "}
                {watch("documents.identityCard")?.[0]?.name || "Non fourni"}
              </p>
              <p>
                • Permis de conduire :{" "}
                {watch("documents.driversLicense")?.[0]?.name || "Non fourni"}
              </p>
              <p>
                • Carte grise :{" "}
                {watch("documents.vehicleRegistration")?.[0]?.name || "Non fourni"}
              </p>
              <p>
                • Assurance :{" "}
                {watch("documents.insurance")?.[0]?.name || "Non fourni"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
