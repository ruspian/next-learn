import Image from "next/image";
import { getReservationByUserId } from "@/lib/data";
import { notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import Link from "next/link";

const MyReserveListComponent = async () => {
  const reservations = await getReservationByUserId();
  if (!reservations) return notFound();

  return (
    <div>
      {reservations.map((item) => (
        <div
          className="bg-white shadow pb-4 mb-4 md:pb-0 relative"
          key={item.id}
        >
          <div className="flex items-center justify-between bg-gray-100 px-2 py-1 ronded-sm">
            <h1 className="text-sm font-medium text-gray-900 truncate">
              Reservation ID: #{item.id}
            </h1>
            <div className="flex gap-1 px-3 py-2 text-sm font-normal">
              <span className="">Status:</span>
              <span className="font-bold uppercase">
                {item.Payment?.status}
              </span>
            </div>
          </div>
          <div className="flex flex-col mb-4 items-start bg-white rounded-sm md:flex-row md:w-full">
            <Image
              src={item.Room?.image}
              width={500}
              height={300}
              alt="image room"
              className="object-cover w-full rounded-t-sm h-60 md:h-auto md:w-1/3 md:rounded-none md:rounded-s-sm"
            />
            <div className="flex items-center gap-1 mb-3 font-normal text-gray-300 w-full px-4 py-2">
              <div className="w-full ">
                <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                  <span className="">Price :</span>
                  <span className="">{formatCurrency(item.Room?.price)}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                  <span className="">Arrival :</span>
                  <span className="">
                    {formatDate(item.startDate.toISOString())}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                  <span className="">Departure :</span>
                  <span className="">
                    {formatDate(item.endDate.toISOString())}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                  <span className="">Duration :</span>
                  <span className="">
                    {differenceInCalendarDays(item.endDate, item.startDate)}{" "}
                    {differenceInCalendarDays(item.endDate, item.startDate) > 1
                      ? "nights"
                      : "night"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                  <span className="">Sub Total:</span>
                  <span className="">
                    {formatCurrency(
                      item.Room?.price *
                        differenceInCalendarDays(item.endDate, item.startDate)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end absolute inset-4 ">
            {item.Payment?.status === "unpaid" ? (
              <Link
                href={`/checkout/${item.id}`}
                className="px-6 py-2.5 bg-orange-400 text-white font-bold hover:bg-orange-500 rounded-sm "
              >
                Pay Now
              </Link>
            ) : (
              <Link
                href={`/myreservation/${item.id}`}
                className="px-5 py-2.5 bg-orange-400 text-white font-bold hover:bg-orange-500 rounded-sm "
              >
                View Detail
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyReserveListComponent;
