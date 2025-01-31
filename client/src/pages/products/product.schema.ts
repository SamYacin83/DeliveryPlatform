import { z } from "zod";

export const productSchema = z.object({
  name: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  description: z.string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(1000, "La description ne peut pas dépasser 1000 caractères"),
  price: z.number()
    .min(0, "Le prix doit être positif")
    .max(1000000, "Le prix ne peut pas dépasser 1,000,000"),
  quantity: z.number()
    .min(0, "La quantité doit être positive")
    .max(1000000, "La quantité ne peut pas dépasser 1,000,000"),
  typeId: z.string().min(1, "Le type de produit est requis"),
});

// Types générés à partir du schéma
export type ProductFormData = z.infer<typeof productSchema>;

// Valeurs par défaut pour le formulaire
export const defaultProductValues: ProductFormData = {
  name: "",
  description: "",
  price: 0,
  quantity: 0,
  typeId: "",
};