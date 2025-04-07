import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import { getEmployerDetails } from '@/lib/db'; // Import the function

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const employers = await getEmployerDetails(); // Call the updated function

    if (!employers || employers.length === 0) { // Check if employers exist and handle empty result
      return NextResponse.json({ error: 'No employers found' }, { status: 404 });
    }

    return NextResponse.json(employers); // Return the list of employers
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
