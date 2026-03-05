import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Merging Tailwind classes and determines which ones to apply
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
