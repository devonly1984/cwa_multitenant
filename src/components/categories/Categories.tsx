"use client"
import { useEffect, useRef, useState } from "react";
import {
  CategoryDropdown,
  CategoriesSidebar,
} from "@/components";
import { CategoriesGetManyOutput } from "@/types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import { useParams } from "next/navigation";

interface Props {
    data:CategoriesGetManyOutput;
}
const Categories = ({ data }: Props) => {
  const params = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(data.length)
const [isAnyHovered, setIsAnyHovered] = useState(false);
const [isSidebarOpen, setIsSidebarOpen] = useState(false)
const categoryParams = params.category as string;
const acitveCategory = categoryParams || "all";
const activeCategoryIndex = data.findIndex(
  (cat) => cat.slug === acitveCategory
);
const isActiveCategoryHidden =
  activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;
useEffect(() => {
  const calculateVisible = () => {
    if (
      !containerRef.current ||
      !measureRef.current ||
      !viewAllRef.current
    ) {
      return;
    }
    const containerWidth = containerRef.current.offsetWidth;
    const viewAllWidth = viewAllRef.current.offsetWidth;
    const availableWidth = containerWidth - viewAllWidth;
    const items = Array.from(measureRef.current.children);
    let totalWidth = 0;
    let visible = 0;
    for (const item of items) {
      const width = item.getBoundingClientRect().width;
      if (totalWidth + width > availableWidth) break;
      totalWidth += width;
      visible++;
    }
    setVisibleCount(visible);
  };
  const resizeObserver = new ResizeObserver(calculateVisible);
  resizeObserver.observe(containerRef.current!);
  return () => resizeObserver.disconnect();
}, [data.length]);
  return (
    <div className="relative w-full">
      <CategoriesSidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <div
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none flex"
        style={{ position: "fixed", top: -9999, left: -9999 }}
      >
        {data.map((category) => {
          return (
            <div key={category.id}>
              <CategoryDropdown
                category={category}
                isActive={acitveCategory === category.slug}
                isNavigationHovered={false}
              />
            </div>
          );
        })}
      </div>
      {/**Visible Items */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        className="flex flex-nowrap items-center"
      >
        {data.slice(0, visibleCount).map((category) => {
          return (
            <div key={category.id}>
              <CategoryDropdown
                category={category}
                isActive={acitveCategory === category.slug}
                isNavigationHovered={isAnyHovered}
              />
            </div>
          );
        })}
        <div className="shrink-0" ref={viewAllRef}>
          <Button
            variant={"elevated"}
            className={cn(
              "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
              isActiveCategoryHidden &&
                !isAnyHovered &&
                "bg-white border-primary"
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            View All
            <ListFilterIcon className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Categories