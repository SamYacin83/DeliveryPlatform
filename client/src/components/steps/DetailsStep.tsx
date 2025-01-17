import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { AuthForm } from "../../pages/types";
import { useTranslation } from 'react-i18next';

interface FileProgress {
  readonly progress: number;
  readonly status: 'idle' | 'uploading' | 'completed' | 'error';
}

interface DocumentProgress {
  readonly identityCard?: FileProgress;
  readonly driversLicense?: FileProgress;
  readonly vehicleRegistration?: FileProgress;
  readonly insurance?: FileProgress;
}


interface DetailsStepProps {
  readonly form: UseFormReturn<AuthForm>;
  readonly uploadProgress: DocumentProgress;
  readonly handleFileChange: (docType: keyof DocumentProgress) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DetailsStep({ form, uploadProgress, handleFileChange }: Readonly<DetailsStepProps>) {
  const { register, formState, watch } = form;
  const role = watch("role");
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      {role === "client" && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">{t('auth:steps.details')}</h3>
          <div>
            <label htmlFor="street-client" className="sr-only">Rue</label>
            <Input
              id="street-client"
              placeholder="Rue"
              {...register("address.street")}
              className="h-9"
            />
            {formState.errors.address?.street && <p className="text-red-500 text-xs mt-1">{formState.errors.address.street.message}</p>}
          </div>
          <div>
            <label htmlFor="city-client" className="sr-only">Ville</label>
            <Input
              id="city-client"
              placeholder="Ville"
              {...register("address.city")}
              className="h-9"
            />
            {formState.errors.address?.city && <p className="text-red-500 text-xs mt-1">{formState.errors.address.city.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="postal-code-client" className="sr-only">Code postal</label>
              <Input
                id="postal-code-client"
                placeholder="Code postal"
                {...register("address.postalCode")}
                className="h-9"
              />
              {formState.errors.address?.postalCode && <p className="text-red-500 text-xs mt-1">{formState.errors.address.postalCode.message}</p>}
            </div>
            <div>
              <label htmlFor="country-client" className="sr-only">Pays</label>
              <Input
                id="country-client"
                placeholder="Pays"
                {...register("address.country")}
                className="h-9"
              />
              {formState.errors.address?.country && <p className="text-red-500 text-xs mt-1">{formState.errors.address.country.message}</p>}
            </div>
          </div>
        </div>
      )}

      {role === "delivery" && (
        <div className="space-y-4">
          <fieldset className="space-y-4 border rounded-lg p-4">
            <legend className="text-sm font-medium px-2">{t('auth:address.title')}</legend>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label htmlFor="street-delivery" className="text-sm mb-1 block">{t('auth:address.street.label')}</label>
                  <Input
                    id="street-delivery"
                    placeholder={t('auth:address.holder.street')} 
                    {...register("address.street")}
                    className="h-9"
                  />
                  {formState.errors.address?.street && <p className="text-red-500 text-xs mt-1">{formState.errors.address.street.message}</p>}
                </div>
                <div>
                  <label htmlFor="street-number" className="text-sm mb-1 block">{t('auth:address.streetNumber.label')}</label>
                  <Input
                    id="street-number"
                    placeholder={t('auth:address.streetNumber.label')}
                    {...register("address.streetNumber")}
                    className="h-9"
                  />
                  {formState.errors.address?.streetNumber && <p className="text-red-500 text-xs mt-1">{formState.errors.address.streetNumber.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="building" className="text-sm mb-1 block">{t('auth:address.building')}</label>
                  <Input
                    id="building"
                    placeholder={t('auth:address.building')}
                    {...register("address.building")}
                    className="h-9"
                  />
                </div>
                <div>
                  <label htmlFor="floor" className="text-sm mb-1 block">{t('auth:address.floor')}</label>
                  <Input
                    id="floor"
                    placeholder={t('auth:address.floor')}
                    {...register("address.floor")}
                    className="h-9"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="apartment" className="text-sm mb-1 block">{t('auth:address.apartment')}</label>
                <Input
                  id="apartment"
                  placeholder={t('auth:address.holder.apartment')}
                  {...register("address.apartment")}
                  className="h-9"
                />
              </div>

              <div>
                <label htmlFor="additional-info" className="text-sm mb-1 block">{t('auth:address.additionalInfo')}</label>
                <Input
                  id="additional-info"
                  placeholder={t('auth:address.holder.additionalInfo')}
                  {...register("address.additionalInfo")}
                  className="h-9"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="city-delivery" className="text-sm mb-1 block">{t('auth:address.city.label')}</label>
                  <Input
                    id="city-delivery"
                    placeholder={t('auth:address.city.label')}
                    {...register("address.city")}
                    className="h-9"
                  />
                  {formState.errors.address?.city && <p className="text-red-500 text-xs mt-1">{formState.errors.address.city.message}</p>}
                </div>
                <div>
                  <label htmlFor="postal-code-delivery" className="text-sm mb-1 block">{t('auth:address.postalCode.label')}</label>
                  <Input
                    id="postal-code-delivery"
                    placeholder={t('auth:address.postalCode.label')}
                    {...register("address.postalCode")}
                    className="h-9"
                  />
                  {formState.errors.address?.postalCode && <p className="text-red-500 text-xs mt-1">{formState.errors.address.postalCode.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="region" className="text-sm mb-1 block">{t('auth:address.region')}</label>
                  <Input
                    id={t('auth:address.region')}
                    placeholder={t('auth:address.region')}
                    {...register("address.region")}
                    className="h-9"
                  />
                </div>
                <div>
                  <label htmlFor="country-delivery" className="text-sm mb-1 block">{t('auth:address.country.label')}</label>
                  <Input
                    id="country-delivery"
                    placeholder={t('auth:address.country.label')}
                    {...register("address.country")}
                    className="h-9"
                  />
                  {formState.errors.address?.country && <p className="text-red-500 text-xs mt-1">{formState.errors.address.country.message}</p>}
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-3 border rounded-lg p-4">
            <legend className="text-sm font-medium px-2">{t('auth:documents.title')}</legend>
            
            <div className="space-y-2">
              <label htmlFor="identity-card" className="text-sm">{t('auth:documents.identity.label')}</label>
              <div className="space-y-1">
                <Input
                  id="identity-card"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...register("documents.identityCard")}
                  className="h-9"
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
                <Input
                  id="drivers-license"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...register("documents.driversLicense")}
                  className="h-9"
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
                <Input
                  id="vehicle-registration"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...register("documents.vehicleRegistration")}
                  className="h-9"
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
                <Input
                  id="insurance"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...register("documents.insurance")}
                  className="h-9"
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
        </div>
      )}
    </div>
  );
}