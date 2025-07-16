import React from "react";
import CardSkeletonComponent from "./cardSkeletonComponent";

const RoomSkeletonComponent = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-6 px-4 pb-20">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        <CardSkeletonComponent />
      </div>
    </div>
  );
};

export default RoomSkeletonComponent;
