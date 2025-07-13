import Image from "next/image";
import React from "react";

const HeaderSectionComponent = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <header className="relative h-60 text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="header image"
          fill
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative flex flex-col items-center justify-center h-60 pt-14 text-center">
        <h1 className="font-bold text-4xl leading-tight capitalize">{title}</h1>
        <p className="text-xl text-gray-300">{subTitle}</p>
      </div>
    </header>
  );
};

export default HeaderSectionComponent;
