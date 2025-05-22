import { Message } from "@/model/Users"

export type ApiResponse = {
    success: boolean,
    message: string,
    isAcceptingMessages?: boolean,
    messages?: Array<Message>,
    error?: unknown
}