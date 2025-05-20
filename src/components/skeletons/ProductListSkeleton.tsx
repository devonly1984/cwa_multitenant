import { DEFAULT_LIMIT } from "@/constants";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { cn } from "@/lib/utils";
interface Props {
  narrowView?:boolean;
}
const ProductListSkeleton = ({ narrowView }: Props) => {
  return (
    <div   className={cn(
              "grid gird-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
              narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
            )}>
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
export default ProductListSkeleton