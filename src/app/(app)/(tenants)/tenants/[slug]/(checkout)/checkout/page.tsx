import CheckoutView from "@/components/checkout/views/CheckoutView";

interface CheckoutPageProps {
    params: Promise<{slug:string}>;
}
const CheckoutPage = async ({params}:CheckoutPageProps) => {
    const {slug} = await params;
  return <CheckoutView tenantSlug={slug} />;
};
export default CheckoutPage;
