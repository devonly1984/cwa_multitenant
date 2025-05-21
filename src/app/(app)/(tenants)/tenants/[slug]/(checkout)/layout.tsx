import CheckoutNavbar from "@/components/checkout/navbars/CheckoutNavbar";
import TenantFooter from "@/components/tenants/footer/TenantFooter";
import { ReactNode } from "react";

interface CheckoutLayoutProps {
  children: ReactNode;
  params: Promise<{slug:string}>;
}
const CheckoutLayout = async ({
  children,
  params,
}: CheckoutLayoutProps) => {
  const { slug } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F4F0]">
      <CheckoutNavbar slug={slug} />

      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>
      <TenantFooter />
    </div>
  );
};
export default CheckoutLayout;