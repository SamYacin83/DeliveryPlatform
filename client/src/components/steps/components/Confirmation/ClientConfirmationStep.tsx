import { BaseConfirmationStep, BaseConfirmationStepProps } from "./BaseConfirmationStep";

export function ClientConfirmationStep({ form }: Readonly<BaseConfirmationStepProps>) {
    return <BaseConfirmationStep form={form} />;
  }