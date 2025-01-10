import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import { Camera, Upload, X, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "../hooks/use-user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const profileSchema = z.object({
  username: z.string().min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string(),
  address: z.string(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
  newPassword: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .regex(/[^A-Za-z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useUser();
  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: "",
    address: "",
    photoUrl: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      phone: "",
      address: "",
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);
      // Simuler un téléchargement
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, photoUrl: reader.result as string }));
        setIsUploading(false);
        toast({
          title: t("profile:successUpdate"),
          description: "Photo mise à jour avec succès",
        });
      };
      reader.readAsDataURL(file);
    }
  }, [toast, t]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1
  });

  const handleSubmit = async (data: ProfileFormData) => {
    toast({
      title: t("profile:successUpdate"),
      description: "Profil mis à jour avec succès",
    });
  };

  const handlePasswordSubmit = async (data: PasswordFormData) => {
    try {
      // Simulation de l'API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t("profile:password.success"),
        description: t("profile:password.success"),
      });
      
      passwordForm.reset();
    } catch (error) {
      toast({
        title: t("profile:password.error"),
        description: t("profile:password.error"),
        variant: "destructive",
      });
    }
  };

  const removePhoto = () => {
    setProfileData(prev => ({ ...prev, photoUrl: "" }));
    toast({
      title: t("profile:successUpdate"),
      description: "Photo supprimée avec succès",
    });
  };

  if (!user) return null;

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Carte du profil existante */}
      <Card>
        <CardHeader>
          <CardTitle>{t("profile:title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={profileForm.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Photo de profil */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={profileData.photoUrl} />
                  <AvatarFallback className="bg-primary/10">
                    {profileData.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {profileData.photoUrl && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 rounded-full"
                    onClick={removePhoto}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                  ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"}
                  ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center space-y-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    {t("profile:uploadInstructions")}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t("profile:uploadSizeLimit")}
                    <br />
                    {t("profile:uploadFormats")}
                  </p>
                </div>
              </div>
            </div>

            {/* Champs du formulaire */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">{t("profile:username")}</Label>
                <Input
                  id="username"
                  {...profileForm.register("username")}
                />
              </div>
              <div>
                <Label htmlFor="email">{t("profile:email")}</Label>
                <Input
                  id="email"
                  type="email"
                  {...profileForm.register("email")}
                />
              </div>
              <div>
                <Label htmlFor="phone">{t("profile:phone")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...profileForm.register("phone")}
                />
              </div>
              <div>
                <Label htmlFor="address">{t("profile:address")}</Label>
                <Input
                  id="address"
                  {...profileForm.register("address")}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              {t("profile:save")}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Nouvelle carte pour le changement de mot de passe */}
      <Card>
        <CardHeader>
          <CardTitle>{t("profile:password.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">{t("profile:password.current")}</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  {...passwordForm.register("currentPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </div>
              {passwordForm.formState.errors.currentPassword && (
                <p className="text-sm text-destructive mt-1">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="newPassword">{t("profile:password.new")}</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  {...passwordForm.register("newPassword")}
                />
              </div>
              {passwordForm.formState.errors.newPassword && (
                <p className="text-sm text-destructive mt-1">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">{t("profile:password.confirm")}</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  {...passwordForm.register("confirmPassword")}
                />
              </div>
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Règles de mot de passe */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className={passwordForm.watch("newPassword")?.length >= 8 ? "text-green-500" : ""}>
                ✓ {t("profile:password.rules.minLength")}
              </p>
              <p className={/[A-Z]/.test(passwordForm.watch("newPassword") || "") ? "text-green-500" : ""}>
                ✓ {t("profile:password.rules.uppercase")}
              </p>
              <p className={/[a-z]/.test(passwordForm.watch("newPassword") || "") ? "text-green-500" : ""}>
                ✓ {t("profile:password.rules.lowercase")}
              </p>
              <p className={/[0-9]/.test(passwordForm.watch("newPassword") || "") ? "text-green-500" : ""}>
                ✓ {t("profile:password.rules.number")}
              </p>
              <p className={/[^A-Za-z0-9]/.test(passwordForm.watch("newPassword") || "") ? "text-green-500" : ""}>
                ✓ {t("profile:password.rules.special")}
              </p>
              <p className={
                passwordForm.watch("newPassword") === passwordForm.watch("confirmPassword") &&
                passwordForm.watch("newPassword")?.length > 0
                  ? "text-green-500"
                  : ""
              }>
                ✓ {t("profile:password.rules.match")}
              </p>
            </div>

            <Button type="submit" className="w-full">
              {t("profile:password.update")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
