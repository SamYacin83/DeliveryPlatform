import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
interface CustomFileUploadProps {
  id: string;
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
}

const CustomFileUpload = React.forwardRef<HTMLInputElement, CustomFileUploadProps>(
  ({ id, accept, onChange, className, name, ...props }, ref) => {
    const { t } = useTranslation();
    const [fileName, setFileName] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setFileName(file ? file.name : "");
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={cn("relative", className)}>
        <input
          type="file"
          id={id}
          accept={accept}
          ref={inputRef}
          onChange={handleChange}
          className="hidden"
          name={name}
          {...props}
        />
        <div className="flex gap-2 items-center">
          <Button
            type="button"
            onClick={handleClick}
            variant="outline"
            size="sm"
          >
            {t('auth:documents.chooseFile')}
          </Button>
          <span className="text-sm text-gray-600">
            {fileName || t('auth:documents.noFileChosen')}
          </span>
        </div>
      </div>
    );
  }
);

CustomFileUpload.displayName = 'CustomFileUpload';

export { CustomFileUpload };