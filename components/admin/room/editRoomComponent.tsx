import React from "react";
import { getAmenities, getRoomById } from "@/lib/data";
import EditFormAdminComponent from "@/components/admin/room/editFormAdminComponent";
import { notFound } from "next/navigation";

const EditRoomAdminComponent = async ({ roomId }: { roomId: string }) => {
  // karna ada 2 data fetching gunakan pararell data fetching
  const [amenitiesData, editRoomData] = await Promise.all([
    getAmenities(),
    getRoomById(roomId),
  ]);

  // cek apakah data fasilitas ada
  if (!amenitiesData || !editRoomData) return notFound();

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit a Room</h1>
      <EditFormAdminComponent
        amenitiesData={amenitiesData}
        editRoomData={editRoomData}
      />
    </div>
  );
};

export default EditRoomAdminComponent;
