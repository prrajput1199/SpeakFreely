'use client'

import MessageCard from '@/components/MessageCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Message } from '@/model/Users';
import { acceptMessageSchema } from '@/schemas/acceptMessage';
import { ApiResponse } from '@/types/Apiresponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { LoaderCircle, RefreshCcw } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from "zod";

const DashBoard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileURL, setProfileURL] = useState("");
  const { data: session } = useSession();
  const { theme } = useTheme();

  const HandleDeleteMessages = (messageID: string) => {
    setMessages(messages.filter((message) => {
      return message._id !== messageID
    }))
  }

  const form = useForm<z.infer<typeof acceptMessageSchema>>({
    resolver: zodResolver(acceptMessageSchema),
  })

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  const FetchIsAcceptingMessagesStatus = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>(`/api/acceptMessages`);

      if (response.data.isAcceptingMessages) {
        setValue('acceptMessages', response.data.isAcceptingMessages);
      }

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError?.response?.data.message || "failed to get the status that whether admin is accepting messages or not")
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue])

  const FetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    setIsSwitchLoading(false);
    try {
      const response = await axios.get<ApiResponse>(`/api/get-messages`)
      setMessages(response.data.messages || []);
      if (refresh) {
        toast.success("Showing latest messages");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError?.response?.data.message || "failed to get the messages")
    } finally {
      setIsLoading(false);
      setIsSwitchLoading(false);
    }
  }, [setMessages, setIsLoading]);

  useEffect(() => {
    if (!session || !session.user) return;
    FetchMessages();
    FetchIsAcceptingMessagesStatus();
  }, [session, setValue, FetchIsAcceptingMessagesStatus, FetchMessages]);

  useEffect(() => {
    if (typeof window !== "undefined" && session?.user.username) {
      const baseURL = `${window.location.protocol}//${window.location.host}`;
      setProfileURL(`${baseURL}/shareme/${session.user.username}`);
    }
  }, [session]);

  const handleSwitch = async () => {
    try {
      const response = await axios.post(`/api/acceptMessages`, {
        AcceptMessages: !acceptMessages
      });
      setValue("acceptMessages", !acceptMessages);
      toast.success(response?.data.message || "Successfully updated the status for accepting messages")
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError?.response?.data.message || "failed to change the status for accepting messages")
    }
  }

  // if (session) {
  //   const { username } = session?.user as User;
  // }

  const copyyToClickBoard = () => {
    navigator.clipboard.writeText(profileURL);
    toast.success("Your Profile URL has been copied to clipboard")
  }

  if (!session || !session.user) {
    return <Link href='/' className='w-full h-screen flex items-center justify-center'><Button className='text-white'>Go To Home Page</Button></Link>
  }

  return (
    <div className={`h-screen flex items-center  ${theme === "light" ? "blue-to-white-right" : "bg-black"}`}>
      <div className={`relative my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl dark:bg-black ${theme === "light" ? "bg-white shadow-2xl shadow-[0px_4px_80px_rgba(50,133,255,0.3)]" : "bg-black shadow-2xl shadow-[0px_4px_80px_rgba(50,133,255,0.6)]"}`}>
        <div className={`pointer-events-none absolute inset-0 z-50  ${theme === "light" ? "bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" : "   bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px]"} `}/>
        <div className='flex justify-end'>
          <Button onClick={() => {
            signOut();
          }} style={{
            background: "#3285FF"
          }}>Log out</Button>
        </div>
        <h1 className='text-4xl font-bold mb-4'>User Dashboard</h1>
        <div className="mb-4">
          <div className="text-lg font-semibold mb-2">
            Copy your unique Link
          </div>
          <div className="flex items-center gap-2">
            <Input type="text" value={profileURL} disabled />
            <Button onClick={copyyToClickBoard} variant={'secondary'}>Copy</Button>
          </div>
        </div>

        <div className="mb-4">

          <div className='flex items-center gap-2'>
            <Button className='mr-2' variant="secondary" onClick={(e) => {
              e.preventDefault();
              FetchMessages(true)
            }}>
              {
                isLoading ? <LoaderCircle className='h-4 w-4 animate-spin' /> : <RefreshCcw className='h-4 w-4' />
              }
            </Button>

            <Switch
              {...register('acceptMessages')}
              checked={acceptMessages}
              onCheckedChange={handleSwitch}
              disabled={isSwitchLoading}
            />

            <span className="ml-2"> <span className='font-bold mr-2'>Accept Messages:</span> {acceptMessages ? "On" : "Off"} </span>
          </div>


          {
            messages.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[350px] overflow-y-auto scrollbar-hide">{messages.map((message, index) => {
                return (
                  <MessageCard key={index} message={message} onMsgDelete={HandleDeleteMessages} />
                )
              })}
              </div>)
              : (
                <div className='flex justify-center items-center min-h-[300px]'>
                  <h2 className='text-center font-bold'>No messages to display</h2>
                </div>
              )
          }
        </div>


      </div>
    </div>

  )
}

export default DashBoard;