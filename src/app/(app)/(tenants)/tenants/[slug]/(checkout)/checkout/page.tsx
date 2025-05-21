import CheckoutPageView from "@/components/checkout/views/CheckoutPageView";

interface CheckoutPageProps {
    params: Promise<{slug:string}>;
}
const CheckoutPage = async ({params}:CheckoutPageProps) => {
    const {slug} = await params;
  return <CheckoutPageView tenantSlug={slug} />;
};
export default CheckoutPage;
