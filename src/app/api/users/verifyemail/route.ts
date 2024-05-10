import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";



export async function POST(req: NextRequest, res:NextResponse) {
    try {
        await connect()
        const {token} = await req.json();
        console.log(token)
        if(!token){
            return NextResponse.json({ error: "Token not found",status:400, success: false })
        }

        const user = await User.findOne({verfiyToken: token})
        if(!user){
            return NextResponse.json({ error: "Invalid token found",status:400, success: false })
        }
        user.isVerified = true
        user.verfiyToken= undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({ message: "Email verified successfully",status:200, success: true })
            
    } catch (error:any) {
        return NextResponse.json({ error: error.message,status:500, success: false })
    }
}