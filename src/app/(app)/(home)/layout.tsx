import Footer from "@/components/home/footer/Footer";
import Navbar from "@/components/home/navbars/Navbar";
import { ReactNode } from "react"
interface Props {
    children: ReactNode
}
const HomeLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-[#F4F4F0]">{children}</main>
      <Footer />
    </div>
  );
};
export default HomeLayout