import Image from "next/image";
import Link from "next/link";

const FooterComponent = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 w-full py-10 md:py-16">
        <div className="grid md:grid-cols-3 gap-7">
          {/* logo */}
          <div className="">
            <Link href="/" className="mb-10 block">
              <Image src="/logo.png" alt="logo" width={128} height={49} />
            </Link>
            <p className="text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat
              blanditiis neque corrupti quo qui.
            </p>
          </div>
          <div className="">
            <div className="flex gap-20">
              {/* links */}
              <div className="flex-1 md:flex-none">
                <h4 className="mb-8 text-xl font-semibold text-white">Links</h4>
                <ul className="list-item space-y-5 text-gray-400">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about">About Us</Link>
                  </li>
                  <li>
                    <Link href="/room">Rooms</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>

              {/* legal */}
              <div className="flex-1 md:flex-none">
                <h4 className="mb-8 text-xl font-semibold text-white">Legal</h4>
                <ul className="list-item space-y-5 text-gray-400">
                  <li>
                    <Link href="#">Legal</Link>
                  </li>
                  <li>
                    <Link href="#">Term and Condition</Link>
                  </li>
                  <li>
                    <Link href="#">Payment Method</Link>
                  </li>
                  <li>
                    <Link href="#">Policy and Privacy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* form news letter */}
          <div className="">
            <h4 className="mb-8 text-xl font-semibold text-white">
              Newsletter
            </h4>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            </p>

            {/* form */}
            <form action="" className="mt-5">
              <div className="mb-5">
                <input
                  type="text"
                  name="email"
                  placeholder="your@email.com"
                  className="w-full p-3 rounded-sm bg-white"
                />
              </div>
              <button className="bg-orange-400 p-3 font-bold text-white w-full text-center ronded-sm hover:bg-orange-500">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-500 py-8 text-center text-base text-gray-500">
        &copy; 2025 Ruspian Majid - All rights reserved
      </div>
    </footer>
  );
};

export default FooterComponent;
