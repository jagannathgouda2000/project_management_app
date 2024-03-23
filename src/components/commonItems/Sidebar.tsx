import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { NAV_ITEMS } from "@/lib/constants";

const Sidebar = () => {
    const { pathname } = useRouter();
    const noActivePaths = !NAV_ITEMS.find((item) => pathname.includes(item.link));

    return (
        <aside
            className={`customHeight sticky top-12 hidden bg-white md:flex md:w-52 md:flex-col md:justify-between`}
        >
            <nav>
                <ul className="my-8 space-y-2 px-4 text-sm">
                    {noActivePaths && (
                        <li className="rounded-full bg-brand-light px-4 py-1 text-center text-xs font-medium">
                            Quick Links
                        </li>
                    )}
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname.includes(item.link);
                        return (
                            <li key={item.label}>
                                <Link
                                    href={item.link}
                                    className={`block rounded-full px-4 py-2 text-center font-medium hover:text-cyan-300
                  ${isActive
                                            ? "bg-brand-light text-dark"
                                            : "text-gray-700"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar
