import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { UserRole } from '@/pages/types';

export type Step = {
  titleKey: string;
  fields: (role: UserRole) => readonly string[];
  title?: string; 
};

export const useStepsConfig = () => {
  const { t } = useTranslation();

  const steps = useMemo(() => [
    {
      titleKey: "auth:steps.personalInfo",
      fields: () => ["firstName", "lastName", "email", "phone", "birthDate", "password", "confirmPassword"],
    },
    {
      titleKey: "auth:steps.role",
      fields: () => ["role"],
    },
    {
      titleKey: "auth:steps.details",
      fields: (role: UserRole) => {
        const baseFields = ["address"];
        return role === "delivery" ? [...baseFields, "documents"] : baseFields;
      },
    },
    {
      titleKey: "auth:steps.confirmation",
      fields: () => [],
    },
  ] as const, []);

  const stepsWithTitles = useMemo(
    () =>
      steps.map((step) => ({
        ...step,
        title: t(step.titleKey),
      })),
    [steps, t]
  );

  return { steps: stepsWithTitles };
};

export default useStepsConfig;