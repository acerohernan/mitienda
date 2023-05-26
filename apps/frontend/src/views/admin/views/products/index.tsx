import { CameraIcon } from "@heroicons/react/24/outline";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import useSWRImmutable from "swr/immutable";
import useTranslation from "../../../../i18n/useTranslation";
import ProductCard from "./components/card";
import AdminProductCategoryCreateModal from "./components/category/modal/create";
import ProuductCategorySection from "./components/category/section";
import AdminProductSkeleton from "./components/skeleton";
import { useAdminProductsContext } from "./context";

const AdminProductsView = () => {
  const {
    actions: { getAllProducts, getAllCategories },
    state: {
      products,
      metadata: { page, has_next_page, has_previous_page },
    },
  } = useAdminProductsContext();

  useSWRImmutable("product/all", getAllProducts, {
    onSuccess: () => {
      setProductsLoaded(true);
    },
  });

  const { t } = useTranslation();
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  return (
    <div>
      <div>
        <span className="font-medium text-2xl dark:text-white">
          {t("Products")}
        </span>
        <div className="flex items-center gap-5 mt-3">
          <Link
            href="/admin"
            className="text-sm dark:text-white hover:underline"
          >
            {t("Administrator")}
          </Link>
          <div className="w-1 h-1 bg-slate-400 dark:bg-slate-50 rounded-full" />
          <span className="text-sm text-slate-400">{t("Products")}</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between mt-4 lg:mt-14 mb-2">
          <button
            className="button flex text-sm"
            onClick={() => setShowCategoryModal(true)}
          >
            Create Category
            <PlusIcon className="w-5 h-5 block ml-1" />
          </button>
          <Link className="button flex text-sm" href="/admin/products/create">
            Create Product
            <PlusIcon className="w-5 h-5 block ml-1" />
          </Link>
        </div>

        {productsLoaded && products ? (
          <>
            <ProuductCategorySection />
            <div className="card w-full grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
              {products.length > 0 ? (
                products.map((product, i) => (
                  <ProductCard key={i} product={product} />
                ))
              ) : (
                <Link
                  className="border border-dashed rounded-lg border-slate-400 dark:border-slate-500 flex flex-col items-center justify-center hover:border-slate-700 transition-all dark:hover:border-slate-200
              dark:text-slate-400 dark:hover:text-slate-200
              text-slate-500 hover:text-slate-700 h-[342px]
              "
                  href="/admin/products/create"
                >
                  <CameraIcon className="w-8 h-8" />
                  <span>Agregar producto</span>
                </Link>
              )}
            </div>
          </>
        ) : (
          <AdminProductSkeleton />
        )}

        <div className="card w-48 h-16 mx-auto mt-6 flex items-center justify-center">
          <button
            className="icon-button cursor-pointer"
            disabled={!has_previous_page}
          >
            <ChevronLeftIcon className="icon" />
          </button>
          <span className="block mx-7">{page}</span>
          <button className="icon-button" disabled={!has_next_page}>
            <ChevronRightIcon className="icon" />
          </button>
        </div>
        {showCategoryModal && (
          <AdminProductCategoryCreateModal
            handleClose={() => setShowCategoryModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminProductsView;
