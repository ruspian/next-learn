import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavlinkComponent from "@/components/navbar/navlinkComponent";

const NavbarComponent = () => {
  return (
    // buat navbar
    <div className="fixed top-0 w-full bg-white shadow-sm z-20">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={128} height={49} priority />
        </Link>
        <NavlinkComponent />
      </div>
    </div>
  );
};

export default NavbarComponent;
