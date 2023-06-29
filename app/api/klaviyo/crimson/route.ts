const privateKey = process.env.NEXT_PUBLIC_KLAVIYO_PRIVATE_KEY as string;
const publicKey = process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY as string;

// creating a new profile and subscribing it to the email list and sms if opted in
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
        body: JSON.stringify(
          res.sms
            ? { data: res.data }
            : {
                data: {
                  // if sms is not opted in, we don't send the phone number
                  type: res.data.type,
                  attributes: {
                    email: res.data.attributes.email,
                    properties: {
                      is_crimson: res.data.attributes.properties.is_crimson,
                      crossmintWalletAddress:
                        res.data.attributes.properties.crossmintWalletAddress,
                      signupDate: res.data.attributes.properties.signupDate,
                    },
                  },
                },
              }
        ),
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
              list_id: "XvVpVP",
              custom_source: "Checkout: Crimson",
              subscriptions: res.sms
                ? [
                    {
                      channels: { email: ["MARKETING"], sms: ["MARKETING"] },
                      email: profile.data.attributes.email,
                      phone_number: profile.data.attributes.phone_number,
                      profile_id: profile.data.id,
                    },
                  ]
                : [
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

// updating an existing profile and subscribing it to the email list and sms if opted in
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
        body: JSON.stringify(
          res.sms
            ? res.data
            : {
                data: {
                  // if sms is not opted in, we don't send the phone number
                  type: res.data.data.type,
                  id: res.data.data.id,
                  attributes: {
                    email: res.data.data.attributes.email,
                    properties: {
                      is_crimson:
                        res.data.data.attributes.properties.is_crimson,
                      crossmintWalletAddress:
                        res.data.data.attributes.properties
                          .crossmintWalletAddress,
                      signupDate:
                        res.data.data.attributes.properties.signupDate,
                    },
                  },
                },
              }
        ),
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
              list_id: "XvVpVP",
              custom_source: "Checkout: Crimson",
              subscriptions: res.sms
                ? [
                    {
                      channels: { email: ["MARKETING"], sms: ["MARKETING"] },
                      email: updatedProfile.data.attributes.email,
                      phone_number: updatedProfile.data.attributes.phone_number,
                      profile_id: updatedProfile.data.id,
                    },
                  ]
                : [
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
