import AdminLayout from "../../../views/admin/components/layout";
import AdminProductsView from "../../../views/admin/views/products";
import { AdminProductProvider } from "../../../views/admin/views/products/context";

const AdminProducts = () => {
  return (
    <AdminLayout>
      <AdminProductProvider categories={[]}>
        <AdminProductsView />
      </AdminProductProvider>
    </AdminLayout>
  );
};

export default AdminProducts;
