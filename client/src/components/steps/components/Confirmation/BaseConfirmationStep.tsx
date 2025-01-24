import { UseFormReturn } from "react-hook-form";
import { AuthForm } from "../../../../pages/types";
import { useTranslation } from "react-i18next";

export interface BaseConfirmationStepProps {
  readonly form: UseFormReturn<AuthForm>;
}

export function BaseConfirmationStep({ form }: BaseConfirmationStepProps) {
  const { watch } = form;
  const { t } = useTranslation();

  return (

    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">{t('auth:steps.confirmation')}</h3>
      <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
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

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">{t('auth:fields.role')}</label>
              <p className="text-sm capitalize">{watch("role")}</p>
            </div>
          </div>
        </div>

        {watch("address") && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">{t('auth:fields.address')}</h4>
            <div className="mt-2 text-sm">
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
      </div>
    </div>
  );
}