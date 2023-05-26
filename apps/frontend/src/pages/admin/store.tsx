import AdminLayout from "../../views/admin/components/layout";
import AdminStoreView from "../../views/admin/views/store";
import { AdminStoreProvider } from "../../views/admin/views/store/context";

const AdminStore = () => {
  return (
    <AdminLayout>
      <AdminStoreProvider>
        <AdminStoreView />
      </AdminStoreProvider>
    </AdminLayout>
  );
};

export default AdminStore;
