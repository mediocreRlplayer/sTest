const privateKey = process.env.NEXT_PUBLIC_KLAVIYO_PRIVATE_KEY ;

const checkEmail = async (data) => {
  try {
    const response = await fetch(
      `https://a.klaviyo.com/api/profiles/?filter=equals(external_id,"${data}")`,
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
    if (profile.data.length > 0) {
      existingId = profile.data[0].id;
    }
    else {
      existingId = null;
    }
  } catch (error) {
    console.log(error);
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Extract the payload or data from the request
    const data = req.body;
    console.log(data.walletAddress);
    res.status(200).json({ message: 'Webhook received successfully' });

  }
}