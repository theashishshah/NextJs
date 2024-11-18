import mongoose from "mongoose";

export async function connect () {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection
        // console.log(connection)

        connection.on('connected', ()=>{
            console.log(`DB got connected successfully at ${process.env.DOMAIN}`);
        })

        connection.on('error', (error) =>{
            console.log(`Got internal server error while connecting to db, ${error}`)
            process.exit(1)
        })
    } catch (error) {
        console.log(`Something went wrong! unable to connect db`)
        console.log(error)
    }
}