import { IoLogoGoogle } from "react-icons/io5";
import { signIn } from "@/auth";

export const LoginWithGoogleButtonComponent = () => {
  return (
    // gunakan action sigin yang sudah dikonfigurasi dengan authjs
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button className="flex items-center justify-center gap-2 w-full bg-emerald-700 text-white font-medium py-3 px-6 rounded-sm hover:bg-emerald-600 cursor-pointer">
        <IoLogoGoogle className="size-6" />
        Sign In With Google
      </button>
    </form>
  );
};
