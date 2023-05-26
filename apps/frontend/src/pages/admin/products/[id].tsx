import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { API } from "../../../api";
import AdminLayout from "../../../views/admin/components/layout";
import { AdminProductProvider } from "../../../views/admin/views/products/context";
import {
  IProduct,
  IProductCategory,
} from "../../../views/admin/views/products/context/types";
import AdminProductInformationView from "../../../views/admin/views/products/information";

const AdminProductInformation = ({
  product,
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <AdminLayout>
      <AdminProductProvider categories={categories}>
        <AdminProductInformationView product={product} />
      </AdminProductProvider>
    </AdminLayout>
  );
};

export default AdminProductInformation;

export const getServerSideProps: GetServerSideProps<{
  product: IProduct;
  categories: Array<IProductCategory>;
}> = async ({ query, req }) => {
  try {
    const id = query.id;
    const token = req.cookies.token;

    const [productRpta, catRpta] = await Promise.all([
      API.product.getProduct(id as string),
      API.product.getAllCategories(token),
    ]);

    const product: IProduct = productRpta.data.product;
    const categories: Array<IProductCategory> = catRpta.data.categories;

    return {
      props: {
        product,
        categories,
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/products",
      },
    };
  }
};
