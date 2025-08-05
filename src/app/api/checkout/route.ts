import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-07-30.basil",
  });

  const { priceId } = await request.json();

  console.log("Creating Stripe session for priceId:", priceId);

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      payment_method_types: ["card"],
      return_url: `${request.headers.get(
        "origin"
      )}/payment-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create checkout session" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
