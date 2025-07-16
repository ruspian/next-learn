"use server";

import { contactSchema, ReserveSchema, RoomSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { differenceInCalendarDays } from "date-fns";

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

// action update Room
export const UpdateRoom = async (
  image: string,
  roomId: string,
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
    await prisma.$transaction([
      prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          name,
          description,
          capacity,
          price,
          image,
          RoomAmenities: {
            deleteMany: {}, // hapus semua fasilitas terlebih dahulu
          },
        },
      }),
      prisma.roomAmenities.createMany({
        data: amenities.map((item) => ({ amenitiesId: item, roomId: roomId })), // tambahkan fasilitas baru
      }),
    ]);
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/admin/room");
  redirect("/admin/room");
};

// action reserve room
export const CreateReserveRoom = async (
  roomId: string,
  price: number,
  startDate: Date,
  endDate: Date,
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();

  // cek apakah user sudah login
  // jika user belum login, redirect ke halaman login
  // jika user sudah diarahkan ke halaman login dan login berhasil maka arahkan kembali ke halaman reserve
  if (!session || !session?.user || !session?.user?.id)
    redirect(`/signin?redirect_url=/room/${roomId}`);

  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
  };

  // validasi data
  const validatedFields = ReserveSchema.safeParse(rawData);

  // cek apakah data valid
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  // jika berhasil ambil data
  const { name, phone } = validatedFields.data;

  // validasi jumlah hari
  const night = differenceInCalendarDays(endDate, startDate);
  if (night <= 0) return { messageDate: "Minimum stay is 1 night" };

  // jumlah harga yang harus dibayar
  const total = night * price;

  // inisialisasi data
  let reservationId;

  // simpan data ke database
  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        // update data user
        data: {
          name,
          phone,
        },
        where: {
          id: session.user.id,
        },
      });

      // setelah berhasil update user maka simpan data reservation dan payment
      const reservation = await tx.reservation.create({
        data: {
          startDate: startDate,
          endDate: endDate,
          price: price,
          roomId: roomId,
          userId: session.user.id as string,
          Payment: {
            create: {
              amount: total,
            },
          },
        },
      });

      // isi data reservationId
      reservationId = reservation.id;
    });
  } catch (error) {
    console.log(error);
  }

  // arahkan ke halaman checkout
  redirect(`/checkout/${reservationId}`);
};
