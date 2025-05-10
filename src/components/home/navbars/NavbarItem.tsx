
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import Link from "next/link";

import { ReactNode } from "react";
interface NavbarItemProps {
    href:string;
    children:ReactNode;
    isActive?:boolean;
}
const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      variant={"outline"}
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg ",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};
export default NavbarItem