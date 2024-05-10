import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import {sendEmail} from '@/helper/mailer'



export async function POST(request: NextRequest){
    try {
        await connect();
        const {username,email,password } = await request.json()
        const user = await User.findOne({email}) || await User.findOne({username})
        if(user){
            return NextResponse.json({error: "User already exist", status: 400, success: false})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = await new User({
            username,
            email,
            password: hashedPassword
        }).save();

        // send mail

        const mailRes =  await sendEmail({email, mailType:"VERIFY", userId: newUser._id})

        return NextResponse.json({status:200,message: "User  created successfully, Please verify your email",success: true, newUser, mailRes})

    } catch (error:any) {
        return NextResponse.json({ error: error.message,status:500, success: false })
    }
}
