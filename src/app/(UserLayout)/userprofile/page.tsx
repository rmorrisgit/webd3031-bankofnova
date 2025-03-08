"use client"; // Mark the component as client-side component

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for client-side routing


const UserProfile = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session object:", session);  // Log session object to check if account_number is included
  }, [session]);
  
  if (status === "loading" || !session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Account Number: {session?.user?.account_number || "Not available"}</p>
      <p>Email: {session?.user?.email || "No email"}</p>
    </div>
  );
};


export default UserProfile;
