import * as z from 'zod';
import { TFunction } from 'i18next';

// Types
export type ClientAddressSchema = z.infer<ReturnType<typeof createClientAddressSchema>>;
export type DeliveryAddressSchema = z.infer<ReturnType<typeof createDeliveryAddressSchema>>;
export type DeliveryDocumentSchema = z.infer<ReturnType<typeof createDeliveryDocumentSchema>>;
export type OptionalDocumentSchema = z.infer<ReturnType<typeof createOptionalDocumentSchema>>;
export type AuthSchema = z.infer<ReturnType<typeof createAuthSchema>>;

// Schéma de l'adresse pour les clients
export const createClientAddressSchema = (t: TFunction) => {
  return z.object({
    street: z.string().min(1, t('auth:address.street.required')),
    city: z.string().min(1, t('auth:address.city.required')),
    postalCode: z.string().min(1, t('auth:address.postalCode.required')),
    country: z.string().min(1, t('auth:address.country.required')),
  });
};

// Schéma de l'adresse pour les livreurs
export const createDeliveryAddressSchema = (t: TFunction) => {
  return z.object({
    street: z.string().min(1, t('auth:address.street.required')),
    streetNumber: z.string().min(1, t('auth:address.streetNumber.required')),
    apartment: z.string().optional(),
    building: z.string().optional(),
    floor: z.string().optional(),
    additionalInfo: z.string().optional(),
    city: z.string().min(1, t('auth:address.city.required')),
    postalCode: z.string().min(1, t('auth:address.postalCode.required')),
    country: z.string().min(1, t('auth:address.country.required')),
    region: z.string().optional(),
  });
};

// Schéma des documents pour les livreurs
export const createDeliveryDocumentSchema = (t: TFunction) => {
  return z.object({
    identityCard: z.instanceof(File, { message: t('auth:documents.identity.required') }),
    driversLicense: z.instanceof(File, { message: t('auth:documents.drivingLicense.required') }),
    vehicleRegistration: z.instanceof(File, { message: t('auth:documents.vehicleRegistration.required') }),
    insurance: z.instanceof(File, { message: t('auth:documents.insurance.required') }),
  });
};

// Schéma des documents optionnels
export const createOptionalDocumentSchema = () => {
  return z.object({
    identityCard: z.any().optional(),
    driversLicense: z.any().optional(),
    vehicleRegistration: z.any().optional(),
    insurance: z.any().optional(),
  });
};

// Schéma d'authentification principal
export const createAuthSchema = (t: TFunction) => {
  const baseSchema = {
    username: z
      .string()
      .min(3, t('pages.auth.validation.username.min'))
      .max(20, t('pages.auth.validation.username.max')),
    password: z
      .string()
      .min(8, t('pages.auth.validation.password.min'))
      .regex(/[A-Z]/, t('pages.auth.validation.password.uppercase'))
      .regex(/[a-z]/, t('pages.auth.validation.password.lowercase'))
      .regex(/\d/, t('pages.auth.validation.password.number')),
    firstName: z
      .string()
      .min(2, t('pages.auth.validation.firstName.required')),
    lastName: z
      .string()
      .min(2, t('pages.auth.validation.lastName.required')),
    email: z
      .string()
      .min(1, t('pages.auth.validation.email.required'))
      .email(t('pages.auth.validation.email.invalid')),
    phone: z
      .string()
      .regex(
        /^\+?\d{3}[-\s.]?\d{3}[-\s.]?\d{4,6}$/,
        t('pages.auth.validation.phone.invalid')
      ),
  };

  return z.discriminatedUnion('role', [
    // Schéma pour les clients
    z.object({
      ...baseSchema,
      role: z.literal('client'),
      address: createClientAddressSchema(t),
      documents: createOptionalDocumentSchema().optional(),
    }),
    // Schéma pour les livreurs
    z.object({
      ...baseSchema,
      role: z.literal('delivery'),
      address: createDeliveryAddressSchema(t),
      documents: createDeliveryDocumentSchema(t),
    }),
    // Schéma pour les fournisseurs
    z.object({
      ...baseSchema,
      role: z.literal('supplier'),
      address: createClientAddressSchema(t).optional(),
      documents: createOptionalDocumentSchema().optional(),
    }),
  ]);
};

// Schéma de connexion simplifié
export const createLoginSchema = (t: TFunction) => {
  return z.object({
    username: z
      .string()
      .min(1, t('pages.auth.validation.email.required'))
      .email(t('pages.auth.validation.email.invalid')),
    password: z
      .string()
      .min(8, t('pages.auth.validation.password.min'))
  });
};