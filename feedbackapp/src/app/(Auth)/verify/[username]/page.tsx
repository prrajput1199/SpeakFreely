'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useState } from "react"
import axios, { AxiosError } from 'axios'

import React from "react";
import { toast } from "sonner"
import { ApiResponse } from "../../../../types/Apiresponse"
import { LoaderCircle } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,

} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { verifySchema } from "@/schemas/verifySchema"

const VerifyYourAccount = () => {
    const router = useRouter();
    const params = useParams<{ username: string }>();
    const { username } = params;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            setIsSubmitting(true);
            const response = await axios.post(`/api/verify-code`, {
                username,
                verificationCode: data.code
            });
            toast.success(response.data.message);
            router.replace(`/sign-in`);
        } catch (error) {
            const AxiosError = error as AxiosError<ApiResponse>;
            const errorMessage = AxiosError.response?.data.message;
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Verify Your Acoount
                    </h1>
                    <p className="mb-4">
                        Enter the verification code sent to your email
                    </p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                name="code"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Enter your code" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="hover:cursor-pointer" disabled={isSubmitting}>{
                                isSubmitting ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : " Verify Code"
                            }</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default VerifyYourAccount;