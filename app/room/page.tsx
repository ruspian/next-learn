import HeaderSectionComponent from "@/components/headerSectionComponent";
import MainComponent from "@/components/mainComponent";
import RoomSkeletonComponent from "@/components/skeletons/roomSkeletonComponent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Room & Rates",
  description: "Choose your best room today!",
};

const RoomPage = () => {
  return (
    <div>
      <HeaderSectionComponent
        title="Room & Rates"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae."
      />

      <div className="mt-10 px-4">
        <Suspense fallback={<RoomSkeletonComponent />}>
          <MainComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default RoomPage;
