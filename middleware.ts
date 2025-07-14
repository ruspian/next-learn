import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

// membuat middleware untuk protected routes
// inisialisasi route yang akan di proteksi
const ProtectedRoutes = ["/myreservation", "/checkout", "/admin"];

export const middleware = async (req: NextRequest) => {
  // panggil session
  const session = await auth();

  // cek apakah user sudah login
  const isLogin = !!session?.user; // "!!" digunakan untuk mengubah nilai menjadi boolean
  const role = session?.user?.role;

  // ambil pathname yang sedang diakses
  const { pathname } = req.nextUrl;

  // jika user belum login dan mencoba mengakses route yang di proteksi
  if (!isLogin && ProtectedRoutes.some((route) => pathname.startsWith(route))) {
    // redirect ke halaman login
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // jika user user sudah login dan role bukan admin mencoba mengakses halaman admin
  if (isLogin && role !== "admin" && pathname.startsWith("/admin")) {
    // redirect ke halaman home
    return NextResponse.redirect(new URL("/", req.url));
  }

  // jika user sudah login dan mencoba mengakses halaman login
  if (isLogin && pathname.startsWith("/signin")) {
    // redirect ke halaman home
    return NextResponse.redirect(new URL("/", req.url));
  }
};

// membuat matcher untuk middleware
// agar middleware hanya berlaku pada route yang di proteksi
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
