import { Poppins } from "next/font/google";
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});
export const navbarItems = [
  {
    href: "/",
    children: "Home",
  },
  {
    href: "/about",
    children: "About",
  },
  {
    href: "/features",
    children: "Features",
  },
  {
    href: "/pricing",
    children: "Pricing",
  },
  {
    href: "/contact",
    children: "Contact",
  },
];
export const DEFAULT_BG_COLOR = '#F5F5F5'