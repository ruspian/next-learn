import DashboardCardComponent from "@/components/admin/dashboardCardComponent";
import React, { Suspense } from "react";
import { Metadata } from "next";
import ReservationListComponent from "@/components/admin/reservationListComponent";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard",
};

const AdminDashboardPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>

      <Suspense fallback={<p>Loading...</p>}>
        <DashboardCardComponent />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <ReservationListComponent />
      </Suspense>
    </div>
  );
};

export default AdminDashboardPage;
