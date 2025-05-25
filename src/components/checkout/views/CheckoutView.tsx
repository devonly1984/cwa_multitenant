"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import useCart from "../store/useCart";
import { useEffect } from "react";
import {toast} from 'sonner';
import { generateTenantUrl } from "@/lib/utils";
import CheckoutItem from "../shared/CheckoutItem";
import CheckoutSidebar from "../shared/CheckoutSidebar";
import { InboxIcon, LoaderIcon } from "lucide-react";
import { useCheckoutStates } from "@/hooks/useCheckoutStates";
import { useRouter } from "next/navigation";
interface CheckoutPageViewProps {
  tenantSlug: string;
}
const CheckoutView = ({ tenantSlug }: CheckoutPageViewProps) => {
  const router = useRouter();
  const [states,setStates] = useCheckoutStates();
    const { productIds, clearAllCarts, removeProduct, clearCart } =
      useCart(tenantSlug);
    const trpc = useTRPC();
    const { data,error,isLoading } = useQuery(
      trpc.checkout.getProducts.queryOptions({
        ids: productIds,
      })
    );
    const purchase = useMutation(
      trpc.checkout.purchase.mutationOptions({
        onMutate: () => {
          setStates({ success: false, cancel: false });
        },
        onSuccess: (data) => {  
          window.location.href=data.url
        },
        onError: (error) => {
          if (error.data?.code === "UNAUTHORIZED") {
            router.push("/sign-in");
          }
          toast.error(error.message);
        },
      })
    );
    useEffect(() => {
      if (states.success) {
        setStates({ success: false, cancel: false });
        clearCart();
        router.push(`/products`);
      }
    }, [states.success, clearCart, router, setStates]);
    useEffect(() => {
      if (!error) return;
      if (error?.data?.code === "NOT_FOUND") {
        clearAllCarts();
        toast.warning("Invalid products found, cart cleared");
      }
    }, [error, clearAllCarts]);

    if (isLoading) {
      return (
        <div className="lg:pt-16 pt-4 px-4 lg:px-12">
          <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
            <LoaderIcon className="text-muted-foreground animate-spin" />
          </div>
        </div>
      );
    }
    if (data?.totalDocs === 0) {
      return (
        <div className="lg:pt-16 pt-4 px-4 lg:px-12">
          <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
            <InboxIcon className="" />
            <p className="text-base font-medium">No Products Found</p>
          </div>
        </div>
      );
    }
  return (
    <div className="lg:pt-16 pt-4 px-4 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="border rounded-md overflow-hidden bg-white">
            {data?.docs.map((product, index) => (
              <CheckoutItem
                key={product.id}
                isLast={index === data.docs.length - 1}
                imageUrl={product.image?.url}
                name={product.name}
                productUrl={`${generateTenantUrl(product.tenant.slug)}/products/${product.id}`}
                tenantUrl={generateTenantUrl(product.tenant.slug)}
                tenantName={product.tenant.name}
                price={product.price}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <CheckoutSidebar
            total={data?.totalPrice || 0}
            onPurchase={() => purchase.mutate({ tenantSlug, productIds })}
            isCancelled={states.cancel}
            disabled={purchase.isPending}
          />
        </div>
      </div>
    </div>
  );
};
export default CheckoutView;
