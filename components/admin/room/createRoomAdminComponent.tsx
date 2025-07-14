import React from "react";
import CreateFormAdminComponent from "@/components/admin/room/createFormAdminComponent";
import { getAmenities } from "@/lib/data";

const CreateRoomAdminComponent = async () => {
  const amenitiesData = await getAmenities();

  // cek apakah data fasilitas ada
  if (!amenitiesData) return null;

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Create New Room</h1>
      <CreateFormAdminComponent amenitiesData={amenitiesData} />
    </div>
  );
};

export default CreateRoomAdminComponent;
