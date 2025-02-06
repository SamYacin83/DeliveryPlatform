import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCategoriesOptions } from "@/api/Queries/getCategories";
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

export default function ProductTypesPage() {
  const { data: categoriesData, isLoading: categoriesIsLoading, error: categoriesError } = useQuery(getCategoriesOptions());
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const categories = categoriesData?.items ?? [];

  useEffect(() => {
    if (categoriesError) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les catégories",
        variant: "destructive",
      });
    }
  }, [categoriesError, toast]);

  const handleDelete = async (id: string) => {
    try {
      // TODO: Implement category deletion
      toast({
        title: "Succès",
        description: "Catégorie supprimée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la catégorie",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Catégories de Produits</CardTitle>
              <CardDescription>
                Gérez vos catégories de produits ici
              </CardDescription>
            </div>
            <Button onClick={() => setLocation("/product-types/add")}>
              <Plus className="mr-2 h-4 w-4" /> Ajouter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoriesIsLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      Chargement...
                    </TableCell>
                  </TableRow>
                ) : categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      Aucune catégorie trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((category) => (
                    <TableRow key={category.categoryId}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() =>
                                setLocation(`/product-types/edit/${category.categoryId}`)
                              }
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Modifier</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(category.categoryId)}
                              className="text-red-600"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Supprimer</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
