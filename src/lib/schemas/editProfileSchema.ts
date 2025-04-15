import { z } from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .optional()
    .or(z.literal("")) // allows empty string
    .refine(
      (val) =>
        !val || (val.length >= 8 &&
          /[A-Z]/.test(val) &&
          /[a-z]/.test(val) &&
          /[0-9]/.test(val) &&
          /[\W_]/.test(val)),
      {
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      }
    ),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;
