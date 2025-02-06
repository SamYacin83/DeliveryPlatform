import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "wouter";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from '@tanstack/react-query';
import { queryOptionsGetCategoryById } from "@/api/Queries/getCategorieById";
import  useCategory  from "@/api/mutation/addCategory";
import { CategoryDto } from "@/api/Interfaces/Category";
import  useDeleteCategory  from "@/api/mutation/deleteCategory";

const productTypeSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  description: z.string().optional(),
});

export default function ProductTypeForm() {
  const params = useParams<{ categoryId: string }>();
  const { data: categoryData, isLoading: categoryIsLoading, error: categoryError } = useQuery(queryOptionsGetCategoryById(params?.categoryId));
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const { saveCategory, isPending } = useCategory();
  const isEditing = !!params?.categoryId;
  console.log('isEditing', isEditing);
  console.log('params', params?.categoryId);
  const form = useForm<CategoryDto>({
    resolver: zodResolver(productTypeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  console.log('categoryData', categoryData);

  useEffect(() => {
    if (categoryError && isEditing) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les données de la catégorie",
        variant: "destructive",
      });
      setLocation("/product-types");
    }
  }, [categoryError, isEditing, setLocation, toast]);

  useEffect(() => {
    if (categoryData && isEditing) {
      form.reset({
        name: categoryData.name,
        description: categoryData.description,
      });
    }
  }, [categoryData, form]);

  const onSubmit = async (data: CategoryDto) => {
    try {
      const category: Category = {
        categoryId: params?.categoryId || null,
        name: data.name,
        description: data.description,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await saveCategory(category);
      setLocation("/product-types");
    } catch (error) {
      // Error handling is done in the mutation
      console.error(error);
    }
  };

  if (isEditing && categoryIsLoading) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent>
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Modifier" : "Ajouter"} un type de produit
          </CardTitle>
          <CardDescription>
            {isEditing
              ? "Modifier les informations du type de produit"
              : "Ajouter un nouveau type de produit"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/product-types")}
                  disabled={isPending}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isEditing ? "Modifier" : "Créer"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
