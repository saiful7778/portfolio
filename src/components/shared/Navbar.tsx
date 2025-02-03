"use client";
import { forwardRef } from "react";
import SiteLogo from "../SiteLogo";
import Link from "next/link";
import { cn } from "@/lib/shadcn/utils";
import { navLinks } from "@/lib/staticData";
import { usePathname } from "next/navigation";
import { Button } from "../shadcn/ui/button";
import { RightArrowIcon1 } from "@/assets/icons";

const Navbar: React.FC = () => {
  return (
    <div className="absolute left-0 top-0 z-50 w-full">
      <nav className="container my-4 flex items-center justify-between gap-2">
        <SiteLogo />
        <ul className="flex items-center gap-8">
          {navLinks?.map((navLink, idx) => (
            <NavLink key={`nav-link-${idx}`} href={navLink.path}>
              {navLink.navName}
            </NavLink>
          ))}
        </ul>
        <Button className="group" asChild>
          <Link href="/contact-me">
            <span>Let{`'`}s talk</span>
            <span className="relative inline-flex -rotate-45 overflow-hidden fill-primary-foreground transition-colors duration-500 group-hover:fill-primary [&_svg]:w-[17px] [&_svg]:transition-transform [&_svg]:duration-500">
              <RightArrowIcon1 className="group-hover:translate-x-[150%]" />
              <RightArrowIcon1 className="absolute -translate-x-[150%] group-hover:translate-x-0" />
            </span>
          </Link>
        </Button>
      </nav>
    </div>
  );
};

interface NavLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ children, className, href, ...props }, ref) => {
    const pathname = usePathname();
    return (
      <li>
        <Link
          href={href}
          className={cn(
            "text-lg font-semibold capitalize transition-colors duration-300",
            pathname === href ? "text-accent" : "hover:text-accent",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Link>
      </li>
    );
  }
);
NavLink.displayName = "NavLink";

export default Navbar;
