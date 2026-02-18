
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Container({ className, size = "md", children, ...props }: ContainerProps) {
  const sizes = {
    sm: "max-w-xl",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div
      className={cn("mx-auto w-full px-5 sm:px-8", sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
