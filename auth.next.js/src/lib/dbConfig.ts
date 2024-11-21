import mongoose from "mongoose";

export async function connect() {
  const dbUri = process.env.MONGODB_URI;

  if (!dbUri) {
    console.error(
      "Error: MONGODB_URI is not defined in your environment variables"
    );
    process.exit(1); // Exit if the environment variable is missing
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(dbUri);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log(
        `MongoDB connected successfully at ${process.env.MONGODB_URI}`
      );
    });

    connection.on("error", (error: any) => {
      console.error(`MongoDB connection error: ${error}`);
      // Instead of exiting the app, consider implementing a retry strategy or just logging
      // process.exit(1); // This can be used if you want to terminate the process on DB connection failure
    });

    connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });
  } catch (error) {
    console.error("Unable to connect to MongoDB", error);
    process.exit(1); // You can exit the app if the DB connection fails
  }
}
