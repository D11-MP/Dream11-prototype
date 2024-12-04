"use server"

import UserModel from "../../models/user";
import dbConnect from "../dbConnect";
import bcrypt from 'bcryptjs'

export async function signup(request:any) {
    try {
        // const data = await request.json();
        const data = await request;
        const { password , name , email} = data;
        await dbConnect();
        const userFound = await UserModel.findOne({email});
        if(userFound) 
            return {message:'User already exist with same email',status:400}
            // return Response.json({message:'User already exist with same email'},{status:400});
        const hashedPassword = await bcrypt.hash(password, 10);
        const userCreated = new UserModel({email:email , name:name , password:hashedPassword , createdAt:Date.now() });
        await userCreated.save();
        return {message:'User created successfully',status:201}
        // return Response.json({message:'User created successfully'},{status:201})
    }catch(error){
        console.log(error);
        return {message:'Some error occured while signing up new user',status:500}
        // return Response.json({error:error,message:'Some error occured while signing up new user'},{status:500})
    }
}