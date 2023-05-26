import React from "react";
import { AdminProvider } from "../../context";
import AdminHeader from "../header";

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <AdminProvider>
      <div className="relative grid lg:grid-cols-[288px_1fr]">
        <div />
        <div>
          <AdminHeader />

          <div className="mt-[72px] w-full lg:mt-0 p-6 lg:px-10 max-w-7xl mx-auto lg:pb-20">
            {children}
          </div>
        </div>
      </div>
    </AdminProvider>
  );
};

export default AdminLayout;
