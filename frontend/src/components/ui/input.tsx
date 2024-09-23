import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ suffix, className, type, ...props }, ref) => {
    return (
      <div className="flex gap-2 items-center border border-input rounded-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full bg-background px-3 py-2 text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
        {suffix && <div className="pr-2">{suffix}</div>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
