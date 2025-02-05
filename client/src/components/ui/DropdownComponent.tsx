import { SelectContent, SelectItem, Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

interface Option {
  id: string;
  label: string;
}

interface DropdownProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  options: Option[];
  isLoading?: boolean;
  error?: boolean;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  loadingText?: string;
  errorText?: string;
  emptyText?: string;
}

export function DropdownComponent<T extends FieldValues>({ 
  control, 
  name, 
  options, 
  isLoading = false, 
  error = false,
  disabled = false,
  label = "",
  placeholder = "Sélectionner une option",
  description,
  className,
  loadingText = "Chargement...",
  errorText = "Erreur de chargement",
  emptyText = "Aucune option disponible"
}: Readonly<DropdownProps<T>>) {
  const renderOptions = () => {
    if (isLoading) {
      return <SelectItem value="loading" disabled>{loadingText}</SelectItem>;
    }
    
    if (error) {
      return <SelectItem value="error" disabled>{errorText}</SelectItem>;
    }
    
    if (options.length === 0) {
      return <SelectItem value="empty" disabled>{emptyText}</SelectItem>;
    }
    
    return options.map((option) => (
      <SelectItem 
        key={option.id} 
        value={option.id}
        disabled={disabled}
      >
        {option.label}
      </SelectItem>
    ));
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select 
              onValueChange={field.onChange} 
              value={field.value}
              disabled={disabled || isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {renderOptions()}
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
