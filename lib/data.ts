import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// controller untuk ambil data fasilitass
export const getAmenities = async () => {
  // inisialisasi auth untuk mengecek session / user login
  const session = await auth();

  // cek apakah user sudah login
  if (!session || !session?.user) {
    throw new Error("You must be logged in to get amenities");
  }

  try {
    // ambil semua data fasilitas
    const result = await prisma.amenities.findMany();

    // kembalikan hasil
    return result;
  } catch (error) {
    console.log(error);
  }
};

// controller untuk ambil data room
export const getRooms = async () => {
  try {
    // ambil semua data fasilitas
    const result = await prisma.room.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // kembalikan hasil
    return result;
  } catch (error) {
    console.log(error);
  }
};

// controller get room by id
export const getRoomById = async (roomId: string) => {
  try {
    const result = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
      include: { RoomAmenities: { select: { amenitiesId: true } } },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

// controller edit room
export const getRoomDetailById = async (roomId: string) => {
  try {
    const result = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        RoomAmenities: {
          include: {
            Amenities: { select: { name: true } },
          },
        },
      },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

// controller reservation room
export const getReservationById = async (id: string) => {
  try {
    const result = await prisma.reservation.findUnique({
      where: {
        id: id,
      },
      include: {
        Room: {
          select: {
            name: true,
            image: true,
            price: true,
          },
        },
        User: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        Payment: true,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

// controller get room by id
export const getDisabledRoomById = async (roomId: string) => {
  try {
    const result = await prisma.reservation.findMany({
      select: {
        startDate: true,
        endDate: true,
      },
      where: {
        roomId: roomId,
        Payment: { status: { not: "failed" } },
      },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};
