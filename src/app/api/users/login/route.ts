import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'


export async function POST(req:NextRequest, res:NextResponse) {
    try {
        console.log('login')
        await connect()
        const {email, password} = await req.json()
        if(email.trim()=== '' || password.trim()=== ''){
            return NextResponse.json({error: "Please provide email and password", status: 400, success: false})
        }
        console.log(email,password)
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User not found", status: 400, success: false})
        }
        const isVerfiedPassword = bcryptjs.compare(password, user.password)
        if(!isVerfiedPassword){
            return NextResponse.json({error: "Please check credential", status: 400, success: false})
        }

        const tokenData = {
        _id: user._id,
        email: user.email
        }
        const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d' })
        const response = NextResponse.json({message:"LoggedIn successfully", succes:true, status: 200})

        response.cookies.set("token",token,{
            httpOnly: true,
            expires: Date.now() + 86400000 
        })
        return response;

    } catch (error:any) {
        return NextResponse.json({ error: error.message,status:500, success: false })
    }
}