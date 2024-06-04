import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        try {
          const response = await axios.post(
            "http://localhost:5000/Users/Post/Login",
            {
              email: credentials.email,
              senha: credentials.password,
            }
          );
          const user = response.data.user;

          if (user) {
            
            // console.log(user);
            return {
              id: user.id,
              nome: user.nome,
              email: user.email,
              tipo: user.tipo,
            };

          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          throw new Error("Login failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/Login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.tipo = user.tipo;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.tipo = token.tipo;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      const response = await fetch(`${baseUrl}/api/auth/session`);
      const data = await response.json();
      const user = data.user;

      if (user?.tipo) {
        if (user.tipo === "Vendedor") {
          return "http://localhost:3000/Sellers/Dashboard";
        } else if (user.tipo === "Cliente") {
          return "http://localhost:3000/";
        }
      }
      return "http://localhost:3000/";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// export default NextAuth(authOptions);
// Export a named export for each HTTP method instead.
// export{ authOptions as GET, authOptions as POST };

const authHandler = NextAuth(authOptions);
export const GET = (req: NextApiRequest, res: NextApiResponse) =>
  authHandler(req, res);
export const POST = (req: NextApiRequest, res: NextApiResponse) =>
  authHandler(req, res);
