import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { IProductVariant } from "../../context/types";
import ProductVariantModal from "./modal";

interface Props {
  variant: IProductVariant;
  handleOpen: () => void;
  handleUpdate: (variant: IProductVariant) => void;
}

const VariantCard: React.FC<Props> = ({ variant, handleUpdate }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-between">
        <span className="input w-full p-3">{variant.name}</span>
        <div className="flex gap-4 ml-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="input flex p-3 items-center"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="input flex p-3 items-center"
          >
            <PencilSquareIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="input flex p-3 items-center"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <ProductVariantModal
        open={open}
        handleClose={() => setOpen(false)}
        variant={variant}
        onSave={handleUpdate}
      />
    </>
  );
};

export default VariantCard;
