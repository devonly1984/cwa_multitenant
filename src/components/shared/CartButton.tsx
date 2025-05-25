"use client"
import useCart from "../checkout/store/useCart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface CartButtonProps {
    tenantSlug: string;
    productId:string;
}
const CartButton = ({tenantSlug,productId}:CartButtonProps) => {
    const cart = useCart(tenantSlug)
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