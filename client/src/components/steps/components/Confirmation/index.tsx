import { BaseConfirmationStepProps } from "./BaseConfirmationStep";
import { DeliveryConfirmationStep } from "./DeliveryConfirmationStep";
import { SupplierConfirmationStep } from "./SupplierConfirmationStep";
import { ClientConfirmationStep } from "./ClientConfirmationStep";
export default function ConfirmationStep({ form }: BaseConfirmationStepProps) {
    const role = form.watch("role");
  
    switch (role) {
      case "delivery":
        return <DeliveryConfirmationStep form={form} />;
      case "supplier":
        return <SupplierConfirmationStep form={form} />;
      default:
        return <ClientConfirmationStep form={form} />;
    }
  }