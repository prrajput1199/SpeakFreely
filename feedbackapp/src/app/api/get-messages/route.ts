import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/Users";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import mongoose from "mongoose";

export async function GET() {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user = session?.user as User;

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
        const FindUser = await userModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ]);


        if (!FindUser || FindUser.length === 0) {
            return Response.json({
                success: "Success",
                message: "There are feedbacks for you"
            },
                {
                    status: 200
                }
            )
        }

        return Response.json({
            success: "true",
            messages: FindUser[0].messages
        }, {
            status: 200
        })

    } catch (error) {
        return Response.json({
            success: "false",
            message: "There is some error while getting messages",
            error:error
        }, {
            status: 401
        })
    }
}