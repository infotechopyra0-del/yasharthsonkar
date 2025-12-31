import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

let handler;
try {
	handler = NextAuth(authOptions);
} catch (err: any) {
	throw err;
}

export { handler as GET, handler as POST };