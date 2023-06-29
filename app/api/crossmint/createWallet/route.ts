import { NextResponse } from "next/server";

const crossmintClientSecret = process.env
  .NEXT_PUBLIC_CROSSMINT_API_KEY as string;
const crossmintProjectId = process.env
  .NEXT_PUBLIC_CROSSMINT_PROJECT_ID as string;

export async function POST(req: Request) {
  const res = await req.json();

  try {
    const response = await fetch(
      "https://staging.crossmint.com/api/v1-alpha1/wallets",
      {
        method: "POST",
        headers: {
          "X-PROJECT-ID": crossmintProjectId,
          "X-CLIENT-SECRET": crossmintClientSecret,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: res.email,
          chain: res.chain,
        }),
      }
    );

    const wallet = await response.json();

    return new NextResponse(JSON.stringify(wallet), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}
