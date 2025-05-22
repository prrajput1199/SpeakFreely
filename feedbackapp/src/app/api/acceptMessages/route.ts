import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/Users";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import mongoose from "mongoose";

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    const { AcceptMessages } = await request.json();

    if (!session || !session?.user) {
        return Response.json({
            success: "false",
            message: "User is not authenticated"
        }, {
            status: 401
        })
    }

      const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const updatedUserInfo = await userModel.findByIdAndUpdate(
            userId,
            { isAcceptingMsg: AcceptMessages },
            { new: true }
        )

        if (!updatedUserInfo) {
            return Response.json({
                success: "false",
                message: "User status updation failed"
            }, {
                status: 401
            })
        }

        return Response.json({
            success: "true",
            message: "User status updation successful"
        }, {
            status: 200
        });

    } catch (error) {
        return Response.json({
            success: "false",
            message: "User status updation failed",
            error : error
        }, {
            status: 401
        })
    }



}

export async function GET() {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session?.user) {
        return Response.json({
            success: "false",
            message: "User is not authenticated"
        }, {
            status: 401
        })
    }

      const userId = user._id;

    try {

        const FindUser = await userModel.findById(userId);
       
        if (!FindUser) {
            return Response.json({
                success: "false",
                message: "User not found"
            }, {
                status: 404
            })
        }

        return Response.json({
            success: "true",
            isAcceptingMessages: FindUser.isAcceptingMsg
        }, {
            status: 200
        });

    } catch (error) {

        return Response.json({
            success: "false",
            message: "There is some error in getting accepting messages status",
            error:error
        }, {
            status: 500
        })
    }
}