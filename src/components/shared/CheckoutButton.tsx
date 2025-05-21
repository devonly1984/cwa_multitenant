"use client"
import useCart from '@/components/checkout/store/useCart'
import {cn,generateTenantUrl} from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ShoppingCartIcon } from 'lucide-react';
interface CheckoutButtonProps{
    className?:string;
    hideIfEmpty?:boolean;
    tenantSlug:string;
}
const CheckoutButton = ({
  className,
  hideIfEmpty,
  tenantSlug,
}: CheckoutButtonProps) => {
    const {totalItems} = useCart(tenantSlug);
    if (hideIfEmpty && totalItems ===0) return null;
  return (
    <Button
      variant={"elevated"}
      asChild
      className={cn("bg-white", className)}
    >
      <ShoppingCartIcon /> {totalItems > 0 ? totalItems : ""}
      <Link href={`${generateTenantUrl(tenantSlug)}/checkout`}></Link>
    </Button>
  );
};
export default CheckoutButton