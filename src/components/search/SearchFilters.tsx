"use client";
import { Categories, SearchInput } from "@/components";
import { DEFAULT_BG_COLOR } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import BreadcrumbNavigation from "../home/navbars/BreadcrumbNavigation";

const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.categories.getMany.queryOptions()
  );
  const params = useParams();
  const catgoryParam = params.category as string | undefined
  const activeCategory = catgoryParam ||'all';
  const activeCategoryData = data.find(
    (cat) => cat.slug === activeCategory
  );
  const activeCategoryColor =
    activeCategoryData?.color || DEFAULT_BG_COLOR;
    const activeCategoryName = activeCategoryData?.name || null;
    const activeSubcategory = params.subcategory as string | undefined;
    const activeSubcategoryName =
      activeCategoryData?.subcategories?.find(
        (subcat) => subcat.slug === activeSubcategory
      )?.name || null;
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{
        backgroundColor: activeCategoryColor,
      }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
      <BreadcrumbNavigation
        activeCategory={activeCategory}
        activeCategoryName={activeCategoryName}
        activeSubcategoryName={activeSubcategoryName}
      />
    </div>
  );
};
export default SearchFilters;
