import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin", "user"], 
      default: "user",
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs", 
      },
    ],
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("User", UserSchema);
