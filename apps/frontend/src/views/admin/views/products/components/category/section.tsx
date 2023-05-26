import { useState } from "react";
import useSWRImmutable from "swr/immutable";
import { useAdminProductsContext } from "../../context";
import ProductCategoryCard from "./card";
import AdminProductCategoryUpdateModal from "./modal/update";

const ProuductCategorySection = () => {
  const {
    state: { categories },
    actions: { getAllCategories, handleSelectCategory, deleteProductCategory },
  } = useAdminProductsContext();

  useSWRImmutable("product/category", getAllCategories);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <div className="py-6 flex items-center gap-2 flex-wrap">
      {Object.values(categories).map((cat, i) => (
        <ProductCategoryCard
          category={cat}
          key={i}
          handleOpenModal={() => setShowUpdateModal(true)}
        />
      ))}
      {showUpdateModal && (
        <AdminProductCategoryUpdateModal
          handleClose={() => {
            setShowUpdateModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ProuductCategorySection;
