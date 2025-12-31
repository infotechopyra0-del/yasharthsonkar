import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

let handler;
try {
	handler = NextAuth(authOptions);
} catch (err: any) {
	// Log initialization error to server logs to help debugging on Vercel
	console.error('NextAuth initialization error:', err);
	// Re-throw so the platform still returns 500, but error is visible in logs
	throw err;
}

export { handler as GET, handler as POST };