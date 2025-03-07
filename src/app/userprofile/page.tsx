"use client"; // Mark the component as client-side component

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for client-side routing

const UserProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Effect hook that handles the redirect logic, based on session state
  useEffect(() => {
    if (status === "loading") {
      return; // Skip the redirect during loading
    }
    
    // If not logged in, redirect to login page
    if (!session) {
      router.push("/authentication/login");
      return;
    }
    
    // If the user is an admin, redirect them to a different page (e.g., dashboard)
    if (session.user.role === "admin") {
      router.push("/dashboard"); // Replace with the appropriate route for admins
    }
  }, [session, status, router]);

  // Show loading spinner while session is being checked
  if (status === "loading" || !session) {
    return <div>Loading...</div>;
  }

  // Render user profile content for regular users only
  if (session.user.role !== "admin") {
    return (
      <div>
        <h1>User Profile</h1>
        <p>Welcome to your profile, Account Number: {session.user.account_number}</p>
        {/* You can also display other properties like email */}
        <p>Email: {session.user.email}</p>
        {/* Add more user profile details here */}
      </div>
    );
  }

  return null; // Admin should never see this page
};

export default UserProfile;
