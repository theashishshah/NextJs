import mongoose from "mongoose";

export const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        console.log(connection)

        connection.on('connected', ()=>{
            console.log(`Mongodb is connected at ${process.env.DOMAIN}`)
        })

        connection.on('error', (err) => {
            console.log("got some error", err)
            process.exit(1);
        })
    } catch (error) {
        console.log("Something went wrong!")
        console.log(error)
    }
}