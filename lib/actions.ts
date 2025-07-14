"use server";

import { contactSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";

// buat action untuk mengirim pesan
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
