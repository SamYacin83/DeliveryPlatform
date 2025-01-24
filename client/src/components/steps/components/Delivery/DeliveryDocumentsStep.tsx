import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { AuthForm } from "../../../../pages/types";
import { useTranslation } from 'react-i18next';
import { CustomFileUpload } from "./CustomFileUpload";
import { DocumentProgress } from "../../DetailsStep";

interface DeliveryDocumentsStepProps {
  readonly form: UseFormReturn<AuthForm>;
  readonly uploadProgress: DocumentProgress;
  readonly handleFileChange: (docType: keyof DocumentProgress) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DeliveryDocumentsStep({ form, uploadProgress, handleFileChange }: Readonly<DeliveryDocumentsStepProps>) {
  const { register, formState } = form;
  const { t } = useTranslation();

  return (
    <fieldset className="space-y-3 border rounded-lg p-4">
      <legend className="text-sm font-medium px-2">{t('auth:documents.title')}</legend>
      
      <div className="space-y-2">
        <label htmlFor="identity-card" className="text-sm">{t('auth:documents.identity.label')}</label>
        <div className="space-y-1">
          <CustomFileUpload
            id="identity-card"
            accept=".pdf,.jpg,.jpeg,.png"
            {...register("documents.identityCard")}
            onChange={handleFileChange('identityCard')}
          />
          {formState.errors.documents?.identityCard && <p className="text-red-500 text-xs mt-1">{formState.errors.documents.identityCard.message}</p>}
          {uploadProgress.identityCard && (
            <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress.identityCard.progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="drivers-license" className="text-sm">{t('auth:documents.drivingLicense.label')}</label>
        <div className="space-y-1">
          <CustomFileUpload
            id="drivers-license"
            accept=".pdf,.jpg,.jpeg,.png"
            {...register("documents.driversLicense")}
            onChange={handleFileChange('driversLicense')}
          />
          {formState.errors.documents?.driversLicense && <p className="text-red-500 text-xs mt-1">{formState.errors.documents.driversLicense.message}</p>}
          {uploadProgress.driversLicense && (
            <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress.driversLicense.progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="vehicle-registration" className="text-sm">{t('auth:documents.vehicleRegistration.label')}</label>
        <div className="space-y-1">
          <CustomFileUpload
            id="vehicle-registration"
            accept=".pdf,.jpg,.jpeg,.png"
            {...register("documents.vehicleRegistration")}
            onChange={handleFileChange('vehicleRegistration')}
          />
          {formState.errors.documents?.vehicleRegistration && <p className="text-red-500 text-xs mt-1">{formState.errors.documents.vehicleRegistration.message}</p>}
          {uploadProgress.vehicleRegistration && (
            <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress.vehicleRegistration.progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="insurance" className="text-sm">{t('auth:documents.insurance.label')}</label>
        <div className="space-y-1">
          <CustomFileUpload
            id="insurance"
            accept=".pdf,.jpg,.jpeg,.png"
            {...register("documents.insurance")}
            onChange={handleFileChange('insurance')}
          />
          {formState.errors.documents?.insurance && <p className="text-red-500 text-xs mt-1">{formState.errors.documents.insurance.message}</p>}
          {uploadProgress.insurance && (
            <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress.insurance.progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          )}
        </div>
      </div>
    </fieldset>
  );
}
