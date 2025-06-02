'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios, { AxiosError } from 'axios'
import { useDebounceCallback } from 'usehooks-ts'
import React from "react";
import { toast } from "sonner"
import { signUpSchema } from "@/schemas/signUpSchema"
import { ApiResponse } from "@/types/Apiresponse"
import { LoaderCircle } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

const SignUpPage = () => {
    const [username, setUsername] = useState('')
    const [usernameResponseMessage, setUsernameResponseMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const debounced = useDebounceCallback(setUsername, 500);
    const router = useRouter();
    const { theme } = useTheme();

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })



    useEffect(() => {
        const checkUniqueUserName = async () => {
            if (username) {
                setIsCheckingUsername(true);
                setUsernameResponseMessage('');
                try {
                    const response = await axios.get(`/api/check-unique-username?username=${username}`);
                    setUsernameResponseMessage(response.data.message);
                } catch (error) {
                    const AxiosError = error as AxiosError<ApiResponse>;
                    setUsernameResponseMessage(
                        AxiosError.response?.data.message ?? "There is some error in checking unique username"
                    );
                } finally {
                    setIsCheckingUsername(false);
                }
            }
        }

        checkUniqueUserName()
    }, [username])

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        try {
            setIsSubmitting(true);
            const response = await axios.post(`/api/sign-up`, data);
            toast.success(response.data.message)
            router.replace(`/verify/${username}`);
        } catch (error) {
            const AxiosError = error as AxiosError<ApiResponse>;
            const errorMessage = AxiosError.response?.data.message;
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={`flex justify-center items-center min-h-screen ${theme === "light" ? "blue-to-white-right" : "bg-black"}`}>
            <div className={`w-full max-w-md p-8 space-y-8 ${theme === "light" ? "bg-white shadow-2xl shadow-[0px_4px_80px_rgba(50,133,255,0.3)]" : "bg-black shadow-2xl shadow-[0px_4px_80px_rgba(50,133,255,0.6)]"} rounded-lg`}>
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Join Speak freely
                    </h1>
                    <p className="mb-4">
                        Sign up to start your secret journey
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="username" {...field} onChange={(e) => {
                                            field.onChange(e);
                                            debounced(e.target.value);
                                        }} />
                                    </FormControl>
                                    {isCheckingUsername && <LoaderCircle />}

                                    <p className={`text-sm ${usernameResponseMessage === "Username is unique" ? "text-green-500" : "text-red-500"}`}>
                                        {usernameResponseMessage}
                                    </p>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="hover:cursor-pointer" disabled={isSubmitting}>{
                            isSubmitting ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : " Sign Up"
                        }</Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Already a member
                        <Link href='/sign-in' className="ml-1 text-blue-600 hover:text-blue-700">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;