import { ThemeToggleButton } from "@/components/theme-toggle-button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header(): React.JSX.Element {
  return (
    <div className="p-4 flex justify-between items-center">
      {/* left side */}
      <div className="flex items-end gap-2">
        <Link href="/" className="flex items-end gap-2">
          <Image src="/logo-192x192.png" width={28} height={28} alt="logo" />
          <h1 className="text-2xl leading-none">TreeGen</h1>
        </Link>
      </div>
      {/* right side */}
      <div className="flex items-center gap-2">
        <ThemeToggleButton />
        {/* <Button variant="outline">Sign In</Button> */}
      </div>
    </div>
  );
}
