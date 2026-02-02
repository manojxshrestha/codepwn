// Black subscription page disabled - billing functionality removed
// Original file: packages/console/app/src/routes/black/subscribe/[plan].tsx
//
// This route previously handled OpenCode Black subscription signup.
// All subscription functionality has been disabled.

import { Title } from "@solidjs/meta"

export default function BlackSubscribeDisabled() {
  return (
    <>
      <Title>Subscription Disabled</Title>
      <section data-slot="subscribe-form">
        <div data-slot="form-card">
          <div data-slot="plan-header">
            <p data-slot="title">Subscriptions Disabled</p>
            <p data-slot="price">
              <span data-slot="period">Subscription functionality has been removed from this console.</span>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
