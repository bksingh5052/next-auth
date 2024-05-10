import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect()
export async function GET(request:NextRequest,response:NextResponse) {
    try {
        console.log("me")

        const userId = await getDataFromToken(request)
        console.log(userId)
        if(!userId){
            return NextResponse.json({message:"Token not found", status:400, success:false})
        }
        console.log(userId)
        const user = await User.findOne({_id: userId}).select("-password")
    
        return NextResponse.json({message: "User found",user, status:200, success:true})
    } catch (error:any) {
        return NextResponse.json({ error: error.message,status:500, success: false })
    }
}