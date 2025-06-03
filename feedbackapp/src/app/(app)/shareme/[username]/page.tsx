'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import * as z from 'zod';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';
import { ApiResponse } from '@/types/Apiresponse';
import { toast } from 'sonner';
import { useGeminiCompletion } from '@/components/hooks/useGeminiCompletion';
import { useTheme } from 'next-themes';

// ---- Helpers ----
const specialChar = '||';
const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "The UI was smooth and fast - nice job! Maybe add a few preset prompts or styles to help first-time users explore the tool easily.|| It captured most of the prompt well, especially the background details. Might be good to make character expressions or actions more accurate || Nice work! The product is easy to understand at first glance. It might be helpful to add a short onboarding tooltip or intro text for new users to get started quickly.";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const { theme } = useTheme();

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useGeminiCompletion('/api/suggest-messages', initialMessageString);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-messages', {
        ...data,
        username,
      });

      toast.success(response.data.message);
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      complete();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const [isClient, setIsClient] = useState(false)


  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="container mx-auto p-6 rounded-lg max-w-4xl">
      <div className={`relative lg:mx-auto p-6 rounded-lg w-full max-w-6xl ${theme === "light" ? "bg-white shadow-2xl shadow-[0px_4px_80px_rgba(50,133,255,0.3)]" : "bg-black shadow-2xl shadow-[0px_4px_80px_rgba(50,133,255,0.6)]"}`}>
        <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
        <h1 className="text-4xl font-bold mb-6 text-center">
          Public Profile Link
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your anonymous message here"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              {isLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading || !messageContent}>
                  Send It
                </Button>
              )}
            </div>
          </form>
        </Form>

        <div className="space-y-4 my-8">
          <div className="space-y-2">
            <Button
              onClick={fetchSuggestedMessages}
              className="my-4"
              disabled={isSuggestLoading}
            >
              Suggest Messages
            </Button>
            <p>Click on any message below to select it.</p>
          </div>
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Messages</h3>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              {error ? (
                <p className="text-red-500">{error.message}</p>
              ) : (
                parseStringMessages(completion).map((message, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="mb-2 break-words whitespace-normal overflow-hidden p-8"
                    onClick={() => handleMessageClick(message)}
                  >
                    {message}
                  </Button>
                ))
              )}
            </CardContent>
          </Card>
        </div>
        <Separator className="my-6" />
        <div className="text-center">
          <div className="mb-4">Get Your Message Board</div>
          <Link href={'/sign-up'}>
            <Button>Create Your Account</Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
