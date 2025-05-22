import mongoose, { Schema, Document } from "mongoose";


export interface Message extends Document {
    content: string,
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface Users extends Document {
    username: string,
    password: string,
    email: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isAcceptingMsg: boolean,
    isVerified: boolean,
    messages: Message[]
}

const UserSchema: Schema<Users> = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Username is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    email: {
        type: String,
        unique: true,
        // trim: true,
        required: [true, "Email is required"]
    },

    verifyCode: {
        type: String,
        required:[true, "Code is required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "CodeExpiry Date is required"]
    },
    isVerified:{
        type: Boolean,
        default:false
    },
    isAcceptingMsg: {
        type: Boolean,
        default:true
    },
    messages: [MessageSchema]
})

const userModel= (mongoose.models.Users as mongoose.Model<Users> || mongoose.model<Users>("Users",UserSchema));

export default userModel;