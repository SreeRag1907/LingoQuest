import Stripe from 'stripe';

/**
 * Initialize Stripe with the API key and configuration.
 */
export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: '2024-06-20',
    typescript: true,
});