import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary-400 to-primary-500 text-primary-foreground hover:from-primary-500 hover:to-primary-600 shadow-lg hover:shadow-glow focus-visible:shadow-glow-lg",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg focus-visible:ring-destructive/50",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary-300 shadow-md hover:shadow-lg focus-visible:border-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg",
        ghost: "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-600 focus-visible:underline",
        gradient: "bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 text-primary-foreground hover:from-primary-500 hover:via-primary-600 hover:to-primary-700 shadow-glow hover:shadow-glow-lg focus-visible:shadow-glow-lg",
        glassmorphism: "backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 shadow-lg hover:shadow-xl focus-visible:bg-white/30",
        // Enhanced CTA variants for proper hierarchy
        cta: "bg-gradient-to-r from-primary-400 to-primary-500 text-primary-foreground hover:from-primary-500 hover:to-primary-600 shadow-lg hover:shadow-glow font-bold border-0 hover:scale-110 focus-visible:shadow-glow-lg focus-visible:scale-110",
        ctaSecondary: "border-2 border-primary text-primary bg-transparent hover:bg-primary/5 hover:text-primary font-semibold hover:scale-105 shadow-md hover:shadow-lg focus-visible:bg-primary/10 focus-visible:scale-105",
        ctaOutline: "border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900 font-semibold hover:scale-105 shadow-md hover:shadow-xl focus-visible:bg-white/20"
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
