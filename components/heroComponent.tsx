import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroComponent = () => {
  return (
    // overlay
    <div className="relative h-screen text-white overflow-hidden">
      {/* hero image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="hero image"
          fill
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* text */}
      <div className="relative flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-7xl font-bold mb-2 leading-tight capitalize">
          Welcome to Our Hotel
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          book a room at our hotel and get a special offer just for you
        </p>

        {/* tombol */}
        <div className="flex gap-5">
          <Link
            href="/room"
            className="bg-orange-400 text-white hover:bg-orange-500 py-2 px-6 md:px-10 rounded-sm text-lg font-semibold hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
          >
            Book Now
          </Link>

          <Link
            href="/contact"
            className="bg-transparent border border-orange-400 text-white hover:bg-orange-500 py-2 px-6 md:px-10 rounded-sm text-lg font-semibold hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
