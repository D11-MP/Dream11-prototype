import dbConnect from "../../../../lib/dbConnect";
import UserModel from "../../../../models/user";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "srinjoy.demo@gmail.com" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials:Record<"email"|"password", string>|undefined):Promise<any> {
        if (!credentials?.email || !credentials?.password) throw new Error("Email and password are required")

        try {
          await dbConnect();
          const user = await UserModel.findOne({email:credentials.email}).select('+password');
          if(!user) throw new Error('No User found');

          const isPasswordCorrect = await bcrypt.compare(credentials.password , user?.password);
          if(!isPasswordCorrect) throw new Error('Password not Correct');
           
          return user;
        } catch (error) {
          console.log(`Some error Occured\n${error}`);
          return null;
        }  
      },
    }),
  ],
  callbacks:{
    async jwt({token , user}){
      if(user){
        token._id = user._id,
        token.name = user.name,
        token.email = user.email
      }
      return token;
    },
    async session({session , token}){
      if(token){
        session.user._id = token._id,
        session.user.name = token.name,
        session.user.email = token.email
      }
      return session;
    }
  },
  pages:{
    signIn : '/login'
  }
};