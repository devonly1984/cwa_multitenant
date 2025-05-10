"use client";
import { navbarItems, poppins } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import NavbarItem from "./NavbarItem";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import MobileSidebar from "./MobileSidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen,setIsSidebarOpen] = useState(false)
  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href="/" className="pl-6 flex items-center ">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          Fun Road
        </span>
      </Link>
      <MobileSidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        items={navbarItems}
      />
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>
      <div className="hidden lg:flex">
        <Button
          variant={"secondary"}
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
          asChild
        >
          <Link href="/sign-in">Login</Link>
        </Button>
        <Button
          variant={"secondary"}
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 transition-colors text-lg hover:text-black"
          asChild
        >
          <Link href="/sign-up">Start Selling</Link>
        </Button>
      </div>
      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant={"ghost"}
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
export default Navbar;
