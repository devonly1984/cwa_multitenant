"use client"
import useCart from "../checkout/store/useCart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
interface CartButtonProps {
    tenantSlug: string;
    productId:string;
    isPurchased?:boolean;
}
const CartButton = ({tenantSlug,productId,isPurchased}:CartButtonProps) => {
    const cart = useCart(tenantSlug)
      if (isPurchased) {
        return (
          <Button
            variant={"elevated"}
            asChild
            className="flex-1 font-medium bg-white"
          >
            <Link prefetch href={`/library/${productId}`}>
              View in Library
            </Link>
          </Button>
        );
      }
  return (
    <Button
      variant={"elevated"}
      className={cn(
        "flex-1 bg-pink-400",
        cart.isProductInCart(productId) && "bg-white"
      )}
      onClick={() => cart.toggleProducts(productId)}
    >
      {cart.isProductInCart(productId)
        ? "Remove from cart"
        : "Add to cart"}
    </Button>
  );
}

export default CartButton