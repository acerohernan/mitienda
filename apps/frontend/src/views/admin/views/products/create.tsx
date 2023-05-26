import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import { API } from "../../../../api";
import { getHttpError } from "../../../../helpers/httpError";
import { useToast } from "../../../../hooks/useToast";
import AdminProductForm from "./components/form";
import { IProduct } from "./context/types";

interface Props {}

const AdminProductsCreate = () => {
  const toast = useToast();
  const { push } = useRouter();

  async function createProduct(product: IProduct) {
    try {
      /* Creates the product id */
      product.id = uuid();

      /* Send to the api */
      await API.product.createProduct(product);
      toast.success("Producto creado correctamente");
      push("/admin/products");
    } catch (err) {
      toast.error(getHttpError(err));
    }
  }

  return (
    <AdminProductForm
      product={{
        name: "",
        id: "",
        category_id: null,
        description: "",
        offer_price: null,
        price: "",
        sku: "",
        stock: 0,
        variants: [],
        images: [],
      }}
      onSave={createProduct}
    />
  );
};

export default AdminProductsCreate;
