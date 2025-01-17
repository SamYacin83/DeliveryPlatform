import React, { useRef, useState } from 'react';
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

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
        <div className="flex items-center gap-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
          <button
            type="button"
            onClick={handleClick}
            className="text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {t('auth:documents.chooseFile')}
          </button>
          <span className="text-sm text-muted-foreground flex-1">
            {fileName || t('auth:documents.chooseFile')}
          </span>
        </div>
      </div>
    );
  }
);

CustomFileUpload.displayName = 'CustomFileUpload';

export { CustomFileUpload };