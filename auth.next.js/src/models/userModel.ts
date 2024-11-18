import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [
        true,
        "Yo, we need your email to create an account. Don't leave us hanging!",
      ],
      unique: true,
      match: [
        /^[a-zA-Z0-9._-]+@(gmail\.com|outlook\.com|apple\.com|google\.com)$/,
        "Bruh, that doesn't look like a valid email! Try again.",
      ],
    },

    username: {
      type: String,
      required: [
        true,
        "Don't leave us hanging without a username. We need your fobb-worthy handle!",
      ],
      unique: true,
      min: [3, "your username gotta be at least 3 characters. Make it snappy!"],
      max: [20, "ugh, why do you want to create username that longgggggg?"],
    },

    fullName: {
      type: String,
      required: [
        true,
        "You gotta tell us your name. How else are we gonna know how to call you?",
      ],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "We need a strong password, fam. You got this!"],
      min: 8,
    },
    isVerified: {
        type: Boolean,
        default: false
    }, 
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },

  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User};
