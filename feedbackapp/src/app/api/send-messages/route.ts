import dbConnect from "@/lib/dbConnect";
import userModel, { Message } from "@/model/Users";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, content } = await request.json();

        const user = await userModel.findOne({
            username: username
        });

        if (!user) {
            return Response.json({
                success: "false",
                message: "user not found"
            }, {
                status: 404
            })
        }

        if (!user.isAcceptingMsg) {
            return Response.json({
                success: "false",
                message: "user is not accepting messages"
            }, {
                status: 403
            })
        }

        const createdMessages = { content, createdAt: new Date() }
        user.messages.push(createdMessages as Message);

        await user.save();

        return Response.json({
            success: "true",
            message: "feedback has been successfully sent"
        }, {
            status: 200
        })

    } catch (error) {
        return Response.json({
            success: "false",
            message: "There is some error while sending messages",
            error:error
        }, {
            status: 401
        })
    }
}