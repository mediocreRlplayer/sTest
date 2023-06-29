// pages/api/webhook.js

import { error } from "console";
let newSignUpId;
let existingId;

const privateKey = process.env.NEXT_PUBLIC_KLAVIYO_PRIVATE_KEY ;

const checkEmail = async (email_receipt) => {
  try {
    const response = await fetch(
      `https://a.klaviyo.com/api/profiles/?filter=equals(email,"${email_receipt}")`,
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

const pushToKlaviyoSuccessNoProfile = async (email_receipt) => {
  try {
    const response = await fetch("https://a.klaviyo.com/api/profiles/", {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${privateKey}`,
        accept: "application/json",
        "Content-Type": "application/json",
        revision: "2023-02-22",
      },
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: {
            email: email_receipt
          }
        }
      })
    });
    const data = await response.json();
    newSignUpId = data.data.id;
    const response2 = await fetch(`https://a.klaviyo.com/api/lists/WYCfD2/relationships/profiles/`, {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${privateKey}`,
        accept: "application/json",
        "Content-Type": "application/json",
        revision: "2023-02-22",
      },
      body: JSON.stringify({data: [{type: 'profile', id: newSignUpId}]}),
    });

  } catch (error) {
    console.log(error);
  }
}
const pushToKlaviyoFailureNoProfile = async (email_receipt) => {

  try {
    const response = await fetch("https://a.klaviyo.com/api/profiles/", {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${privateKey}`,
        accept: "application/json",
        "Content-Type": "application/json",
        revision: "2023-02-22",
      },
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: {
            email: email_receipt
          }
        }
      })
    });
    const data = await response.json();
    newSignUpId = data.data.id;
    const response2 = await fetch(`https://a.klaviyo.com/api/lists/XsY3Bd/relationships/profiles/`, {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${privateKey}`,
        accept: "application/json",
        "Content-Type": "application/json",
        revision: "2023-02-22",
      },
      body: JSON.stringify({data: [{type: 'profile', id: newSignUpId}]}),
    });
  } catch (error) {
    console.log(error);
  }
}
const pushToKlaviyoSuccessProfile = async () => {
  try {
    const response2 = await fetch(`https://a.klaviyo.com/api/lists/WYCfD2/relationships/profiles/`, {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${privateKey}`,
        accept: "application/json",
        "Content-Type": "application/json",
        revision: "2023-02-22",
      },
      body: JSON.stringify({data: [{type: 'profile', id: existingId}]}),
    });
  } catch (error) {
    console.log(error);
  }
}
const pushToKlaviyoFailureProfile = async () => {
  try {
    const response2 = await fetch(`https://a.klaviyo.com/api/lists/XsY3Bd/relationships/profiles/`, {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${privateKey}`,
        accept: "application/json",
        "Content-Type": "application/json",
        revision: "2023-02-22",
      },
      body: JSON.stringify({data: [{type: 'profile', id: existingId}]}),
    });
  
  } catch (error) {
    console.log(error);
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Extract the payload or data from the request
    const data = req.body;
    switch (data.type) {
      case 'payment_intent.succeeded':
      // Process the webhook payload
      await checkEmail(data.data.object.receipt_email);
      (existingId !== null) ? pushToKlaviyoSuccessProfile() : pushToKlaviyoSuccessNoProfile(data.data.object.receipt_email);  
      break; 
      case 'payment_intent.payment_failed':
        await checkEmail(data.data.object.receipt_email);
        (existingId == null) ? pushToKlaviyoFailureNoProfile(data.data.object.receipt_email) : pushToKlaviyoFailureProfile();
        break;
      case 'customer.created':        
        break;
      case 'charge.succeeded':
        break;
      case 'charge.failed':
      case 'checkout.session.async_payment_failed':
        await checkEmail(data.data.object.receipt_email);
        (existingId !== null) ? pushToKlaviyoFailureProfile() : pushToKlaviyoFailureNoProfile(data.data.object.receipt_email);  
        break;
      case 'checkout.session.expired':
        await checkEmail(data.data.object.receipt_email);
        (existingId !== null) ? pushToKlaviyoFailureProfile() : pushToKlaviyoFailureNoProfile(data.data.object.receipt_email);
        break;
      case 'payment_intent.created':
        break;
      case 'charge.succeeded':
        await checkEmail(data.data.object.receipt_email);
        (existingId !== null) ? pushToKlaviyoSuccessProfile() : pushToKlaviyoSuccessNoProfile(data.data.object.receipt_email);  
        break;
      case 'checkout.session.completed':
      // Process the webhook payload
      // Perform your desired actions or business logic here
        break;
      default:
      // Unexpected event type
      error(`Unhandled event type ${data.type}.`);
      break;
    }
    

    // Return a response
    res.status(200).json({ message: 'Webhook received successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}