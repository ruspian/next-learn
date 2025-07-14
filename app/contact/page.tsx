import { Metadata } from "next";
import HeaderSectionComponent from "@/components/headerSectionComponent";
import {
  IoMailOpenOutline,
  IoCallOutline,
  IoLocationOutline,
} from "react-icons/io5";
import ContactFormComponent from "@/components/contactFormComponent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact us",
};
const ContactPage = () => {
  return (
    <div className="">
      <HeaderSectionComponent
        title="Contact Us"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae."
      />

      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid gap-7 md:grid-cols-2">
          <div className="">
            <h1 className="text-lg text-gray-500 mb-3">Contact Us</h1>
            <h1 className="text-5xl font-semibold text-gray-900 mb-4">
              Get in touch today!
            </h1>
            <p className="text-gray-700 py-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio quo
              maiores temporibus quisquam mollitia neque!
            </p>

            <ul className="list-item space-y-6 pt-8">
              <li className="flex gap-5">
                <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-sm">
                  <IoMailOpenOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Email :</h4>
                  <p className="text-gray-600">hotel@info.com</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-sm">
                  <IoCallOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Phone Number :</h4>
                  <p className="text-gray-600">(+62) 123 456 789</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-sm">
                  <IoLocationOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Address :</h4>
                  <p className="text-gray-600">
                    Jl. Otong Surotong, Gorontalo, Indonesia
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* form contact */}
          <ContactFormComponent />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
