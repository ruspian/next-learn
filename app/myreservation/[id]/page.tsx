import React, { Suspense } from "react";
import { Metadata } from "next";
import ReservationDetailComponent from "@/components/reservationDetailComponent";

export const metadata: Metadata = {
  title: "Reservation Detail",
  description: "your reservation detail",
};

const MyReservationDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const param = (await params).id;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-screen-lg mx-auto mt-10 py-20 px-4">
        {/* reservation detail */}
        <Suspense fallback={<p>Loading...</p>}>
          <ReservationDetailComponent reservationId={param} />
        </Suspense>
      </div>
    </div>
  );
};

export default MyReservationDetailPage;
