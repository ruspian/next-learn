import CheckoutDetailComponent from "@/components/checkoutDetailComponent";
import React, { Suspense } from "react";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Reservation Summary",
  description: "Reservation Summary",
};

const CheckoutPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const reservationId = (await params).id;
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-20 mt-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Reservation Summary
      </h1>
      <Suspense fallback={<p>Loading...</p>}>
        <CheckoutDetailComponent reservationId={reservationId} />
      </Suspense>

      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
    </div>
  );
};

export default CheckoutPage;
