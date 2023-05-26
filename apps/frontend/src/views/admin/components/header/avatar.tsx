import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import { useAdminContext } from "../../context";

const AvatarButton = () => {
  const [open, setOpen] = useState(false);
  const {
    state: { tenant },
  } = useAdminContext();

  const clickRef = React.useRef(null);
  const { push } = useRouter();
  const { removeItem } = useLocalStorage();

  useClickOutside({
    ref: clickRef,
    callback: () => setOpen(false),
  });

  function handleLogout() {
    Cookies.remove("token");
    removeItem("tenant");
    removeItem("store");
    push("/login");
  }

  const name = `${tenant?.name || ""} ${
    tenant?.surname ? `${tenant?.surname.slice(0, 1)}.` : ""
  }`;
  const profileSrc = tenant?.profile_img || "/avatar-placeholder.png";

  return (
    <div className="relative" ref={clickRef}>
      <button
        className="transition-all hover:scale-110"
        onClick={() => setOpen(!open)}
      >
        <Image
          src={profileSrc}
          className="rounded-full"
          alt="badget"
          width={40}
          height={40}
        />
      </button>
      <div
        className={`absolute bottom-100 right-0 p-2 py-3 grid gap-1 rounded-lg shadow-md ease-in-out duration-300 w-52 origin-top-right bg-white dark:bg-dark-500 ${
          open
            ? "transform opacity-100 scale-100"
            : "transform opacity-0 scale-0"
        } dark:bg-dark-500`}
      >
        <div className="m-3 mt-0">
          <h1 className="dark:text-white font-medium">{name}</h1>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {tenant?.email || ""}
          </span>
        </div>
        <div className="border-t border-dashed border-slate-300 dark:border-slate-600 w-full h-2" />
        <Link
          className={`
           text-sm p-3 py-2 hover:bg-gray-400/10 rounded-lg flex items-center justify-start dark:hover:bg-gray-700/30 dark:text-white
          `}
          href="/admin/profile"
        >
          Profile
        </Link>
        <Link
          className={`
           text-sm p-3 py-2 hover:bg-gray-400/10 rounded-lg flex items-center justify-start dark:hover:bg-gray-700/30 dark:text-white
          `}
          href="/admin/store"
        >
          Store
        </Link>
        <Link
          className={`
           text-sm p-3 py-2 hover:bg-gray-400/10 rounded-lg flex items-center justify-start dark:hover:bg-gray-700/30 dark:text-white
          `}
          href="/admin/store"
        >
          Products
        </Link>
        <div className="border-t border-dashed mt-2 border-slate-300 dark:border-slate-600 w-full h-2" />
        <button
          className={`
           text-sm p-3 py-2 hover:bg-gray-400/10 rounded-lg flex items-center justify-start dark:hover:bg-gray-700/30 dark:text-white
          `}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AvatarButton;
