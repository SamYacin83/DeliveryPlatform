import { UseFormReturn } from "react-hook-form";
import { AuthForm } from "../../pages/types"; 
import { useTranslation } from "react-i18next";

interface ConfirmationStepProps {
  readonly form: UseFormReturn<AuthForm>;
}

export default function ConfirmationStep({ form }: ConfirmationStepProps) {
  const { watch } = form;
  const role = watch("role");
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">{t('auth:steps.confirmation')}</h3>
      <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
        {/* 1) Infos personnelles */}
        <div className="space-y-3">
          <h4 className="font-medium">{t('auth:steps.personalInfo')}</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">{t('auth:fields.lastName')}</label>
              <p className="text-sm">{watch("lastName")}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">{t('auth:fields.firstName')}</label>
              <p className="text-sm">{watch("firstName")}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">{t('auth:fields.email')}</label>
              <p className="text-sm">{watch("email")}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">{t('auth:fields.phone')}</label>
              <p className="text-sm">{watch("phone")}</p>
            </div>
          </div>
        </div>

        {/* 2) Compte */}
        <div className="space-y-3">
          <h4 className="font-medium">{t('auth:steps.role')}</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">{t('auth:fields.username')}</label>
              <p className="text-sm">{watch("username")}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">{t('auth:fields.role')}</label>
              <p className="text-sm capitalize">{watch("role")}</p>
            </div>
          </div>
        </div>

        {/* 3) Rôle */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">{t('auth:steps.role')}</h4>
          <p className="text-sm mt-2 capitalize">
            {role === "delivery"
              ? t('auth:roles.delivery')
              : role === "supplier"
              ? t('auth:roles.supplier')
              : t('auth:roles.client')}
          </p>
        </div>

        {/* 4) Adresse */}
        {watch("address") && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">{t('auth:steps.address')}</h4>
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
        {role === "delivery" && (
          <div className="space-y-3">
            <h4 className="font-medium">{t('auth:documents.title')}</h4>
            <div className="space-y-2">
              <div>
                <label className="text-sm text-muted-foreground">{t('auth:documents.identity.label')}</label>
                <p className="text-sm">{watch("documents.identityCard") ? t('auth:documents.status.completed') : t('auth:documents.status.pending')}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">{t('auth:documents.drivingLicense.label')}</label>
                <p className="text-sm">{watch("documents.driversLicense") ? t('auth:documents.status.completed') : t('auth:documents.status.pending')}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">{t('auth:documents.vehicleRegistration.label')}</label>
                <p className="text-sm">{watch("documents.vehicleRegistration") ? t('auth:documents.status.completed') : t('auth:documents.status.pending')}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">{t('auth:documents.insurance.label')}</label>
                <p className="text-sm">{watch("documents.insurance") ? t('auth:documents.status.completed') : t('auth:documents.status.pending')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
