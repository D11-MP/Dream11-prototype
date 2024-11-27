import mongoose from "mongoose";

type ConnectionObject = {
    isConnected? : number 
}

const connection : ConnectionObject = {
}

async function dbConnect():Promise<void> {
    if(connection.isConnected){
        console.log('Already conncted to database');
    }
    try {
        const db = await mongoose.connect(process.env.DB || '',{});
        connection.isConnected = db.connections[0].readyState;
        console.log('DB connected successfully');
    } catch (error) {
        console.log(`Database connected failed\n${error}`);
        process.exit();
    }
}

export default dbConnect
