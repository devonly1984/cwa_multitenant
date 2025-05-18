import TenantFooter from "@/components/tenants/footer/TenantFooter";
import TenantNavbar from "@/components/tenants/navbars/TenantNavbar";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ReactNode } from "react"

interface TenantLayoutProps {
  children: ReactNode;
  params: Promise<{slug:string}>;
}
const Layout = async ({ children, params }: TenantLayoutProps) => {
  const { slug } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    })
  );
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F4F0]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TenantNavbar slug={slug} />
      </HydrationBoundary>
      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>
      <TenantFooter />
    </div>
  );
};
export default Layout;