import AdminLayout from "../../views/admin/components/layout";
import AdminOrdersView from "../../views/admin/views/orders";

const AdminOrders = () => {
  return (
    <AdminLayout>
      <AdminOrdersView />
    </AdminLayout>
  );
};

export default AdminOrders;
