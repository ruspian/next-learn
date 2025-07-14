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
