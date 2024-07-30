"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
};

const SidebarItem = ({ label, iconSrc, href }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      className='justify-start h-[52px]'
      variant={active ? "sidebarOutline" : "sidebar"}
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          alt={label}
          width={32}
          height={32}
          className='mr-4'
        />
        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
