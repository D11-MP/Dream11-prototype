"use client";

import Link from "next/link";
import { usePathname , useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Topnav() {

  const session = useSession();
  const router = useRouter();

  async function handleLogout() {
      await signOut({redirect:false});
      router.replace('/login');
  }
  const pathName = usePathname();

  return (
    <div className="flex items-center justify-between bg-white h-[96px] px-[32px]">
      <h2 className="text-font_color font-bold text-2xl">DreamTeam</h2>
      <div className="flex flex-row gap-[60px]">
            <Link
              href="/"
              className={`text-gray-700 font-medium ${
                pathName === "/"
                  ? "text-red-600"
                  : "text-black"
              }`}
            >
              <div
                className={
                  "flex items-center space-x-2 cursor-pointer p-2 rounded"
                }
              >
                Home
              </div>
            </Link>
            <Link
              href="/matches"
              className={`text-gray-700 font-medium ${
                pathName === "/matches"
                  ? "text-red-600"
                  : "text-black"
              }`}
            >
              <div
                className={
                  "flex items-center space-x-2 cursor-pointer p-2 rounded"
                }
              >
                My Matches
              </div>
            </Link>
            <Link
              href="/news"
              className={`text-gray-700 font-medium ${
                pathName === "/news"
                  ? "text-red-600"
                  : "text-black"
              }`}
            >
              <div
                className={
                  "flex items-center space-x-2 cursor-pointer p-2 rounded"
                }
              >
                News
              </div>
            </Link>
            <Link
              href="/help"
              className={`text-gray-700 font-medium ${
                pathName === "/help"
                  ? "text-red-600"
                  : "text-black"
              }`}
            >
              <div
                className={
                  "flex items-center space-x-2 cursor-pointer p-2 rounded"
                }
              >
                Help
              </div>
            </Link>
            <Link
              href="/settings"
              className={`text-gray-700 font-medium ${
                pathName === "/settings"
                  ? "text-red-600"
                  : "text-black"
              }`}
            >
              <div
                className={
                  "flex items-center space-x-2 cursor-pointer p-2 rounded"
                }
              >
                Settings
              </div>
            </Link>
      </div>

      <div className="flex justify-center items-center">
        {/* <div className="flex-grow max-w-48">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-1 py-1 text-black text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
        </div> */}

{
  session.status === 'authenticated'?
  (<div className="flex items-center">
          
    <div className="relative cursor-pointer flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={handleLogout}
    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-6 h-6 mr-7">
     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
      </svg>
  </div>
  {/* Notification Bell Icon */}
  <div className="relative cursor-pointer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 21"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 mr-7 text-gray-700 hover:text-black"
      >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405C18.279 14.219 18 13.358 18 12.5V10c0-3.314-2.686-6-6-6S6 6.686 6 10v2.5c0 .858-.279 1.719-.595 2.095L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
    </svg>
    {/* Notification Dot */}
  </div>
  {/* Profile Image */}
  <img
    src="/profile.png" // Replace with your profile image URL
    alt="Profile"
    className="w-10 h-10 rounded-full object-cover cursor-pointer"
    />
</div>):(
  <div className="flex items-center">
    <button className="flex items-center justify-evenly px-4 py-2 text-white rounded bg-red-500" onClick={()=>{router.replace('/login')}}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-6 h-6">
     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
      </svg>
      LogIn
    </button>
  </div>
)
}
      </div>
    </div>
  );
}
