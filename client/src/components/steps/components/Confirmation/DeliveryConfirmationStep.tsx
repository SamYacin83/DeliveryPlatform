import { BaseConfirmationStep, BaseConfirmationStepProps } from "./BaseConfirmationStep";
import { useTranslation } from "react-i18next";

export function DeliveryConfirmationStep({ form }: Readonly<BaseConfirmationStepProps>) {
    const { t } = useTranslation();
    const { watch } = form;
  
    return (
      <>
        <BaseConfirmationStep form={form} />
        <div className="mt-4 space-y-3">
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
      </>
    );
  }