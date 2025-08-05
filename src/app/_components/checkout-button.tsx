'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DialogContent } from '@radix-ui/react-dialog';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCallback } from 'react';

type Props = {
    priceId: string;
    children?: React.ReactNode;
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutButton = ({ priceId, children }: Props) => {
    const fetchClientSecret = useCallback(async() => {
        return await fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ priceId }),
        })
            .then((res) => res.json())
            .then((data) => data.client_secret);
    }, [priceId]);

    const options = { fetchClientSecret };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    {children || 'Assinar'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Checkout</DialogTitle>
                <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            </DialogContent>
        </Dialog>
    );
}
 
export default CheckoutButton;