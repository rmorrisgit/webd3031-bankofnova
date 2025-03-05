import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/authentication/login", // Redirect unauthorized users here
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Protect these routes
};
