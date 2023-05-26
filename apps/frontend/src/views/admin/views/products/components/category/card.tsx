import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { useAdminProductsContext } from "../../context";
import { IProductCategory } from "../../context/types";
import ProductCategoryDeleteWarning from "./warning";

interface Props {
  category: IProductCategory;
  handleOpenModal: () => void;
}

const ProductCategoryCard: React.FC<Props> = ({
  category,
  handleOpenModal,
}) => {
  const {
    actions: { handleSelectCategory, deleteProductCategory },
  } = useAdminProductsContext();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="card grid grid-cols-[40px_1fr] items-center gap-2 p-2">
      <Image
        src={category.img_url}
        width={100}
        height={100}
        alt={category.name}
        className="rounded-full w-10 h-10 object-cover"
      />
      <div className="flex items-center gap-2">
        <span className="text-sm">{category.name}</span>

        <button
          onClick={() => {
            handleSelectCategory(category.id);
            handleOpenModal();
          }}
          type="button"
        >
          <PencilSquareIcon className="icon" />
        </button>
        <button onClick={() => setShowDeleteModal(true)} type="button">
          <TrashIcon className="icon" />
        </button>
      </div>
      {showDeleteModal && (
        <ProductCategoryDeleteWarning
          handleClose={() => setShowDeleteModal(false)}
          onDelete={async () => {
            deleteProductCategory(category.id);
          }}
        />
      )}
    </div>
  );
};

export default ProductCategoryCard;
