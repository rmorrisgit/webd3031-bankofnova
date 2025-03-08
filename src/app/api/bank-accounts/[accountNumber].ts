import { NextResponse } from "next/server";
import { getUserByAccountNumber } from "../../../lib/db"; // Assuming this is the correct path

// Handler for the GET request to fetch user data by account number
export async function GET(request: Request, { params }: { params: { accountNumber: string } }) {
  try {
    const accountNumber = params.accountNumber; // Extract the account number from the URL params

    // Fetch user data using the account number
    const user = await getUserByAccountNumber(accountNumber);

    // If user exists, return user data as JSON response
    if (user) {
      return NextResponse.json({ user });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch user data" }, { status: 500 });
  }
}
