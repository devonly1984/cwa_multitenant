import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";

const NavbarSkeleton = () => {
  return (
    <div className="h-20 border-b font-medium bg-white">
      <div className=" max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <div />
        <Button className="bg-white" disabled>
          <ShoppingCartIcon className="text-black" />
        </Button>
      </div>
    </div>
  );
}
export default NavbarSkeleton