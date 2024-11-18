import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String, 
            required: true,
            unique: true
        },
        password: {
            type: String, 
            required: true,
            unique: true,
        }
    },
    {timestamps: true})

const User = mongoose.models.users || mongoose.model("User", userSchema)

export { User}