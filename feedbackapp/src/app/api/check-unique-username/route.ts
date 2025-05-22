import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/Users";
import { usernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const usernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParams = searchParams.get("username");
        const result = usernameQuerySchema.safeParse({ username: queryParams });

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(',') : "Invalid query parameters"
            }, { status: 400 })
        }

        const existingVerifiedUser = await userModel.findOne({
            username: queryParams,
            isVerified: true
        })

        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: "username has been already taken"
            }, { status: 400 })
        }

        return Response.json({
            success: true,
            message: "Username is unique"
        })

    } catch (error) {
        return Response.json({
            success: false,
            message: "There is some error while checking username",
            error:error
        }, { status: 500 })
    }
}