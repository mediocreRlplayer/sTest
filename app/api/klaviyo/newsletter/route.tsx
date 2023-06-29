const privateKey = process.env.NEXT_PUBLIC_KLAVIYO_PRIVATE_KEY as string;
const publicKey = process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY as string;

// creating a new profile and subscribing it to the email list
export async function POST(req: Request) {
  const res = await req.json();
  try {
    const createProfileResponse = await fetch(
      "https://a.klaviyo.com/api/profiles/",
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${privateKey}`,
          accept: "application/json",
          "Content-Type": "application/json",
          revision: "2023-02-22",
        },
        body: JSON.stringify(res),
      }
    );

    const profile = await createProfileResponse.json();

    const subscribeResponse = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${privateKey}`,
          accept: "application/json",
          "Content-Type": "application/json",
          revision: "2023-02-22",
        },
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              list_id: "UEgrmq",
              custom_source: "Newsletter",
              subscriptions: [
                {
                  channels: { email: ["MARKETING"] },
                  email: profile.data.attributes.email,
                  profile_id: profile.data.id,
                },
              ],
            },
          },
        }),
      }
    );

    return new Response(JSON.stringify(subscribeResponse), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
}

// updating an existing profile and subscribing it to the email list
export async function PATCH(req: Request) {
  const res = await req.json();

  try {
    const updateProfileResponse = await fetch(
      `https://a.klaviyo.com/api/profiles/${res.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Klaviyo-API-Key ${privateKey}`,
          accept: "application/json",
          "Content-Type": "application/json",
          revision: "2023-02-22",
        },
        body: JSON.stringify(res.data),
      }
    );

    const updatedProfile = await updateProfileResponse.json();

    const subscribeResponse = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${privateKey}`,
          accept: "application/json",
          "Content-Type": "application/json",
          revision: "2023-02-22",
        },
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              list_id: "UEgrmq",
              custom_source: "Newsletter",
              subscriptions: [
                {
                  channels: { email: ["MARKETING"] },
                  email: updatedProfile.data.attributes.email,
                  profile_id: updatedProfile.data.id,
                },
              ],
            },
          },
        }),
      }
    );

    return new Response(JSON.stringify(subscribeResponse), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
}
