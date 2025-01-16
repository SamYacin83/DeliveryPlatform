import * as z from 'zod';
import { TFunction } from 'i18next';

// Types
export type AddressSchema = z.infer<ReturnType<typeof createAddressSchema>>;
export type DocumentSchema = z.infer<ReturnType<typeof createDocumentSchema>>;
export type AuthSchema = z.infer<ReturnType<typeof createAuthSchema>>;

// Schéma de l'adresse
export const createAddressSchema = (t: TFunction) => {
  return z.object({
    street: z.string().min(1, t('pages.auth.address.street.required')),
    streetNumber: z.string().min(1, t('pages.auth.address.streetNumber.required')),
    apartment: z.string().optional(),
    building: z.string().optional(),
    floor: z.string().optional(),
    additionalInfo: z.string().optional(),
    city: z.string().min(1, t('pages.auth.address.city.required')),
    postalCode: z.string().min(1, t('pages.auth.address.postalCode.required')),
    country: z.string().min(1, t('pages.auth.address.country.required')),
    region: z.string().optional(),
  });
};

// Schéma des documents
export const createDocumentSchema = () => {
  return z.object({
    identityCard: z.any().optional(),
    driversLicense: z.any().optional(),
    vehicleRegistration: z.any().optional(),
    insurance: z.any().optional(),
  });
};

// Schéma d'authentification principal
export const createAuthSchema = (t: TFunction) => {
  const addressSchema = createAddressSchema(t);
  const documentSchema = createDocumentSchema();

  return z.object({
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
    role: z.enum(['client', 'delivery', 'supplier'], {
      required_error: t('pages.auth.role.required'),
      invalid_type_error: t('pages.auth.role.invalid'),
    }),
    address: addressSchema.optional(),
    documents: documentSchema.optional(),
  });
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