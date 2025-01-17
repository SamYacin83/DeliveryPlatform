import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { AuthForm } from "../../../pages/types";
import { useTranslation } from 'react-i18next';

interface ClientDetailsStepProps {
  readonly form: UseFormReturn<AuthForm>;
}

export function ClientDetailsStep({ form }: Readonly<ClientDetailsStepProps>) {
  const { register, formState } = form;
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">{t('auth:steps.details')}</h3>
      <div>
        <label htmlFor="street" className="sr-only">Rue</label>
        <Input
          id="street"
          placeholder="Rue"
          {...register("address.street")}
          className="h-9"
        />
        {formState.errors.address?.street && <p className="text-red-500 text-xs mt-1">{formState.errors.address.street.message}</p>}
      </div>
      <div>
        <label htmlFor="city" className="sr-only">Ville</label>
        <Input
          id="city"
          placeholder="Ville"
          {...register("address.city")}
          className="h-9"
        />
        {formState.errors.address?.city && <p className="text-red-500 text-xs mt-1">{formState.errors.address.city.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="postalCode" className="sr-only">Code postal</label>
          <Input
            id="postalCode"
            placeholder="Code postal"
            {...register("address.postalCode")}
            className="h-9"
          />
          {formState.errors.address?.postalCode && <p className="text-red-500 text-xs mt-1">{formState.errors.address.postalCode.message}</p>}
        </div>
        <div>
          <label htmlFor="country" className="sr-only">Pays</label>
          <Input
            id="country"
            placeholder="Pays"
            {...register("address.country")}
            className="h-9"
          />
          {formState.errors.address?.country && <p className="text-red-500 text-xs mt-1">{formState.errors.address.country.message}</p>}
        </div>
      </div>
    </div>
  );
}
