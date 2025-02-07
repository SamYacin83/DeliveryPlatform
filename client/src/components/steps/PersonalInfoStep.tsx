import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { AuthForm } from "../../pages/types";
import { useTranslation } from 'react-i18next';

const getInputClassName = (
  formState: any, 
  fieldName: "firstName" | "lastName" | "phone" | "email" | "password" | "birthDate"
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
  const { t } = useTranslation();
  return (
    <>
      {isLogin ? (
        <>
          <div>
            <label htmlFor="email" className="sr-only">{t('auth:login.subtitle')}</label>
            <Input
              id="email"
              type="email"
              placeholder={t('auth:login.email')}
              {...register("email")}
              className="h-9"
            />
            {formState.errors.email && <p className="text-red-500 text-xs mt-1">{formState.errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="password-login" className="sr-only">{t('auth:login.password')}</label>
            <Input
              id="password-login"
              type="password"
              placeholder={t('auth:login.password')}
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
              <label htmlFor="firstname" className="sr-only">{t('auth:fields.firstName')}</label>
              <Input
                id="firstname"
                placeholder={t('auth:fields.firstName')}
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
              <label htmlFor="lastname" className="sr-only">{t('auth:fields.lastName')}</label>
              <Input
                id="lastname"
                placeholder={t('auth:fields.lastName')}
                {...register("lastName")}
                className="h-9"
              />
              {formState.errors.lastName && <p className="text-red-500 text-xs mt-1">{formState.errors.lastName.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">{t('auth:fields.phone')}</label>
            <Input
              id="phone"
              type="tel"
              placeholder={t('auth:fields.phone')}
              {...register("phone")}
              className="h-9"
            />
            {formState.errors.phone && <p className="text-red-500 text-xs mt-1">{formState.errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="sr-only">{t('auth:fields.email')}</label>
            <Input
              id="email"
              type="email"
              placeholder={t('auth:fields.email')}
              {...register("email")}
              className="h-9"
            />
            {formState.errors.email && <p className="text-red-500 text-xs mt-1">{formState.errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="birthdate" className="sr-only">{t('auth:fields.birthdate')}</label>
            <div className="group relative">
              <Input
                id="birthdate"
                type="date"
                placeholder={t('auth:fields.birthdate')}
                {...register("birthDate")}
                className={`h-9 ${getInputClassName(formState, "birthDate")}`}
                required
              />
              <div className="absolute left-0 -top-8 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">
                {t('auth:fields.birthdateFormat')}
              </div>
            </div>
            {formState.errors.birthDate && (
              <p className="text-red-500 text-xs mt-1">{formState.errors.birthDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="sr-only">{t('auth:fields.password')}</label>
            <Input
              id="password"
              type="password"
              placeholder={t('auth:fields.password')}
              {...register("password")}
              className="h-9"
            />
            {formState.errors.password && <p className="text-red-500 text-xs mt-1">{formState.errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="sr-only">{t('auth:fields.confirmPassword')}</label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder={t('auth:fields.confirmPassword')}
              {...register("confirmPassword")}
              className="h-9"
            />
            {formState.errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{formState.errors.confirmPassword.message}</p>}
          </div>
        </>
      )}
    </>
  );
}