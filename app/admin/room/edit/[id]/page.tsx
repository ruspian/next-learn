import EditRoomAdminComponent from "@/components/admin/room/editRoomComponent";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const EditRoomPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const roomId = (await params).id;
  if (!roomId) return notFound();

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 mt-10">
      <Suspense fallback={<p>Loading...</p>}>
        <EditRoomAdminComponent roomId={roomId} />
      </Suspense>
    </div>
  );
};

export default EditRoomPage;
