import Link from "next/link";
import { UserMenu } from "./UserMenu";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Login from "../Login";
import { Rabbit } from "lucide-react";

// components/Navbar.tsx
export default function Navbar() {
  const { data } = useSession();
  const user = data?.user;
  return (
    <nav className="sticky top-4 z-10 col-span-10 col-start-2 flex h-[60px] w-full items-center justify-center rounded-full bg-white/30 px-4 py-2 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="flex gap-3">
            <Rabbit className="rounded-full text-white" />
            <p className="font-bold text-white">PM BUDDY</p>{" "}
          </div>
        </Link>
        <Login />
        <UserMenu />
      </div>
    </nav>
  );
}
