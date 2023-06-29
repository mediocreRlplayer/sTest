import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/utils/mongodb/dbConnect";
import User from "@/utils/mongodb/models/User";

export const POST = async (req: Request) => {
  const { email, password } = await req.json();

  await connect();

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    email: email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("User created", { status: 201 });
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
};
