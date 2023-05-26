import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { API } from "../../../api";
import AdminLayout from "../../../views/admin/components/layout";
import { AdminProductProvider } from "../../../views/admin/views/products/context";
import { IProductCategory } from "../../../views/admin/views/products/context/types";
import AdminProductsCreate from "../../../views/admin/views/products/create";

const AdminProducts = ({
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <AdminLayout>
      <AdminProductProvider categories={categories}>
        <AdminProductsCreate />
      </AdminProductProvider>
    </AdminLayout>
  );
};

export default AdminProducts;

export const getServerSideProps: GetServerSideProps<{
  categories: Array<IProductCategory>;
}> = async ({ query, req }) => {
  try {
    const id = query.id;
    const token = req.cookies.token;

    const response = await API.product.getAllCategories(token);

    const categories: Array<IProductCategory> = response.data.categories;

    return {
      props: {
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
