"use client"
//import CheckoutButton from "@/components/shared/CheckoutButton";
import { generateTenantUrl } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";


const CheckoutButton = dynamic(
  () => import("@/components/shared/CheckoutButton"),
  {
    ssr: false,
    loading: () => (
      <Button disabled className=" bg-white">
        <ShoppingCartIcon className="text-black" />
      </Button>
    ),
  }
);
interface TenantNavbarProps {
  slug:string;
}
const TenantNavbar = ({slug}:TenantNavbarProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    })
  );

  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <Link href={generateTenantUrl(slug)}>
          {data.image?.url && (
            <Image
              src={data.image.url}
              alt={slug}
              width={32}
              height={32}
              className="rounded-full border shrink-0 size-[32px]"
            />
          )}
          <p className="text-xl">{data?.name}</p>
        </Link>
        <CheckoutButton hideIfEmpty tenantSlug={slug} />
      </div>
    </nav>
  );
}
export default TenantNavbar