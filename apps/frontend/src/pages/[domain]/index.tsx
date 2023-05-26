import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { API } from "../../api";
import { IProductCategory } from "../../views/admin/views/products/context/types";
import { StoreContextProvider } from "../../views/store/context";
import StoreView from "../../views/store/indext";
import { IProductCategoryWithProducts, IStore } from "../../views/store/types";
import StoreNotFoundView from "../../views/store/views/notFound";

const Store = ({
  store,
  categories,
  categoriesWithProducts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!store) return <StoreNotFoundView />;

  return (
    <StoreContextProvider
      store={store}
      categories={categories}
      categoriesWithProducts={categoriesWithProducts}
    >
      <StoreView />
    </StoreContextProvider>
  );
};

export default Store;

export const getServerSideProps: GetServerSideProps<{
  store: IStore | null;
  categories: Array<IProductCategory>;
  categoriesWithProducts: Array<IProductCategoryWithProducts>;
}> = async (ctx) => {
  try {
    const { domain } = ctx.query;

    if (!domain || typeof domain !== "string") throw new Error();

    const response = await API.store.getStoreByDomain(domain);

    const store: IStore = response.data.store;

    if (!store.id) throw new Error();

    const [catRpta, catWithProductsRpta] = await Promise.all([
      API.product.getAllCategoriesFromStore(store.id, {
        limit: 30,
        page: 1,
        products: 0,
      }),
      API.product.getAllCategoriesFromStore(store.id, {
        limit: 4,
        page: 1,
        products: 4,
      }),
    ]);

    const categories = catRpta.data.categories;
    const categoriesWithProducts = catWithProductsRpta.data.categories;

    return {
      props: {
        store,
        categories,
        categoriesWithProducts,
      },
    };
  } catch (err) {
    return {
      props: {
        store: null,
        categories: [],
        categoriesWithProducts: [],
      },
    };
  }
};
