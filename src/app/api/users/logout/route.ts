import { NextRequest, NextResponse } from "next/server"


export async function GET(req:NextRequest, res:NextResponse) {
    try {
        const response = NextResponse.json({
            messege: "Logout successfully",
            success: true,
            status: 200
        })
        response.cookies.set('token',"",{
            httpOnly:true,
            expires: new Date(0)
        })
        return response;
    } catch (error:any) {
        return NextResponse.json({ error: error.message,status:500, success: false })
    }
}