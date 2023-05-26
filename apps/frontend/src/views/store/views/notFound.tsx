import Image from "next/image";
import Link from "next/link";
import Logo404Svg from "../components/logo404";

const StoreNotFoundView = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="mx-auto p-10 w-full max-w-md grid gap-4 ">
        <h1 className="text-3xl font-medium text-center dark:text-white">
          Sorry, store not found!
        </h1>
        <p className="flex text-center text-slate-500 dark:text-slate-400 font-light">
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </p>
        <div className="relative my-6">
          <Logo404Svg className="w-96 h-96 z-10 relative" />
          <Image
            src="/girl-404.png"
            alt="404"
            width={800}
            height={800}
            className="w-60 h-60 object-contain absolute z-0 top-0 ml-28 mt-14"
          />
        </div>
        <div className="flex justify-center">
          <Link className="button text-sm" href="/login">
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreNotFoundView;
