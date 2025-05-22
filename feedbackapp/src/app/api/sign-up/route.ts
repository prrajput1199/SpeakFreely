import { sendVeryficationMail } from "@/helpers/sendVeryficationMail";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/Users";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    await dbConnect();
    const { username, email, password } = await request.json();
    try {
        const existingUserVerifiedByUsername = await userModel.findOne({
            username,
            isVerified: true
        });

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username has been already taken"
            }, {
                status: 400
            })
        }

        const existingUserByEmail = await userModel.findOne({
            email
        });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: "false",
                    message: "User already exist with this email"
                }, {
                    status: 500
                })
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                const expiryDate = new Date();
                existingUserByEmail.verifyCode = verifyCode;
                expiryDate.setHours(expiryDate.getHours() + 1);
                existingUserByEmail.verifyCodeExpiry = expiryDate;
                await existingUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const newUser = new userModel({
                username,
                password: hashedPassword,
                email,
                verifyCode: verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMsg: true,
                messages: []
            })
            await newUser.save();
        }

        const emailResponse = await sendVeryficationMail(username, verifyCode, email);

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {
                status: 500
            })
        }

        return Response.json({
            success: true,
            message: "User registered successfully.Please verify your email"
        })

    } catch (error) {
        return Response.json({
            success: "false",
            message: "Registration failed",
            error:error
        }, {
            status: 500
        })
    }
}