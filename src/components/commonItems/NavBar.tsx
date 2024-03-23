import Link from "next/link";
import { UserMenu } from "./UserMenu";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Login from "../Login";

// components/Navbar.tsx
export default function Navbar() {
    const { data } = useSession();
    const user = data?.user;
    return (
        <nav className="bg-primary py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <div className="flex gap-3"><Image src="/images/7.jpg" alt="logo" width={28} height={28} />
                        <p className="text-white text-xl font-bold">PM BUDDY</p>    </div>

                </Link>
                <Login />
                <UserMenu />
            </div>
        </nav>
    );
};


