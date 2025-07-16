import React from "react";
import { LuChartArea, LuShoppingCart, LuUsers } from "react-icons/lu";
import { getTotalCustemer, getTotalRevenueAndReservation } from "@/lib/data";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

const DashboardCardComponent = async () => {
  const [revenueAndReservation, custemer] = await Promise.all([
    getTotalRevenueAndReservation(),
    getTotalCustemer(),
  ]);

  if (!revenueAndReservation || !custemer) return notFound();
  return (
    <div className="grid md:grid-cols-3 gap-5 pb-10">
      <div className="flex items-center bg-white border rounded-md overflow-hidden shadow-sm">
        <div className="p-4 bg-emerald-400">
          <LuChartArea className="size-12 text-white" />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Revenue</h3>
          <p className="text-3xl ">
            {formatCurrency(revenueAndReservation.revenue)}
          </p>
        </div>
      </div>

      <div className="flex items-center bg-white border rounded-md overflow-hidden shadow-sm">
        <div className="p-4 bg-red-400">
          <LuShoppingCart className="size-12 text-white" />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Reservation</h3>
          <p className="text-3xl ">{revenueAndReservation.reservation}</p>
        </div>
      </div>

      <div className="flex items-center bg-white border rounded-md overflow-hidden shadow-sm">
        <div className="p-4 bg-amber-400">
          <LuUsers className="size-12 text-white" />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Customer</h3>
          <p className="text-3xl ">{custemer.length}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCardComponent;
