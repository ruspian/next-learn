"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

const NavlinkComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className="inline-flex items-center p-2 justify-center text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <IoClose className="size-8" />
        ) : (
          <IoMenu className="size-8" />
        )}
      </button>

      <div
        className={clsx("w-full md:block md:w-auto", {
          hidden: !isOpen,
        })}
      >
        <ul className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 rounded-sm bg-gray-50 md:flex-row md:items-center md:space-x-10 md:p-0 md:mt-0 md:border-0 md:bg-white">
          <li>
            <Link
              href="/"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/room"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
            >
              Rooms
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/myreservetion"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
            >
              My Reservetion
            </Link>
          </li>
          <li>
            <Link
              href="/admin/dashboard"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/admin/room"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
            >
              Manage Room
            </Link>
          </li>
          <li className="pt-2 md:pt-0">
            <Link
              href="/signin"
              className="py-2.5 px-6 bg-orange-400 hover:bg-orange-500 text-white rounded-sm"
            >
              Signin
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavlinkComponent;
