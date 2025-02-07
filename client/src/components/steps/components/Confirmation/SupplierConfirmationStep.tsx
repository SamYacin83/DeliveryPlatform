import { BaseConfirmationStep, BaseConfirmationStepProps } from "./BaseConfirmationStep";

export function SupplierConfirmationStep({ form }: Readonly<BaseConfirmationStepProps>) {
    return <BaseConfirmationStep form={form} />;
  }