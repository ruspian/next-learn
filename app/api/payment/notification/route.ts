import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaymentProps } from "@/types/payment";
import crypto from "crypto";

export const POST = async (req: Request) => {
  const data: PaymentProps = await req.json();

  const reservationId = data.order_id;

  let responseData = null;

  const transactionStatus = data.transaction_status;
  const paymentType = data.payment_type || null;
  const fraudStatus = data.fraud_status;
  const signatureKey = data.signature_key;
  const statusCode = data.status_code;
  const grossAmount = data.gross_amount;

  const hash = crypto
    .createHash("sha512")
    .update(
      `${reservationId}${transactionStatus}${statusCode}${grossAmount}${process.env.MIDTRANS_SERVER_KEY}`
    )
    .digest("hex");

  if (signatureKey !== hash) {
    return NextResponse.json(
      { error: "Invalid signature key" },
      { status: 400 }
    );
  }

  if (transactionStatus == "capture") {
    if (fraudStatus == "accept") {
      const transaction = await prisma.payment.update({
        data: {
          method: paymentType,
          status: "paid",
        },
        where: { reservationId },
      });
      responseData = transaction;
    }
  } else if (transactionStatus == "settlement") {
    const transaction = await prisma.payment.update({
      data: {
        method: paymentType,
        status: "paid",
      },
      where: { reservationId },
    });
    responseData = transaction;
  } else if (
    transactionStatus == "cancel" ||
    transactionStatus == "deny" ||
    transactionStatus == "expire"
  ) {
    const transaction = await prisma.payment.update({
      data: {
        method: paymentType,
        status: "failed",
      },
      where: { reservationId },
    });
    responseData = transaction;
  } else if (transactionStatus == "pending") {
    const transaction = await prisma.payment.update({
      data: {
        method: paymentType,
        status: "pending",
      },
      where: { reservationId },
    });
    responseData = transaction;
  }

  return NextResponse.json({ responseData }, { status: 200 });
};
