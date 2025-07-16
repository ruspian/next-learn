import CardComponent from "@/components/cardComponent";
import { getRooms } from "@/lib/data";
import { notFound } from "next/navigation";

const MainComponent = async () => {
  const rooms = await getRooms();
  if (!rooms) return notFound();

  return (
    <div className="max-w-screen-xl mx-auto py-6 pb-20 px-4">
      <div className="grid gap-7 md:grid-cols-3">
        {rooms.map((room) => (
          <CardComponent room={room} key={room.id} />
        ))}
      </div>
    </div>
  );
};

export default MainComponent;
