import { z } from "zod"

// contactSchema validates the public form before hitting the API route.
const optionalLimitedField = (max: number, fieldLabel: string) =>
  z
    .string()
    .trim()
    .max(max, `${fieldLabel} must be ${max} characters or fewer.`)
    .optional()
    .transform((value) => value ?? "")

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: optionalLimitedField(50, "Phone"),
  service: optionalLimitedField(100, "Service description"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters long.")
    .max(2000, "Message must be 2000 characters or fewer."),
})

export type ContactFormValues = z.infer<typeof contactSchema>
