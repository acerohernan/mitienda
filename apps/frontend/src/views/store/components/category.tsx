import { IProductCategoryWithProducts } from "../types";
import ProductCategoryCard from "./category/card";
import ProductCard from "./product/card";

interface Props {
  category: IProductCategoryWithProducts;
}

const CategorySection: React.FC<Props> = ({ category }) => {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <ProductCategoryCard name={category.name} />
      {category.products && category.products.length > 0 && (
        <div className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 my-6 gap-6">
          {category.products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
