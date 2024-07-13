import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
// import { NextApiRequest, NextApiResponse } from "next";

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
            return {
              id: user.id,
              name: user.nome,
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
    async redirect({ url, baseUrl }) {
      const response = await fetch(`${baseUrl}/api/auth/session`);
      const data = await response.json();
      const user = data?.user;

      if (user?.tipo) {
        if (user.tipo === "Vendedor") {
          return `${baseUrl}/Sellers/Dashboard`;
        } else if (user.tipo === "Cliente") {
          return baseUrl;
        }
      }
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };