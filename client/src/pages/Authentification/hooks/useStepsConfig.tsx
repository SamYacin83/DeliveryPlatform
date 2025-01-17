import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export type Step = {
  titleKey: string;
  fields: readonly string[];
  title?: string; 
};

export const useStepsConfig = () => {
  const { t } = useTranslation();

  const steps = useMemo(() => [
    {
      titleKey: "auth:steps.personalInfo",
      fields: ["firstName", "lastName", "email", "phone"],
    },
    {
      titleKey: "auth:steps.role",
      fields: ["role"],
    },
    {
      titleKey: "auth:steps.details",
      fields: ["address", "documents"],
    },
    {
      titleKey: "auth:steps.confirmation",
      fields: [],
    },
  ] as const, []);

  // Traduire les titres des étapes
  const translatedSteps = useMemo(() => 
    steps.map(step => ({
      ...step,
      title: t(step.titleKey)
    })), [steps, t]);

  return {
    steps: translatedSteps
  };
};

export default useStepsConfig;