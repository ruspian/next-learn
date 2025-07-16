"use client";

import { reservationProps } from "@/types/reservation";
import { useTransition } from "react";

declare global {
  interface Window {
    snap: {
      pay: (token: string) => void;
    };
  }
}
const PaymentButtonComponent = ({
  reservation,
}: {
  reservation: reservationProps;
}) => {
  const [isLoading, startTransition] = useTransition();

  // fungsi handle pembayaran
  const handlePayment = async () => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservation),
        });

        const { token } = await response.json();

        // jikan token ada
        if (token) {
          window.snap.pay(token.token);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <button
      onClick={handlePayment}
      className="px-10 py-4 text-center font-semibold text-white bg-orange-400 w-full hover:bg-orange-500 hover:transition hover:duration-300 ease-in-out rounded-sm cursor-pointer"
    >
      {isLoading ? "Please wait..." : "Pay Now"}
    </button>
  );
};

export default PaymentButtonComponent;
