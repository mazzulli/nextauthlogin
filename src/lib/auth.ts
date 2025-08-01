import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";

import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { CredentialsSignin } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";
import Nodemailer from "next-auth/providers/nodemailer";
import Resend from "next-auth/providers/resend";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { loginSchema } from "./models/login-schema";
import { User } from "@/generated/prisma";

export async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

const adapter = PrismaAdapter(prisma);

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET!,
  trustHost: true,
  adapter,
  providers: [
    GitHub,
    Google,
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      from: process.env.RESEND_EMAIL_DOMAIN!,
    }),
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT!),
        secure: process.env.EMAIL_SERVER_SECURE!,
        auth: {
          user: process.env.EMAIL_SERVER_FROM_ADDRESS,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_SERVER_FROM_ADDRESS,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new CredentialsSignin("Email e senha são obrigatórios.");
        }

        // validate credentials using Zod schema
        const validatedCredentials = loginSchema.parse(credentials);
        const user = await prisma.user.findFirst({
          where: {
            email: validatedCredentials.email,
          },
        });

        if (!user) {
          throw new Error("Usuário ou senha inválido.");
        }

        if (!user?.password) {
          throw new Error("Usuário ou senha inválido.");
        }

        // usar par criar a senha criptografada para salvar no banco de dados
        //const hashedPassword = await hashPassword(user?.password);

        const isValidPassword = await verifyPassword(
          validatedCredentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Hash de senha inválido.");
        }

        if (!user?.isActive) {
          throw new Error("Usuário inativo.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
    async session({ session, user }) {
      if (session?.user && user) {
        session.user.id = (user as User).id;
        session.user.email = (user as User).email;
        session.user.name = (user as User).name;
        session.user.image = (user as User).image;
        session.user.isActive = (user as User).isActive;
      }
      return session;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // valid for 1 day
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
});
