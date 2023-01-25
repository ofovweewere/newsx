import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      //   credentials: {
      //     username: { label: "Username", type: "text", placeholder: "jsmith" },
      //     password: { label: "Password", type: "password" },
      //   },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        const { email, password } = credentials;

        const user = await User.findOne({ email }).exec();
        const userDoc = user._doc;
        const isMatched = await bcrypt.compare(password, userDoc.password);
        console.log({ userDoc: userDoc });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          delete userDoc.password;
          return userDoc;
        } else {
          console.log("Here called 2");
          // If you return null then an error will be displayed advising the user to check their details.

          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      console.log("Session", { session, user });
      if (user && user.id) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user && user._id) {
        token.id = user._id;
      }
      return token;
    },
  },
});
