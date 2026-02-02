// Stripe webhook disabled - billing functionality removed
// Original file: packages/console/app/src/routes/stripe/webhook.ts
//
// This route previously handled Stripe webhooks for:
// - customer.updated
// - checkout.session.completed (payments and subscriptions)
// - customer.subscription events
// - invoice.payment_succeeded/failed
// - charge.refunded
//
// All webhook handling has been disabled.

import type { APIEvent } from "@solidjs/start/server"

export async function POST(_input: APIEvent) {
  // Billing webhooks disabled
  return Response.json({ message: "Billing webhooks disabled" }, { status: 200 })
}
