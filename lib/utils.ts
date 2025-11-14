import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// cn merges conditional className strings while deduplicating Tailwind utilities.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
