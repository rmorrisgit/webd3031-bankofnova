import { NextResponse } from 'next/server';
import db from '@/lib/db';
import stripe from '@/lib/stripe';
import type Stripe from 'stripe';

export const dynamic = 'force-dynamic'; // prevent static optimization
export const runtime = 'nodejs'; // required for raw body parsing to be allowed

export async function POST(req: Request) {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const sig = req.headers.get('stripe-signature')!;

  try {
    // Read body as stream and reconstruct buffer manually
    const chunks: Uint8Array[] = [];
    const reader = req.body!.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }

    const rawBody = Buffer.concat(chunks);

    const event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_email;

      console.log('✅ Payment successful for:', email);

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
