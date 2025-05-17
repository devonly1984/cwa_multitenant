import { DEFAULT_LIMIT } from "@/constants";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductListSkeleton = () => {
  return (
    <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
export default ProductListSkeleton