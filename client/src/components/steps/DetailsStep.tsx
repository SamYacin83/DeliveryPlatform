import { UseFormReturn } from "react-hook-form";
import { AuthForm } from "../../pages/types";
import { ClientDetailsStep } from "./components/Client/ClientDetailsStep";
import { DeliveryDetailsStep } from "./components/Delivery/DeliveryDetailsStep";
import { SupplierDetailsStep } from "./components/Supplier/SupplierDetailsStep";

export interface FileProgress {
  readonly progress: number;
  readonly status: 'idle' | 'uploading' | 'completed' | 'error';
}

export interface DocumentProgress {
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
  const { watch } = form;
  const role = watch("role");
  
  return (
    <div className="space-y-4">
      {role === "client" && <ClientDetailsStep form={form} />}
      {role === "delivery" && <DeliveryDetailsStep form={form} uploadProgress={uploadProgress} handleFileChange={handleFileChange} />}
      {role === "supplier" && <SupplierDetailsStep form={form} />}
    </div>
  );
}