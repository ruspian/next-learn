import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoPeopleOutline } from "react-icons/io5";
import { Room } from "@/app/generated/prisma";
import { formatCurrency } from "@/lib/utils";

const CardComponent = ({ room }: { room: Room }) => {
  return (
    <div className="bg-white shadow-lg rounded-sm transition duration-300 ease-in-out hover:shadow-sm">
      {/* gambar */}
      <div className="h-[260px] w-auto rounded-t-sm relative">
        <Image
          src={room.image}
          alt="room image"
          width={384}
          height={256}
          className="w-full h-full object-cover rounded-t-sm"
        />
      </div>

      {/* detail */}
      <div className="p-8">
        <h4 className="text-2xl font-medium text-start">
          <Link
            href={`/room/${room.id}`}
            className="hover:text-gray-800 transition duration-150"
          >
            {room.name}
          </Link>
        </h4>
        <h4 className="text-2xl mb-7 text-start">
          <span className="font-semibold text-gray-600">
            {formatCurrency(room.price)}
          </span>
          <span className="text-sm text-gray-400">/night</span>
        </h4>

        {/* tombol dan kapasitas */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <IoPeopleOutline className="size-6" />
            <span>
              {room.capacity} {room.capacity === 1 ? "person" : "people"}
            </span>
          </div>

          <Link
            href={`/room/${room.id}`}
            className="px-6 py-2.5 md:px-10 md:py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-sm"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
