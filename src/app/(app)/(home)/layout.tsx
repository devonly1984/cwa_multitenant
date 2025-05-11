import Footer from "@/components/home/footer/Footer";
import Navbar from "@/components/home/navbars/Navbar";
import { getPayload } from "payload";
import configPromise from '@payload-config'

import { ReactNode } from "react"
import SearchFilters from "@/components/shared/SearchFilters";
import { Category } from "@/payload-types";
import { CustomCategory } from "@/types";
interface Props {
    children: ReactNode
}
const HomeLayout = async ({ children }: Props) => {
    const payload = await getPayload({
    config: configPromise
  })
  const data = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: "name",
  });
  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category),
    })),
  }));
  

  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData}/>
      <main className="flex-1 bg-[#F4F4F0]">{children}</main>
      <Footer />
    </div>
  );
};
export default HomeLayout