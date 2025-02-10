"use client";
import Image from "next/image";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

// Define the props for the Modal component
interface ModalProps {
  onClose: () => void; // Function to handle modal closure
}

// Modal component definition
const UserModal = ({ onClose }: ModalProps) => {
  // State to manage the current view ("login", "signup", or "forgotPassword")
  const [view, setView] = useState<"login" | "signup" | "forgotPassword">(
    "login"
  );

  // Function to switch between views
  const switchView = (newView: "login" | "signup" | "forgotPassword") =>
    setView(newView);

  return (
    <Transition appear show as={Fragment}>
      {/* Dialog component wraps the modal, enabling accessibility and transitions */}
      <Dialog as="div" onClose={onClose} className="fixed inset-0 z-50">
        <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-30 px-4">
          {/* Transition effects for entering and leaving the modal */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative">
              {/* Close button */}
              <Image
                src="/assets/icons/x-close.svg"
                alt="close"
                width={24}
                height={24}
                className="absolute top-4 right-4 cursor-pointer"
                onClick={onClose} // Trigger the onClose function when clicked
              />

              {/* Conditionally render content based on the current view */}
              {view === "forgotPassword" ? (
                // Forgot Password view
                <div>
                  <h2 className="text-lg font-semibold text-black mb-6">
                    Forgot your password?
                  </h2>
                  <p className="text-sm text-gray-600 mt-4">
                    Enter your email address below. We’ll send you an email to log
                    in and reset your password.
                  </p>
                  <br></br>
                  <form className="space-y-4">
                    <div>
                      <p>Email</p>
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                    >
                      Send Email
                    </button>
                  </form>
                  <p className="text-center text-sm text-gray-600 mt-4">
                    Remembered your password?{" "}
                    <button
                      type="button"
                      onClick={() => switchView("login")}
                      className="text-black font-medium"
                    >
                      Log in
                    </button>
                  </p>
                </div>
              ) : (
                // Login and Sign Up views
                <>
                  <h2 className="text-lg font-semibold text-black mb-6">
                    {view === "login" ? "Log in" : "Sign Up"}
                  </h2>

                  {view === "login" ? (
                    // Login Form
                    <form className="space-y-4">
                      <div>
                        <p>Email</p>
                        <label htmlFor="email" className="sr-only">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Email Address"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <p>Password</p>
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          placeholder="Password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                          required
                        />
                      </div>

                      <div className="text-right">
                        <button
                          type="button"
                          onClick={() => switchView("forgotPassword")}
                          className="text-sm text-gray-600 hover:text-black"
                        >
                          Forgot password?
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                      >
                        Sign In
                      </button>

                      <p className="text-center text-sm text-gray-600 mt-4">
                        Don’t have an account?{" "}
                        <button
                          type="button"
                          onClick={() => switchView("signup")}
                          className="text-black font-medium"
                        >
                          Sign Up
                        </button>
                      </p>
                    </form>
                  ) : (
                    // Sign Up Form
                    <form className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-1/2">
                        <p>First Name</p>
                          <label htmlFor="firstName" className="sr-only">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            placeholder="First name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                            required
                          />
                        </div>
                        <div className="w-1/2">
                        <p>Last Name</p>
                          <label htmlFor="lastName" className="sr-only">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            placeholder="Last name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <p>Email</p>
                        <label htmlFor="email" className="sr-only">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <p>Password</p>
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          placeholder="Password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                      >
                        Create an account
                      </button>

                      <p className="text-xs text-gray-500 mt-2">
                        By clicking "Create an account" above, you acknowledge
                        that you will receive updates from our team and agree to
                        our Terms & Conditions and Privacy Policy.
                      </p>

                      <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => switchView("login")}
                          className="text-black font-medium"
                        >
                          Log in
                        </button>
                      </p>
                    </form>
                  )}
                </>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UserModal;
