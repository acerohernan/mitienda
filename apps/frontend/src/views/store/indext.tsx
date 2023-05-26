import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import CategorySection from "./components/category";
import CategoryCarrousel from "./components/category/carrousel";
import StoreFooter from "./components/footer";
import { useStoreContext } from "./context";

interface Props {}

const StoreView: React.FC<Props> = () => {
  const {
    state: { store, categoriesWithProducts },
  } = useStoreContext();

  const bannerSrc = store.banner_img || "/placeholder-banner.jpeg";
  const logoSrc = store.logo_img || "/placeholder-image.jpg";

  return (
    <div className="dark:bg-dark-500 w-full h-screen">
      <div className="mx-auto relative">
        <div className="relative">
          <div className="absolute h-full overflow-hidden">
            <Image
              src={bannerSrc}
              width={2000}
              height={600}
              className="scale-110 object-cover blur-[10px]"
              alt="banner"
            />
          </div>
          <Image
            src={bannerSrc}
            width={2000}
            height={600}
            className="w-full max-w-6xl mx-auto z-10 relative max-h-[140px] sm:max-h-[160px] 
            md:max-h-[250px] lg:max-h-[300px]
            object-cover"
            alt="banner"
          />

          <Image
            src={logoSrc}
            width={800}
            height={800}
            className="w-36 h-24 sm:w-52 sm:h-36 md:w-72 md:h-40 lg:w-72 lg:h-48 rounded-lg shadow-lg  absolute z-10 -bottom-12 sm:-bottom-16 md:-bottom-20 lg:-bottom-24 right-0 left-0 mx-auto
            object-cover"
            alt="logo"
          />
        </div>
        <div className="w-full relative">
          <div className="flex justify-end max-w-6xl mx-auto sm:pt-8 md:pt-12 z-10">
            <div className="p-2">
              <button className="p-3 hover:bg-slate-50/80 transition-all rounded-full hidden xs:inline">
                <MagnifyingGlassIcon className="w-8 h-8 text-black" />
              </button>
              <button className="p-3 hover:bg-slate-50/80 transition-all rounded-full relative">
                <ShoppingCartIcon className="w-8 h-8 text-black" />
                <div className="bg-purple-700 absolute top-1 right-1  h-5 w-5 rounded-full text-white flex items-center justify-center text-sm">
                  2
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  <FeaturedSection /> */}
      <div className="py-6">
        <CategoryCarrousel />
        {categoriesWithProducts.map((cat, i) => (
          <CategorySection category={cat} key={i} />
        ))}
      </div>
      <StoreFooter />
    </div>
  );
};

export default StoreView;
