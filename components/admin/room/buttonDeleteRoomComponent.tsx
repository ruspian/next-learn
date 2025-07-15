import { DeleteRoom } from "@/lib/actions";
import { IoTrashOutline } from "react-icons/io5";

// fungsi untuk delete room
export const ButtonDeleteRoomComponent = ({
  id,
  image,
}: {
  id: string;
  image: string;
}) => {
  const deleteRoomWithId = DeleteRoom.bind(null, id, image);

  return (
    <form action={deleteRoomWithId}>
      <button
        type="submit"
        className="rounded-sm p-1 hover:bg-gray-200 cursor-pointer hover:text-red-500 transition duration-300 ease-in-out"
      >
        <IoTrashOutline className="size-5" />
      </button>
    </form>
  );
};
