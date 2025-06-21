
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export interface FileInputProps {
  onChange: (file: File | null) => void;
  accept?: string;
  className?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange, accept = ".pdf,.jpg,.jpeg,.png", className, ...props }, ref) => {
    const [fileName, setFileName] = React.useState<string>("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        setFileName(file.name);
        onChange(file);
      } else {
        setFileName("");
        onChange(null);
      }
    };

    const handleClick = () => {
      inputRef.current?.click();
    };

    return (
      <div className={cn("w-full", className)}>
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
          {...props}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          className="w-full justify-start text-left font-normal"
        >
          <Upload className="mr-2 h-4 w-4" />
          {fileName || "Choose file..."}
        </Button>
        {fileName && (
          <p className="text-sm text-muted-foreground mt-2">
            Selected: {fileName}
          </p>
        )}
      </div>
    );
  }
)
FileInput.displayName = "FileInput"

export { FileInput }
