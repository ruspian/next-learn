import HeaderSectionComponent from "@/components/headerSectionComponent";
import Image from "next/image";
import { IoBookmarksOutline, IoFootstepsOutline } from "react-icons/io5";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "who we are",
};

const AboutPage = () => {
  return (
    <div>
      {/* header */}
      <HeaderSectionComponent
        title="about us"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae."
      />

      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid gap-7 md:grid-cols-2">
          <Image
            src="/about-img.jpg"
            alt="about image"
            width={650}
            height={579}
          />

          <div className="">
            <h1 className="text-5xl font-semibold text-gray-900 mb-2">
              Who We Are
            </h1>
            <p className="text-lg text-gray-600 py-5">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Architecto voluptates iure libero rerum? Voluptate numquam a eaque
              iusto quasi ex!
            </p>

            {/* visi dan misi */}
            <ul className="list-item space-y-6 pt-8">
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoBookmarksOutline className="size-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Vision :</h4>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Assumenda molestias quaerat qui.
                  </p>
                </div>
              </li>

              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoFootstepsOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Mision :</h4>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Debitis optio esse vero eaque ipsam cum! Magnam animi
                    voluptas repudiandae reprehenderit.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
