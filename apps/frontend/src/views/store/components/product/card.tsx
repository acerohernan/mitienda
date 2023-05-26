import Image from "next/image";
import { IProduct } from "../../../admin/views/products/context/types";

interface Props {
  product: IProduct;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const imgSrc = product.images[0]
    ? product.images[0].url
    : "/placeholder-image.jpeg";

  return (
    <div className="w-full">
      <Image
        className="w-full border rounded-xl h-[270px] object-cover"
        alt="product"
        src={imgSrc}
        width={800}
        height={800}
      />
      <div className="mt-1">
        <span className="text-slate-700 font-light">{product.name}</span>
        <span className="text-black font-medium text-lg block">S/ 80.00</span>
      </div>
    </div>
  );
};

export default ProductCard;
