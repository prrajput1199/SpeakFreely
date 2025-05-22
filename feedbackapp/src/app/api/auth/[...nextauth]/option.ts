import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";
import bcrypt from "bcrypt";
import dbConnect from "../../../../lib/dbConnect";
import userModel from "../../../../model/Users";

interface CredentialInputs {
    identifier: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: 'Credentials',
            credentials: {
                identifier: { label: "Email/UserName", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials): Promise<User | null> {
                await dbConnect();

                const { identifier, password } = credentials as CredentialInputs;
                try {
                    const user = await userModel.findOne({
                        $or: [
                            { email: identifier },
                            { username: identifier }
                        ]
                    })

                    if (!user) {
                        throw new Error("No user found with this email")
                    }

                    if (!user.isVerified) {
                        throw new Error("Please verify your account before login ")
                    }

                    const isPasswordCorrect = await bcrypt.compare(password, user.password);

                    if (isPasswordCorrect) {
                        // console.log("I am testing in backend User =>", user);
                        return user as User;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Authorize error:", error);
                    // throw new Error("Authentication failed");
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMsg = user.isAcceptingMsg;
                token.username = user.username;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMsg = token.isAcceptingMsg;
                session.user.username = token.username;
            }
            return session;
        }
    },
    pages: {
        signIn: "/sign-in"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}