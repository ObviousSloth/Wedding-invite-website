
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Container({ className, size = "md", children, ...props }: ContainerProps) {
  const sizes = {
    sm: "max-w-xl",
    md: "max-w-2xl md:max-w-3xl lg:max-w-4xl",
    lg: "max-w-4xl lg:max-w-5xl xl:max-w-6xl",
    xl: "max-w-6xl lg:max-w-7xl",
  };

  return (
    <div
      className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
