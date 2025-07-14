import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";

// fungsi untuk upload gambar ke vercel blob
export const PUT = async (req: Request) => {
  // ambil data dari form
  const form = await req.formData();

  // ambil file gambar saja
  const file = form.get("file") as File;

  //  cek apakah file kosong
  if (file.size === 0 || file.size === undefined) {
    return NextResponse.json({ message: "File is required!" }, { status: 400 });
  }

  //  cek apakah file lebih besar dari 4MB
  if (file.size > 4000000) {
    return NextResponse.json(
      { message: "Maximum file size is 4MB!" },
      { status: 400 }
    );
  }

  //  cek apakah file adalah gambar
  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { message: "File must be an image!" },
      { status: 400 }
    );
  }

  // simpan gambar ke vercel blob
  const blob = await put(file.name, file, {
    access: "public",
    multipart: true,
  });

  return NextResponse.json(blob, { status: 200 });
};

// fungsi untuk menghapus gambar dari vercel blob
export const DELETE = async (req: Request) => {
  // ambil gambar
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("imageUrl") as string;

  // hapus gambar
  await del(imageUrl);

  return NextResponse.json({ message: "Image deleted!" }, { status: 200 });
};
