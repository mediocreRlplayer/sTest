import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("Connected to MongoDB");
  } catch (err: any) {
    throw new Error("MongoDB connection error: ", err);
  }
};

export default connect;
