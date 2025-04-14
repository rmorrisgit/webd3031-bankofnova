import { NextResponse } from 'next/server';
import db from '@/lib/db';
import stripe from '@/lib/stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const rawBody = await req.text(); // get raw body
  const sig = req.headers.get('stripe-signature')!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    const event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const email = session.customer_email;

      console.log('✅ Payment successful for:', email);

      // ✅ Update has_paid = 'yes' for that email
      await db.query(
        'UPDATE users SET has_paid = ? WHERE LOWER(email) = LOWER(?)',
        ['yes', email]
      );
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('❌ Webhook error:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
}