import Image from "next/image";
import Link from "next/link";
import { IProductCategory } from "../../../admin/views/products/context/types";
import { useStoreContext } from "../../context";

const CategoryCarrousel = () => {
  const {
    state: { categories },
  } = useStoreContext();

  return (
    <div className="mx-auto max-w-6xl p-6">
      <span className="text-xl">Categorías</span>
      <div className="scrollbar-hide scrollbar-store overflow-x-auto whitespace-nowrap gap-4 flex pl-1 p-6">
        {categories.map((cat, i) => (
          <CarrouselItem key={i} category={cat} />
        ))}
      </div>
    </div>
  );
};

interface ItemProps {
  category: IProductCategory;
}

export const CarrouselItem: React.FC<ItemProps> = ({
  category: { img_url, name },
}) => {
  return (
    <Link
      className="grid grid-cols-[35px_1fr] gap-3 items-center rounded-3xl shadow-md p-4 py-2"
      href="/"
    >
      <Image
        src={img_url}
        alt="category"
        width={100}
        height={100}
        className="rounded-full w-[35px] h-[35px] object-cover"
      />
      <span className="text-sm">{name}</span>
    </Link>
  );
};

export default CategoryCarrousel;
