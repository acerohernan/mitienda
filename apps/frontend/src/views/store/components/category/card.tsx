import { ChevronRightIcon } from "@heroicons/react/24/solid";

type Props = {
  name: string;
};

const ProductCategoryCard = ({ name }: Props) => {
  return (
    <div className="rounded-md flex items-center justify-between shadow-md border border-slate-200/60 p-4">
      <h1 className="font-medium text-xl">{name}</h1>
      <button className="flex items-center gap-1 group">
        <span className="group-hover:underline text-slate-600 font-light">
          Ver más
        </span>
        <ChevronRightIcon className="w-5 h-5 text-slate-600" />
      </button>
    </div>
  );
};

export default ProductCategoryCard;
