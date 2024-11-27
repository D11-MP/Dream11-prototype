import mongoose , {Schema , Document, mongo} from "mongoose";

export interface User extends Document{
    name:string,
    email:string,
    password:string,
    createdAt:Date,
    verifyCode:string,
    verifyCodeExpiry:Date
}

const UserSchema:Schema<User> = new Schema({
    name:{type:String , required:[true,'Name is required']},
    email:{type:String , required:[true,'Email is required'] , unique:true},
    password:{type:String , required:true},
    createdAt:{type:Date , required:true, default:Date.now},
    verifyCode:{type:String , required:true},
    verifyCodeExpiry:{type:Date , required:true}
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)
export default UserModel