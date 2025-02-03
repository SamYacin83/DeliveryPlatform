import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useParams } from "wouter";
import { getProductById } from "@/api/Queries/getAllProducts";
import { getAllCatProduct } from "@/api/Queries/getAllCategory";
import { productSchema, ProductFormData, defaultProductValues } from "./product.schema";
import { Category } from "@/types/product";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductForm() {
  const params = useParams<{ id: string }>();
  const [productTypes, setProductTypes] = useState<Category[]>([]);
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productImage, setProductImage] = useState<{
    file: File | null;
    preview: string | null;
  }>({
    file: null,
    preview: null,
  });

  const isEditing = !!params?.id;

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultProductValues,
    mode: "onChange", // Validation en temps réel
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation d'un délai
        const productTypes = await getAllCatProduct();
        setProductTypes(productTypes);
      } catch (error) {
        console.error('Erreur lors du chargement des categories:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les categories",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [toast]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params?.id) return;
      
      try {
        setIsLoading(true);
        const response = await getProductById(params.id);
        if (!response) {
          toast({
            title: "Erreur",
            description: "Produit non trouvé",
            variant: "destructive",
          });
          setLocation("/products");
          return;
        }
        // Mettre à jour les valeurs du formulaire
        form.reset({
          name: response.name,
          description: response.description,
          price: response.price,
          quantity: response.quantity,
          categoryId: response.categoryId
        });
        
        if (response.imageUrl) {
          setProductImage({
            file: null,
            preview: response.imageUrl
          });
        }
      } catch (error) {
        console.error("Erreur:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du produit",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params?.id, form, toast, setLocation]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProductImage({
            file,
            preview: reader.result as string,
          });
        };
        reader.readAsDataURL(file);
      }
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Submit product", data, productImage);
      toast({
        title: isEditing ? "Produit modifié" : "Produit créé",
        description: isEditing
          ? "Le produit a été modifié avec succès"
          : "Le produit a été créé avec succès",
      });
      setLocation("/products");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Modifier le produit" : "Nouveau produit"}</CardTitle>
          <CardDescription>
            {isEditing
              ? "Modifiez les informations du produit"
              : "Remplissez les informations pour créer un nouveau produit"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom du produit</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Entrez le nom du produit" />
                        </FormControl>
                        <FormDescription>
                          Le nom qui sera affiché aux clients
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catégorie du produit</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez une catégorie" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {productTypes.map((type) => (
                              <SelectItem key={type.categoryId} value={type.categoryId}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          La catégorie du produit
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prix</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              placeholder="0.00"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantité</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                              placeholder="0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div
                      {...getRootProps()}
                      className={cn(
                        "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                        isDragActive
                          ? "border-primary bg-primary/10"
                          : "border-muted-foreground/25 hover:border-primary"
                      )}
                    >
                      <input {...getInputProps()} />
                      {productImage.preview ? (
                        <div className="relative aspect-square w-full">
                          <img
                            src={productImage.preview}
                            alt="Aperçu"
                            className="rounded-lg object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              setProductImage({ file: null, preview: null });
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Glissez une image ici ou cliquez pour sélectionner
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG jusqu'à 5MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Décrivez votre produit"
                            className="min-h-[150px]"
                          />
                        </FormControl>
                        <FormDescription>
                          Une description détaillée du produit
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/products")}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={isSubmitting || isLoading}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isEditing ? "Modifier" : "Créer"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Prévisualisation du produit */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Aperçu du produit</CardTitle>
          <CardDescription>Voici comment votre produit apparaîtra</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-square rounded-lg bg-muted relative">
                {productImage.preview ? (
                  <img
                    src={productImage.preview}
                    alt="Aperçu"
                    className="rounded-lg object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Upload className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  {form.watch("name") || "Nom du produit"}
                </h3>
                <p className="text-muted-foreground">
                  {form.watch("description") || "Description du produit"}
                </p>
                <div className="flex items-center gap-4">
                  <p className="text-xl font-semibold">
                    {form.watch("price")?.toFixed(2) || "0.00"} €
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Stock: {form.watch("quantity") || "0"}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Type:{" "}
                  {productTypes.find((t) => t.categoryId === form.watch("categoryId"))?.name ||
                    "Non spécifié"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
