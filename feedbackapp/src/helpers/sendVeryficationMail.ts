import { resend } from "@/lib/resend";
import VerificationEmail from "../../Emails/verificationEmail";
import { ApiResponse } from "@/types/Apiresponse";

export async function sendVeryficationMail(username: string, verifyCode: string, email: string): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification email',
            react: VerificationEmail({ username, verifyCode }),
        });

        return { success: true, message: "Veryfication email send successfully" };
    } catch (error) {
        return { success: false, message: "Failed to send veryfication Email", error: error };
    }
}