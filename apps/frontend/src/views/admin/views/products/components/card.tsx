import Image from "next/image";
import Link from "next/link";
import Switch from "../../../../../components/form/switch";
import { IProduct } from "../context/types";

interface Props {
  product: IProduct;
}

const ProductCard: React.FC<Props> = ({
  product: { name, price, offer_price, id, images },
}) => {
  const imageSrc = images[0] ? images[0].url : "/placeholder-image.jpg";

  return (
    <div className="w-full p-6 border border-slate-200 dark:border-slate-600 rounded-lg dark:hover:bg-gray-500/10 cursor-pointer mx-auto relative group">
      <Link
        href={`/admin/products/${id}`}
        className="rounded-lg absolute top-0 bottom-0 left-0 right-0 z-10 w-full hidden h-full dark:bg-black/20 bg-gray-400/10 group-hover:block"
      />
      <Image
        src={imageSrc}
        alt="product-img"
        width={500}
        height={500}
        className="w-full rounded-lg h-52 object-cover"
      />
      <div>
        <span className="font-light mt-2 block">{name}</span>
        {offer_price ? (
          <div>
            <span className="text-sm block font-light text-slate-400 line-through mt-2">
              $ {price}
            </span>
            <span className="block font-bold text-lg -mt-1">
              $ {offer_price}
            </span>
          </div>
        ) : (
          <div>
            <span className="text-sm block font-light text-white dark:text-dark-500 line-through mt-2">
              $
            </span>
            <span className="block font-bold text-lg -mt-1">$ {price}</span>
          </div>
        )}
        <Switch className="z-10 top-0 right-0 m-8" position="absolute" />
      </div>
    </div>
  );
};

export default ProductCard;
