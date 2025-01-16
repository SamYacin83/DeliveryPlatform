import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { AuthForm } from "../../pages/types";

const getInputClassName = (
  formState: any, 
  fieldName: "firstName" | "lastName" | "phone" | "email" | "password"
): string => {
  if (formState.errors[fieldName]) {
    return "border-red-500 focus:ring-red-500";
  }
  if (formState.touchedFields[fieldName]) {
    return "border-green-500 focus:ring-green-500";
  }
  return "";
};

interface PersonalInfoStepProps {
  readonly form: UseFormReturn<AuthForm>;
  readonly isLogin?: boolean;
}

export default function PersonalInfoStep({ form, isLogin = false }: Readonly<PersonalInfoStepProps>) {
  const { register, formState } = form;
  
  return (
    <>
      {isLogin ? (
        <>
          <div>
            <label htmlFor="username-login" className="sr-only">Email</label>
            <Input
              id="username-login"
              type="email"
              placeholder="Email"
              {...register("username")}
              className="h-9"
            />
            {formState.errors.username && <p className="text-red-500 text-xs mt-1">{formState.errors.username.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="password-login" className="sr-only">Mot de passe</label>
            <Input
              id="password-login"
              type="password"
              placeholder="Mot de passe"
              {...register("password")}
              className="h-9"
            />
            {formState.errors.password && <p className="text-red-500 text-xs mt-1">{formState.errors.password.message}</p>}
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <label htmlFor="firstname" className="sr-only">Prénom</label>
              <Input
                id="firstname"
                placeholder="Prénom"
                {...register("firstName")}
                className={`h-9 ${getInputClassName(formState, "firstName")}`}
              />
              {formState.touchedFields.firstName && !formState.errors.firstName && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
              {formState.errors.firstName && <p className="text-red-500 text-xs mt-1">{formState.errors.firstName.message}</p>}
            </div>
            
            <div>
              <label htmlFor="lastname" className="sr-only">Nom</label>
              <Input
                id="lastname"
                placeholder="Nom"
                {...register("lastName")}
                className="h-9"
              />
              {formState.errors.lastName && <p className="text-red-500 text-xs mt-1">{formState.errors.lastName.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">Téléphone</label>
            <Input
              id="phone"
              type="tel"
              placeholder="Téléphone"
              {...register("phone")}
              className="h-9"
            />
            {formState.errors.phone && <p className="text-red-500 text-xs mt-1">{formState.errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
              className="h-9"
            />
            {formState.errors.email && <p className="text-red-500 text-xs mt-1">{formState.errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password-register" className="sr-only">Mot de passe</label>
            <Input
              id="password-register"
              type="password"
              placeholder="Mot de passe"
              {...register("password")}
              className="h-9"
            />
            {formState.errors.password && <p className="text-red-500 text-xs mt-1">{formState.errors.password.message}</p>}
          </div>
        </>
      )}
    </>
  );
}