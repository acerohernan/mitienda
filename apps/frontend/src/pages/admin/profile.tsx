import AdminLayout from "../../views/admin/components/layout";
import AdminProfileView from "../../views/admin/views/profile";
import { ProfileProvider as AdminProfileProvider } from "../../views/admin/views/profile/context";

const AdminProfile = () => {
  return (
    <AdminLayout>
      <AdminProfileProvider>
        <AdminProfileView />
      </AdminProfileProvider>
    </AdminLayout>
  );
};

export default AdminProfile;
