"use client";
import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatAsCurrency } from "@/lib/utils";
interface Props {
  minPrice?: string | null;
  maxPrice?: string | null;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}
const PriceFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">Minimum Price</Label>
        <Input
          type="text"
          placeholder="$0"
          value={minPrice ? formatAsCurrency(minPrice) : ""}
          onChange={() => {}}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">Maximum Price</Label>
        <Input
          type="text"
          placeholder="&infini;"
          value={maxPrice ? formatAsCurrency(maxPrice) : ""}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};
export default PriceFilter