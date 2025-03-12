"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas/registerSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const responseData = await res.json();

            if (!res.ok) {
                throw new Error(responseData.error || "Registration failed");
            }

            alert("Registration successful! Redirecting to login...");
            router.push("/login"); 
        } catch (error: any) {
            setServerError(error.message);
        }
    };

    // Determine which field to highlight first
    const firstError = errors.name?.message || errors.email?.message || errors.password?.message;

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

                {serverError && <p className="text-red-500 text-center">{serverError}</p>}

                {/* Name Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input 
                        {...register("name")} 
                        className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 ${
                            errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                        }`} 
                        placeholder="Enter your name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email Input - Show only if no name error */}
                {!errors.name && (
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input 
                            {...register("email")} 
                            type="email" 
                            className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 ${
                                errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                            }`} 
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                )}

                {/* Password Input - Show only if no name and email error */}
                {!errors.name && !errors.email && (
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input 
                            {...register("password")} 
                            type="password" 
                            className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 ${
                                errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                            }`} 
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                )}

                {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className={`w-full p-3 text-white rounded-lg font-semibold transition ${
                        isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}
