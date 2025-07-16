import RoomDetailComponent from "@/components/roomDetailComponent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Room Detail",
  description: "Room Detail",
};

const RoomDetailPage = async ({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) => {
  const roomId = (await params).roomId;

  return (
    <div className="mt-20 h-auto">
      <Suspense fallback={<p>Loading...</p>}>
        <RoomDetailComponent roomId={roomId} />
      </Suspense>
    </div>
  );
};

export default RoomDetailPage;
