import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import { 
  Camera, 
  Upload, 
  X, 
  Eye, 
  EyeOff, 
  ShoppingBag, 
  Lock, 
  Home, 
  CreditCard, 
  Gift, 
  MessageSquare,
  Settings,
  LayoutDashboard
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface ProfileSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

export default function ProfilePage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<{
    file: File | null;
    preview: string | null;
  }>({
    file: null,
    preview: null,
  });

  const sections: ProfileSection[] = [
    {
      title: "Tableau de bord",
      description: "Vue d'ensemble de votre activité et statistiques",
      icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
      link: "/dashboard"
    },
    {
      title: "Commandes",
      description: "Historique et suivi de vos commandes",
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      link: "/orders"
    },
    {
      title: "Sécurité",
      description: "Gérer le mot de passe et les informations de connexion",
      icon: <Lock className="h-8 w-8 text-primary" />,
      link: "/security"
    },
    {
      title: "Adresses",
      description: "Gérer vos adresses de livraison",
      icon: <Home className="h-8 w-8 text-primary" />,
      link: "/addresses"
    },
    {
      title: "Paiements",
      description: "Gérer vos modes de paiement",
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      link: "/payments"
    },
    {
      title: "Cartes cadeaux",
      description: "Consulter le solde ou échanger une carte",
      icon: <Gift className="h-8 w-8 text-primary" />,
      link: "/gift-cards"
    },
    {
      title: "Messages",
      description: "Voir vos messages et notifications",
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      link: "/messages"
    }
  ];

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage({
          file,
          preview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 5 * 1024 * 1024,
    maxFiles: 1,
  });

  const removeImage = () => {
    setProfileImage({
      file: null,
      preview: null,
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Votre compte</h1>

      {/* Profile Image Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Photo de profil</CardTitle>
          <CardDescription>
            Ajoutez une photo pour personnaliser votre profil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="relative">
              {profileImage.preview ? (
                <div className="relative">
                  <img
                    src={profileImage.preview}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 rounded-full"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className="w-24 h-24 rounded-full bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors"
                >
                  <input {...getInputProps()} />
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section, index) => (
          <Link key={index} href={section.link}>
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  {section.icon}
                  <div>
                    <h3 className="font-medium">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
