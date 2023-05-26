import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminView from "../views/admin";

const Home = () => {
  const { push } = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) push("/admin");
  }, []);

  return <AdminView />;
};

export default Home;
