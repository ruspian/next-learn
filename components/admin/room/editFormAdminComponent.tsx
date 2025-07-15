"use client";

import { useRef, useState, useTransition, useActionState } from "react";
import { IoImagesOutline, IoTrashOutline } from "react-icons/io5";
import { type PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import { BarLoader } from "react-spinners";
import { Amenities } from "@/app/generated/prisma";
import { UpdateRoom } from "@/lib/actions";
import clsx from "clsx";
import { RoomProps } from "@/types/room";

const EditFormAdminComponent = ({
  amenitiesData,
  editRoomData,
}: {
  amenitiesData: Amenities[];
  editRoomData: RoomProps;
}) => {
  const [image, setImage] = useState(editRoomData.image);
  const [message, setMessage] = useState("");
  const [loading, startTransition] = useTransition();

  // state untuk submit dan handle state dari useActionState
  const [state, formAction, isLoading] = useActionState(
    UpdateRoom.bind(null, image, editRoomData.id),
    null
  );

  // ambil ref untuk input file
  const inputFileRef = useRef<HTMLInputElement>(null);

  // fungsi untuk handle upload image
  const handleUploadImage = () => {
    // jika tidak ada file dalam input ref maka kembalikan null
    if (!inputFileRef.current?.files) return null;

    // ambil file dari input ref
    const file = inputFileRef.current.files[0];

    // buat form data
    const formData = new FormData();

    // set file ke form data
    formData.set("file", file);

    startTransition(async () => {
      // kirim form data ke api
      try {
        const response = await fetch("/api/upload", {
          method: "PUT",
          body: formData,
        });

        const data = await response.json();

        // jika gagal
        if (response.status !== 200) {
          setMessage(data.message);
        }

        // jika berhasil dan atur typenya menjadi PutBlobResult
        const img = data as PutBlobResult;
        setImage(img.url); // masukkan url gambar ke state
      } catch (error) {
        console.log(error);
      }
    });
  };

  // fungsi untukk handle delete image
  const handleDeleteImage = (image: string) => {
    startTransition(async () => {
      try {
        await fetch(`/api/upload/?imageUrl=${image}`, {
          method: "DELETE",
        });

        setImage("");
      } catch (error) {
        console.log(error);
      }
    });
  };

  // default value untuk amenities
  const checkAmenities = editRoomData.RoomAmenities.map(
    (amenity) => amenity.amenitiesId
  );

  return (
    <form action={formAction}>
      <div className="grid md:grid-cols-12 gap-5">
        <div className="col-span-8 bg-white p-4">
          {/* nama */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              className="py-2 px-4 rounded-sm border border-gray-200 w-full"
              placeholder="Room Name"
              defaultValue={editRoomData.name}
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-2">
                {state?.error?.name}
              </span>
            </div>
          </div>

          {/* deskripsi */}
          <div className="mb-4">
            <textarea
              name="description"
              className="py-2 px-4 rounded-sm border border-gray-200 w-full"
              rows={8}
              placeholder="Description"
              defaultValue={editRoomData.description}
            ></textarea>
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-2">
                {state?.error?.description}
              </span>
            </div>
          </div>

          {/* fasilitas */}
          <div className="mb-4 grid md:grid-cols-3">
            {amenitiesData.map((amenity) => (
              <div className="flex items-center mb-4" key={amenity.id}>
                <input
                  type="checkbox"
                  name="amenities"
                  className="w-4 h-4 text-shadow-emerald-600 bg-gray-100 border-gray-300 rounded"
                  placeholder="Room Name"
                  defaultValue={amenity.id}
                  defaultChecked={checkAmenities.includes(amenity.id)}
                />
                <label className="ms-2 text-sm font-medium texy-gray-900 capitalize">
                  {amenity.name}
                </label>
              </div>
            ))}

            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-2">
                {state?.error?.amenities}
              </span>
            </div>
          </div>
        </div>

        {/* file upload */}
        <div className="col-span-4 bg-white p-4">
          <label
            htmlFor="input-file"
            className="flex flex-col mb-4 items-center justify-center aspect-video border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 relative"
          >
            <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">
              <div className="flex flex-col items-center justify-center">
                {loading ? (
                  <div className="flex flex-col items-center justify-center">
                    <BarLoader />
                    <p className="mt-2 text-xs text-gray-500">Please Wait...</p>
                  </div>
                ) : (
                  <>
                    {image ? (
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(image)}
                        className="flex items-center justify-center bg-transparent size-6 rounded-sm absolute right-1 top-1 text-white hover:bg-red-500"
                      >
                        <IoTrashOutline className="size-4 text-transparent hover:text-white" />
                      </button>
                    ) : (
                      <>
                        <IoImagesOutline className="size-10" />
                        <p className="mb-1 text-sm font-bold">Select image</p>

                        {/* pesan error */}
                        {message ? (
                          <p className="text-xs text-red-500">{message}</p>
                        ) : (
                          <p className="text-xs">
                            SVG, PNG, JPG, GIF or Other (max size: 4MB)
                          </p>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            {!image ? (
              <input
                type="file"
                ref={inputFileRef}
                className="hidden"
                id="input-file"
                onChange={handleUploadImage}
              />
            ) : (
              <Image
                src={image}
                alt="image room"
                width={640}
                height={360}
                className="rounded-md absolute inset-0 w-full h-full aspect-video object-cover"
              />
            )}
          </label>

          {/* capacity */}
          <div className="mb-4">
            <input
              type="text"
              name="capacity"
              className="py-2 px-4 rounded-sm border border-gray-200 w-full"
              placeholder="Capacity"
              defaultValue={editRoomData.capacity}
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-2">
                {state?.error?.capacity}
              </span>
            </div>
          </div>

          {/* price */}
          <div className="mb-4">
            <input
              type="text"
              name="price"
              className="py-2 px-4 rounded-sm border border-gray-200 w-full"
              placeholder="Price"
              defaultValue={editRoomData.price}
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-2">
                {state?.error?.price}
              </span>
            </div>
          </div>

          {/* general message */}
          {state?.message && (
            <div className="mb-4 bg-red-300 p-2 rounden-sm">
              <span className="text-sm text-gray-700 mt-2">
                {state?.message}
              </span>
            </div>
          )}

          {/* tombol */}
          <button
            type="submit"
            className={clsx(
              "bg-orange-400 text-white hover:bg-orange-500 py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer rounded-sm hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out w-full",
              {
                "opacity-50 cursor-progress": isLoading,
              }
            )}
            disabled={isLoading}
          >
            {isLoading ? "Please Wait..." : "Update"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditFormAdminComponent;
