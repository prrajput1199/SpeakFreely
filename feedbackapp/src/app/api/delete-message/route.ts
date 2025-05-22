import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/Users";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { NextRequest } from "next/server";

export async function DELETE(
    req: NextRequest
) {
    const { DeleteMessageID } = await req.json();
    await dbConnect();
    const session = await getServerSession(authOptions);

    const currentUser = session?.user as User;

    if (!session || !session?.user) {
        return Response.json({
            success: "false",
            message: "User is not authenticated"
        }, {
            status: 401
        })
    }

    try {
        const UpdatedResult = await userModel.updateOne(
            { _id: currentUser._id },
            { $pull: { messages: { _id: DeleteMessageID } } }
        )

        if (UpdatedResult.modifiedCount == 0) {
            return Response.json({
                success: "false",
                message: "Message not found or already deleted"
            }, {
                status: 404
            })
        }

        return Response.json({
            success: "true",
            message: "Message Deleted"
        }, {
            status: 200
        })

    } catch (error) {
        return Response.json({
            success: "false",
            message: "There is some error while Deleting messages",
            error: error
        }, {
            status: 500
        })
    }
}