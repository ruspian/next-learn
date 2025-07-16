import Image from "next/image";
import React from "react";
import { getRoomDetailById, getDisabledRoomById } from "@/lib/data";
import { notFound } from "next/navigation";
import { IoCheckmark, IoPeopleOutline } from "react-icons/io5";
import { formatCurrency } from "@/lib/utils";
import ReserveFormComponent from "@/components/reserveFormComponent";

const RoomDetailComponent = async ({ roomId }: { roomId: string }) => {
  const [roomDetail, disabledRoom] = await Promise.all([
    getRoomDetailById(roomId),
    getDisabledRoomById(roomId),
  ]);
  if (!roomDetail || !disabledRoom) return notFound();

  return (
    <div className="max-w-screen-xl mx-auto py-16 px-4 grid lg:grid-cols-12 gap-8">
      <div className="md:col-span-8">
        <Image
          src={roomDetail.image}
          alt={roomDetail.name}
          width={600}
          height={250}
          priority
          className="w-full rounded-sm mb-8"
        />
        <h1 className="text-4xl font-semibold text-gray-800 mb-8">
          {roomDetail.name}
        </h1>
        <p className="text-justify">{roomDetail.description}</p>
        <h5 className="text-lg font-semibold text-gray-800 mt-1 py-1">
          Amenities :
        </h5>
        <div className="grid md:grid-cols-3">
          {roomDetail.RoomAmenities.map((amenity) => (
            <div className="flex gap-1 py-1" key={amenity.id}>
              <IoCheckmark className="size-5" />
              <span className="">{amenity.Amenities.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="md:col-span-4">
        <div className="border-2 border-gray-300 border-dashed rounded-sm px-3 py-5 bg-slate-50">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <IoPeopleOutline className="size-4" />
              <span>
                {roomDetail.capacity}{" "}
                {roomDetail.capacity === 1 ? "person" : "people"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-semibold text-gray-600">
                {formatCurrency(roomDetail.price)}
              </span>
              <span className="text-sm text-gray-400">/night</span>
            </div>
          </div>
          {/* reservasi form */}
          <ReserveFormComponent room={roomDetail} disabledDate={disabledRoom} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetailComponent;
