"use client";

import { ContactMessage } from "@/lib/actions";
import clsx from "clsx";
import { useActionState } from "react";
import React from "react";

const ContactFormComponent = () => {
  // kelola state yang ada di server melalui useActionState
  const [state, formAction, isLoading] = useActionState(ContactMessage, null);

  return (
    <div className="bg-white p-8 rounded-sm shadow-sm">
      {state?.message && (
        <div
          className="p-4 mb-5 text-sm text-green-700 bg-green-100 rounded-md"
          role="alert"
        >
          <div className="font-medium">{state?.message}</div>
        </div>
      )}

      <form action={formAction}>
        <div className="grid md:grid-cols-2 gap-7 mt-6">
          {/* nama */}
          <div className="">
            <input
              type="text"
              name="name"
              className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
              placeholder="Name"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">{state?.error?.name}</p>
            </div>
          </div>

          {/* email */}
          <div className="">
            <input
              type="email"
              name="email"
              className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
              placeholder="youremail@example.com"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">{state?.error?.email}</p>
            </div>
          </div>

          {/* subject */}
          <div className="md:col-span-2">
            <input
              type="text"
              name="subject"
              className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
              placeholder="Subject"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">
                {state?.error?.subject}
              </p>
            </div>
          </div>

          {/* subject */}
          <div className="md:col-span-2">
            <textarea
              name="message"
              className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
              placeholder="Write your message!"
              rows={5}
            ></textarea>
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">
                {state?.error?.message}
              </p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={clsx(
            "px-10 text-center py-4 font-semibold text-white bg-orange-400 hover:bg-orange-500 mt-7 rounded-sm cursor-pointer w-full",
            {
              "opacity-50 cursor-progress animate-pulse": isLoading,
            }
          )}
          disabled={isLoading}
        >
          {isLoading ? "Please wait..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactFormComponent;
