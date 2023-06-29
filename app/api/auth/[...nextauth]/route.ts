import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/utils/mongodb/dbConnect";
import User from "@/utils/mongodb/models/User";
// @ts-ignore
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // @ts-ignore
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connect();

        try {
          // @ts-ignore
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            const isPasswordValid = await bcrypt.compare(
              // @ts-ignore
              credentials.password,
              user.password
            );

            if (isPasswordValid) {
              return user;
            } else {
              throw new Error("Invalid credentials");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  pages: {
    error: "/",
  },
  callbacks: {
    session({ session, token, user }) {
      return session;
    },
    // @ts-ignore
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        await connect();

        try {
          const user = await User.findOne({ email: profile?.email });

          if (!user) {
            const createUser = new User({
              email: profile?.email,
              password: "",
              googleSignIn: true,
            });

            await createUser.save();
            return profile;
          }
        } catch (err: any) {
          throw new Error(err);
        }
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
