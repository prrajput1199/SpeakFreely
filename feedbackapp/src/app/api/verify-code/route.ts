import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/Users";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, verificationCode } = await request.json();

        const decodedUserName = decodeURIComponent(username);

        const user = await userModel.findOne({
            username: decodedUserName
        })

        if (!user) {
            return Response.json({
                success: "false",
                message: "user not found"
            }, {
                status: 500
            })
        }

        const isCodeVerified = user.verifyCode === verificationCode;
        const codeDidNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeVerified && codeDidNotExpired) {
            user.isVerified = true;
            await user.save();

            return Response.json({
                success: true,
                message: "Verification successful"
            }, {
                status: 200
            })
        } else if (!isCodeVerified) {
            return Response.json({
                success: "false",
                message: "Verification code is incorrect"
            }, {
                status: 400
            })
        } else {
            return Response.json({
                success: "false",
                message: "Verification code is expired , signup again to get new code"
            }, {
                status: 400
            })
        }
    } catch (error) {
        return Response.json({
            success: "false",
            message: "Verification failed",
            error:error
        }, {
            status: 500
        })
    }
}