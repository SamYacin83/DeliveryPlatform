import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { AuthForm } from "../../../pages/types";
import { useTranslation } from 'react-i18next';

interface DeliveryAddressStepProps {
  readonly form: UseFormReturn<AuthForm>;
}

export function DeliveryAddressStep({ form }: Readonly<DeliveryAddressStepProps>) {
  const { register, formState } = form;
  const { t } = useTranslation();

  return (
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
  );
}
