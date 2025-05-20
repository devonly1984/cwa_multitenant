import Link from "next/link";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
   const footerPoppins = Poppins({
        subsets: ['latin'],
        weight: ['700']
    })
const TenantFooter = () => {
 
  return (
    <footer className=" border-t  font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex items-center h-full px-4 lg:px-12 gap-2 py-6">
        <p className="">
          Powered by
          <Link href="/">
            <span
              className={cn(
                "text-2xl font-semibold",
                footerPoppins.className
              )}
            >
              funroad
            </span>
          </Link>
        </p>
      </div>
    </footer>
  );
}
export default TenantFooter