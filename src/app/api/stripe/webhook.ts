import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import db from '@/lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    const event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const userEmail = session.customer_email;

      console.log("✅ Stripe payment confirmed:", userEmail);

      await db.query('UPDATE users SET has_paid = ? WHERE email = ?', ['yes', userEmail]);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
