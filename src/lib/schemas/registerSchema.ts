import { z } from "zod";

export const registerSchema = z.object({
    name: z.string()
        .min(3, "Name must be at least 3 characters long") // ✅ Short name validation
        .max(50, "Name must be less than 50 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[\W_]/, "Password must contain at least one special character"),
});
