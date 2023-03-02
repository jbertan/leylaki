import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { adminLogin } from "@/components/util/connectDb";
import { comparePassword, hashPassword } from "@/components/util/hash";
/* import { ConnectDatabase } from "../../../components/util/ConnectDb";
import { comparePassword } from "../../../components/util/Hash"; */
interface data1 {
  userName: string;
  password: string;
}
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      /* secret: process.env.SECRET,
      session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `strategy` should be set to 'jwt' if no database is used.
        strategy: "jwt",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 1 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
      },

      // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
      // option is set - or by default if no database is specified.
      // https://next-auth.js.org/configuration/options#jwt
      jwt: {
        // A secret to use for key generation (you should set this explicitly)
        secret: process.env.SECRET,
        // Set to true to use encryption (default: false)
        // encryption: true,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        // encode: async ({ secret, token, maxAge }) => {},
        // decode: async ({ secret, token, maxAge }) => {},
      }, */
      // The name to display on the sign in form (e.g. "Sign in with...")
      //name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      /* credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      }, */

      // @ts-ignore
      async authorize(
        credentials: { userName: string; password: string },
        req: any
      ) {
        const { userName, password } = credentials;
        const uppercaseUsername = userName.toUpperCase();
        const response = (await adminLogin(uppercaseUsername)) as data1;
        const approved = await comparePassword(password, response.password);

        //const result = await response.json();
        if (approved) {
          return { email: response.userName };
        } else {
          throw new Error("User Not Found");
        }

        /*      const client = await ConnectDatabase();
        const db = client.db("profile");
        const users = db.collection("users");
        const user = await users.findOne({ userName: userName }); */
        /*  const approved = await comparePassword(password, user.password);
        //client.closed();
        if (approved) {
 
          return { email: user.userName };
        } else {
  
          throw new Error("User Not Found");
        } */
        return { email: userName };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
