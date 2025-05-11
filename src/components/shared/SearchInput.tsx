"use client";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { CustomCategory } from "@/types";
import { CategoriesSidebar } from "@/components/categories";
import { useState } from "react";
import { Button } from "../ui/button";

interface Props {
  disabled?: boolean;
  data: CustomCategory[];
}
const SearchInput = ({ disabled, data }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar
        data={data}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search products"
          disabled={disabled}
        />
      </div>
      {/**Todo Add Categories view all button */}
      <Button variant={"elevated"} className="size-12 shrink-0 flex lg:hidden"
      onClick={()=>setIsSidebarOpen(true)}>
        <ListFilterIcon className=""/>
      </Button>
      {/**Add Library Button */}
    </div>
  );
};
export default SearchInput;
