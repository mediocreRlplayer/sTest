const privateKey = process.env.NEXT_PUBLIC_KLAVIYO_PRIVATE_KEY as string;
const publicKey = process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY as string;

// getting the profile by email
export async function POST(req: Request) {
  const res = await req.json();

  try {
    const response = await fetch(
      `https://a.klaviyo.com/api/profiles/?filter=equals(email,"${res.email}")`,
      {
        method: "GET",
        headers: {
          Authorization: `Klaviyo-API-Key ${privateKey}`,
          accept: "application/json",
          "Content-Type": "application/json",
          revision: "2023-02-22",
        },
      }
    );

    const profile = await response.json();

    return new Response(JSON.stringify(profile), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
}
