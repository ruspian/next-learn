import { DeleteRoom } from "@/lib/actions";
import Link from "next/link";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineEditNote } from "react-icons/md";

// komponent untuk delete room
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

// komponent untuk edit room
export const ButtonEditRoomComponent = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/admin/room/edit/${id}`}
      className="rounded-sm p-1 hover:bg-gray-200 cursor-pointer hover:text-emerald-700 transition duration-300 ease-in-out"
    >
      <MdOutlineEditNote className="size-6" />
    </Link>
  );
};
