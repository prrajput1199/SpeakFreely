import nodemailer from 'nodemailer';
import { ApiResponse } from "@/types/Apiresponse";

export async function sendVeryficationMail(username: string, verifyCode: string, email: string): Promise<ApiResponse> {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        const htmlContent = `
        <h2>Hello ${username},</h2>
        <p>Your verification code is: <strong>${verifyCode}</strong></p>
         `;

        await transporter.sendMail({
            from: `"SpeakFreely" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verification Email',
            html: htmlContent,
        });

        return { success: true, message: 'Verification email sent successfully' };
    } catch (error) {
        return { success: false, message: "Failed to send veryfication Email", error: error };
    }
}