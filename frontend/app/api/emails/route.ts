import { sendEmail } from "@/utils/mail.util"
import data from "@/uploads/output.json"
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

console.log(data[0]);
const format = data[0].format;
const teamA = data[0].teamA;
const teamB = data[0].teamB;
const matchName = data[0].matchName;

export async function POST() {
    
    const session = await getServerSession(authOptions);

    const sender = {
        name: 'My App',
        address: 'no-reply@example.com' // change this to domain
    }

    const receipients = [{
        name: session?.user?.name || 'Vedant Shah',
        address:  session?.user?.email ||'pravincj@gmail.com',
    }]

    try{
        const result = await sendEmail({
            sender,
            receipients,
            subject: `Get ready for ${matchName}`,
            message: `Today we will have a thrilling ${format} match between ${teamA} and ${teamB} `,
        })
        return Response.json({
            accepted: result.accepted,
        })
    }
    catch(error: any){
        console.log('Email send failed: ', error)
        return Response.json({ message: `email failed: ${error.message}` }, { status: 500 });
    }
}