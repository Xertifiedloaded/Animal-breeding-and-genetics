
import NextAuth from "next-auth/next";
import { authOptions } from "../../../lib/authOption";


export default NextAuth(authOptions);