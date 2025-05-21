"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import useCart from "../store/useCart";

interface CheckoutPageViewProps {
  tenantSlug: string;
}
const CheckoutPageView = ({ tenantSlug }: CheckoutPageViewProps) => {
    const {productIds} = useCart(tenantSlug);
    const trpc = useTRPC();
    const { data } = useQuery(
      trpc.checkout.getProducts.queryOptions({
        ids: productIds,
      })
    );
  return <div className="">{JSON.stringify(data, null, 2)}</div>;
};
export default CheckoutPageView;
