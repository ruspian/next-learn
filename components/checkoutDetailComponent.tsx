import Image from "next/image";
import { getReservationById } from "@/lib/data";
import { notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";

const CheckoutDetailComponent = async ({
  reservationId,
}: {
  reservationId: string;
}) => {
  const reservationData = await getReservationById(reservationId);
  if (!reservationData) return notFound();

  // hitung jumlah hari menginap
  const duration = differenceInCalendarDays(
    reservationData.endDate,
    reservationData.startDate
  );
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="order-2">
        <div className="flex flex-col mb-3 items-start bg-white border border-gray-200 rounded-sm md:flex-row md:w-full">
          <div className="aspect-video relative">
            <Image
              src={reservationData.Room.image}
              alt={reservationData.Room.name}
              width={500}
              height={300}
              className="object-cover rounded-t-sm aspect-video w-full md:rounded-none md:rounded-s-sm"
            />
          </div>

          <div className="flex flex-col justify-between p-4 leading-normal w-full">
            <h5 className="mb-1 text-4xl font-bold tracking-tight text-gray-900">
              {reservationData.Room.name}
            </h5>
            <div className="flex items-center gap-1 text-2xl text-gray-700">
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl">
                  {formatCurrency(reservationData.price)}
                </span>
                <span className="text-sm">/night</span>
              </div>
            </div>
          </div>
        </div>

        {/* button payment */}
      </div>
      <div className="border border-gray-200 px-3 py-5 bg-white rounded-sm">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="py-2 ">Resevation ID</td>
              <td className="py-2 text-right truncate">
                #{reservationData.id}
              </td>
            </tr>
            <tr>
              <td className="py-2 ">Name</td>
              <td className="py-2 text-right truncate">
                {reservationData.User.name}
              </td>
            </tr>
            <tr>
              <td className="py-2 ">Email</td>
              <td className="py-2 text-right truncate">
                {reservationData.User.email}
              </td>
            </tr>
            <tr>
              <td className="py-2 ">Phone Number</td>
              <td className="py-2 text-right truncate">
                {reservationData.User.phone}
              </td>
            </tr>
            <tr>
              <td className="py-2 ">Arrival</td>
              <td className="py-2 text-right truncate">
                {formatDate(reservationData.startDate.toISOString())}
              </td>
            </tr>
            <tr>
              <td className="py-2 ">Departure</td>
              <td className="py-2 text-right truncate">
                {formatDate(reservationData.endDate.toISOString())}
              </td>
            </tr>
            <tr>
              <td className="py-2 ">Duration</td>
              <td className="py-2 text-right truncate">
                {duration} {duration <= 1 ? "night" : "nights"}
              </td>
            </tr>
            <tr>
              <td className="py-2 ">Amount in Rupiah</td>
              <td className="py-2 text-right truncate">
                <span className="">
                  {formatCurrency(reservationData.price * duration)}
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-2 ">Status</td>
              <td className="py-2 text-right truncate">
                {reservationData?.Payment?.status}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckoutDetailComponent;
