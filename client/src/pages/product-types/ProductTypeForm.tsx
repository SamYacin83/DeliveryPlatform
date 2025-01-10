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
import { CreateProductTypeDto, ProductType } from "@/types/product";
import { productService } from "@/api/services/productService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useRoute } from "wouter";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

const productTypeSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  description: z.string().optional(),
});

export default function ProductTypeForm() {
  const [params] = useRoute("/product-types/:id");
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const isEditing = !!params?.id;

  const form = useForm<CreateProductTypeDto>({
    resolver: zodResolver(productTypeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (isEditing) {
      loadProductType();
    }
  }, [params?.id]);

  const loadProductType = async () => {
    try {
      const response = await productService.getProductType(params!.id);
      const productType = response.data;
      form.reset({
        name: productType.name,
        description: productType.description,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger le type de produit",
        variant: "destructive",
      });
      setLocation("/product-types");
    }
  };

  const onSubmit = async (data: CreateProductTypeDto) => {
    try {
      if (isEditing) {
        await productService.updateProductType(params!.id, data);
        toast({
          title: "Succès",
          description: "Type de produit modifié avec succès",
        });
      } else {
        await productService.createProductType(data);
        toast({
          title: "Succès",
          description: "Type de produit créé avec succès",
        });
      }
      setLocation("/product-types");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Modifier" : "Ajouter"} un type de produit
          </CardTitle>
          <CardDescription>
            {isEditing
              ? "Modifiez les informations du type de produit"
              : "Créez un nouveau type de produit"}
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
                      <Input {...field} />
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
                      <Textarea {...field} />
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
                >
                  Annuler
                </Button>
                <Button type="submit">
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
