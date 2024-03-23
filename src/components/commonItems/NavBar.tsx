import Link from "next/link";
import { UserMenu } from "./UserMenu";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Login from "../Login";
import { Rabbit } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

// components/Navbar.tsx
export default function Navbar() {
  const { data } = useSession();
  const user = data?.user;
  return (
    <nav className="sticky top-4 z-10 col-span-full flex h-[60px] w-full items-center justify-center rounded-full bg-white/30 py-2 backdrop-blur-sm md:col-span-10 md:col-start-2 md:px-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="flex gap-3">
            <Rabbit className="rounded-full text-white" />
            <p className="font-bold ">PM BUDDY</p>{" "}
          </div>
        </Link>
        <div className="flex items-center justify-end gap-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="mr-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={item.link} key={item.label}>
                        <Icon />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            );
          })}
          <Login />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
