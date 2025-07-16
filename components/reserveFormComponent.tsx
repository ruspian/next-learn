"use client";

import { addDays } from "date-fns";
import { useState, useActionState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateReserveRoom } from "@/lib/actions";
import { RoomDetailProps } from "@/types/room";
import clsx from "clsx";

const ReserveFormComponent = ({ room }: { room: RoomDetailProps }) => {
  const StartDate = new Date();
  const EndDate = addDays(StartDate, 1); // 1 hari selanjutnya => startDate = senin maka endDate = selasa

  const [startDate, setStartDate] = useState(StartDate);
  const [endDate, setEndDate] = useState(EndDate);

  // fungsi handle date change
  const handleDateChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // kelola state yang ada di server melalui useActionState
  const [state, formAction, isLoading] = useActionState(
    CreateReserveRoom.bind(null, room.id, room.price, startDate, endDate),
    null
  );

  return (
    <div>
      <form action={formAction}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Arrival - Departure
          </label>
          <DatePicker
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            onChange={handleDateChange}
            selectsRange={true}
            dateFormat={"dd-MM-YYYY"}
            wrapperClassName="w-full"
            className="py-2 px-4 rounded-md border border-gray-300 w-full"
          />
          <div className="" aria-live="polite" aria-atomic="true">
            <p className="text-sm text-red-500 mt-2">{state?.messageDate}</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
            placeholder="Full Name"
          />

          <div className="" aria-live="polite" aria-atomic="true">
            <p className="text-sm text-red-500 mt-2">{state?.error?.name}</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
            placeholder="Phone Number"
          />

          <div className="" aria-live="polite" aria-atomic="true">
            <p className="text-sm text-red-500 mt-2">{state?.error?.phone}</p>
          </div>
        </div>
        <button
          type="submit"
          className={clsx(
            "px-10 py-3 text-center text-white w-full bg-orange-400 hover:bg-orange-500 rounded-sm cursor-pointer transition duration-300 ease-in-out",
            {
              "opacity-50 cursor-progress": isLoading,
            }
          )}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Reserve"}
        </button>
      </form>
    </div>
  );
};

export default ReserveFormComponent;
