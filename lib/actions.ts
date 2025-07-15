"use server";

import { contactSchema, RoomSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

// buat action untuk mengirim pesan di form contact
export const ContactMessage = async (
  prevState: unknown,
  formData: FormData
) => {
  // ambil data dari form
  const validatedFields = contactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  // cek apakah data valid
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  // jika berhasil ambil data
  const { name, email, subject, message } = validatedFields.data;

  // simpan data ke database
  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return { message: "Message sent successfully, thanks for contacting us" };
  } catch (error) {
    console.log(error);
  }
};

// action untuk buat room
export const SaveRoom = async (
  image: string,
  prevState: unknown,
  formData: FormData
) => {
  // pastikan gambar di unggah
  if (!image) return { message: "Image is required!" };

  // dikarnakan fasilitas menggunakan array string
  // maka harus di destructure satu persatu
  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  // validasi data
  const validatedFields = RoomSchema.safeParse(rawData);

  // cek apakah data valid
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  // jika berhasil ambil data
  const { name, description, capacity, price, amenities } =
    validatedFields.data;

  // simpan data ke database
  try {
    await prisma.room.create({
      data: {
        name,
        description,
        capacity,
        price,
        image,
        RoomAmenities: {
          createMany: {
            data: amenities.map((item) => ({ amenitiesId: item })),
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }

  redirect("/admin/room");
};

// action delete room
export const DeleteRoom = async (id: string, image: string) => {
  try {
    // hapus gambar dari vercel blob dengan menggunakan del dari @vercel/blob
    await del(image);

    // hapus data room berdasarkan id
    await prisma.room.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }

  // hapus chache, ambil data terbaru dan refresh halaman
  revalidatePath("/admin/room");
};
