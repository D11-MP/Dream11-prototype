import UserModel from "../../models/user";
import dbConnect from "../dbConnect";
import bcrypt from 'bcryptjs'

export async function signup(request:Request) {
    try {
        const data = await request.json();
        const { password , name , email} = data;
        await dbConnect();
        const userFound = await UserModel.findOne({email});
        if(userFound) return Response.json({message:'User already exist with same email'},{status:400});
        const hashedPassword = await bcrypt.hash(password, 10);
        const userCreated = new UserModel({email:email , name:name , password:hashedPassword , createdAt:Date.now() });
        await userCreated.save();
        return Response.json({message:'User created successfully'},{status:201})
    }catch(error){
        console.log('Some error occured while signing up new user');
        return Response.json({error:error,message:'Some error occured while signing up new user'},{status:500})
    }
}