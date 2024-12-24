import { motion } from "framer-motion";

interface Step {
  readonly title: string;
  readonly fields: readonly string[];
}

interface ProgressBarProps {
  readonly step: number;
  readonly steps: readonly Step[];
}

const getStepStyleClass = (currentStep: number, stepIndex: number): string => {
  if (stepIndex < currentStep) {
    return "bg-primary border-primary text-primary-foreground";
  }
  if (stepIndex === currentStep) {
    return "border-primary text-primary";
  }
  return "border-muted text-muted-foreground";
};

export default function ProgressBar({ step, steps }: Readonly<ProgressBarProps>) {
  const progressPercentage = Math.round((step / (steps.length - 1)) * 100);

  return (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>Progression</span>
        <span>{progressPercentage}%</span>
      </div>

      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="grid grid-cols-4 gap-4 md:gap-8 relative">
        {steps.map((stepItem) => (
          <div 
            // Ici, nous utilisons le titre comme clé puisqu'il devrait être unique
            // Dans un cas réel, il serait préférable d'avoir un ID unique pour chaque étape
            key={stepItem.title} 
            className="flex flex-col items-center text-center"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                getStepStyleClass(step, steps.indexOf(stepItem))
              }`}
            >
              {steps.indexOf(stepItem) + 1}
            </div>
            <span className="text-xs mt-1 text-muted-foreground">
              {stepItem.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}