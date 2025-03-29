import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("Blog", BlogSchema);
