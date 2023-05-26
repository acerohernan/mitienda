import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import NoSsr from "react-no-ssr";
import { useAdminContext } from "../../context";
import SideBar from "../sidebar";
import AvatarButton from "./avatar";
import LanguageButton from "./language";

const AdminHeader = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const {
    state: { store },
  } = useAdminContext();

  return (
    <div className="relative">
      <div className="w-full flex items-center justify-between p-4 fixed top-0 backdrop-blur-md bg-white/80  dark:bg-dark-800/80 lg:px-10 lg:relative z-20">
        <div className="flex items-center gap-2 lg:gap-3">
          <button
            className="icon-button lg:hidden"
            onClick={() => setShowSidebar(true)}
          >
            <Bars3BottomLeftIcon className="w-5 h-5" />
          </button>
          <button className="icon-button">
            <MagnifyingGlassIcon className="icon" />
          </button>
        </div>
        <div className="flex items-center gap-2 lg:gap-3">
          <NoSsr>
            <LanguageButton />
          </NoSsr>
          {store ? (
            <div className="flex gap-1 items-center mr-1">
              <Link
                className="icon-button"
                href={`/${store?.domain}`}
                target="_blank"
                rel="noreferrer"
              >
                <EyeIcon className="icon" />
              </Link>
              <Link
                className="hidden hover:underline text-sm font-light md:flex"
                href={`/${store?.domain}`}
                target="_blank"
                rel="noreferrer"
              >
                Ver tienda
              </Link>
            </div>
          ) : null}

          <AvatarButton />
        </div>
      </div>
      <SideBar show={showSidebar} setShow={setShowSidebar} />
    </div>
  );
};

export default AdminHeader;
