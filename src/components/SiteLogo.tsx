import { cn } from "@/lib/shadcn/utils";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";
import siteLogo from "@/assets/images/saiful-islam.png";

const SiteLogo = forwardRef<
  HTMLAnchorElement,
  React.HTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <Link
    ref={ref}
    href="/"
    className={cn("inline-flex items-center justify-center gap-2", className)}
    {...props}
  >
    <Image
      src={siteLogo}
      width={45}
      height={45}
      alt="Saiful Islam portfolio site logo"
    />
    <span className="flex flex-col text-lg font-bold uppercase leading-none">
      <span>Saiful</span>
      <span className="text-primary">Islam</span>
    </span>
  </Link>
));
SiteLogo.displayName = "SiteLogo";

export default SiteLogo;
