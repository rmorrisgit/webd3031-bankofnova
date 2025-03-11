import { NextResponse } from "next/server";
import pool from "../../../../lib/db"; // MariaDB pool connection
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/schemas/registerSchema";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Validate request body using Zod
        const validationResult = registerSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json({ 
                error: validationResult.error.errors.map((e) => e.message) 
            }, { status: 400 });
        }
        

        const { name, email, password } = validationResult.data;

        // Check if user already exists
        const [existingUser]: any[] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (existingUser && existingUser.length > 0) {
            return NextResponse.json({ error: "Email already registered" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, "user"]
        );

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error registering user" }, { status: 500 });
    }
}
