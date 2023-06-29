import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    googleSignIn: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      default: "",
    },
    metamaskAddress: {
      type: String,
      default: "",
    },
    crossmintAddress: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
