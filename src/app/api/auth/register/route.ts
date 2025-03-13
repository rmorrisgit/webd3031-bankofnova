import { NextResponse } from "next/server";
import pool from "../../../../lib/db"; // MariaDB pool connection
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/schemas/registerSchema";

// Function to generate a unique 8-digit account number
const generateAccountNumber = async (): Promise<string> => {
    let accountNumber: string = ""; // Initialize the variable
    let exists = true;

    while (exists) {
        accountNumber = Math.floor(10000000 + Math.random() * 90000000).toString(); // Generate random 8-digit number

        const [result]: any[] = await pool.query(
            "SELECT COUNT(*) AS count FROM bank_accounts WHERE account_number = ?",
            [accountNumber]
        );

        exists = result[0]?.count > 0; // If count > 0, regenerate
    }

    return accountNumber;
};


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

        if (existingUser.length > 0) {
            return NextResponse.json({ error: "Email already registered" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database and get the inserted ID
        const [userResult]: any = await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, "user"]
        );

        const userId = userResult.insertId; // Get new user's ID

        // Generate a unique random 8-digit account number
        const accountNumber = await generateAccountNumber();

        // Insert new bank account for the user
        await pool.query(
            "INSERT INTO bank_accounts (user_id, account_number, account_type) VALUES (?, ?, ?)",
            [userId, accountNumber, "chequing"]
        );

        return NextResponse.json({ 
            message: "User and bank account created successfully", 
            accountNumber 
        }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error registering user" }, { status: 500 });
    }
}
