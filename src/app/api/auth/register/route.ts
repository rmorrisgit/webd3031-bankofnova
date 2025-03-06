// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import pool from "../../../../lib/db"; // MariaDB pool connection
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        // Check if user already exists
        const [existingUser]: any[] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        // Check if any user is returned from the query
        if (existingUser && existingUser.length > 0) {
            return NextResponse.json({ error: "Email already registered" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const [result]: any[] = await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, "user"]
        );

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error registering user" }, { status: 500 });
    }
}