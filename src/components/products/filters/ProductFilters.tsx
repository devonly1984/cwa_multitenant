"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import PriceFilter from "./PriceFilter";

interface ProductFiltersProps {
  title: string;
  className?: string;
  children: ReactNode;
}
const ProductFilter = ({title,className,children}:ProductFiltersProps)=>{
    const [isOpen, setIsOpen] = useState(false);
    const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;
    return (
      <div className={cn("p-4 border-b flex flex-col gap-4", className)}>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen((current) => !current)}
        >
          <p className="font-medium">{title}</p>
          <Icon className="size-5 " />
        </div>
        {isOpen && children}
      </div>
    );

}
const ProductFilters = () => {
  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p className="font-medium">Filters</p>
        <button className="underline" onClick={() => {}}>
          Clear
        </button>
      </div>
      <ProductFilter title="Price" className="border-b-0">
        <PriceFilter />
      </ProductFilter>
    </div>
  );
};
export default ProductFilters;
