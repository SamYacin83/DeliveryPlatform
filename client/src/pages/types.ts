// types.ts
export type UserRole = "client" | "delivery" | "supplier";

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

export interface AuthForm {
  username: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  role?: UserRole;
  address?: Address;
  documents?: Documents;
}

export interface Address {
  street: string;
  streetNumber: string;
  apartment?: string;
  building?: string;
  floor?: string;
  additionalInfo?: string;
  city: string;
  postalCode: string;
  country: string;
  region?: string;
}

export interface Documents {
  identityCard?: File[];
  driversLicense?: File[];
  vehicleRegistration?: File[];
  insurance?: File[];
}