import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email, mailType, userId}:any)=>{
    try {

      const hashedToken = await bcryptjs.hash(userId.toString(),10)
      if(mailType=== 'VERIFY'){
        await User.findByIdAndUpdate(userId,{
          verfiyToken: hashedToken, 
          verifyTokenExpiry : Date.now() + 3600000
        })
      }
      if(mailType=== 'RESET'){
        await User.findByIdAndUpdate(userId,{
          forgotPasswordToken: hashedToken, 
          forgotPasswordTokenExpiry : Date.now() + 3600000
        })
      }

        const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "b4c340e83b5774",
            pass: "c5be7c96ac9342"
            },
          });
        const mailOptions = {
            from: 'demomailtrap.com', // sender address
            to: email, // list of receivers
            subject: mailType === "VERIFY" ? "Verify your email":"Reset your password",
            html: `<p>Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>Here</a> to ${mailType === 'VERIFY'? "Verify your email": "Reset your password"} or copy the link and paste in the browser ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`, 
          }


        const mailResponse = await transporter.sendMail(mailOptions)
        return  mailResponse

    } catch (error:any) {
        throw new Error(error.message)
    }
}

