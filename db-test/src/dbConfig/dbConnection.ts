import mongoose from "mongoose";

export async function connect(){
   try {
        await mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection;
        console.log(connection);

        connection.on("connected", () =>{
            console.log("Mongodb is connected successfully");
        })

        connection.on("error", (error) =>{
            console.log("mongodb connection error", error)
        })
   } catch (error: any) {
    console.error("Unable to connect MongoDB", error);
    process.exit(1);
   }
};