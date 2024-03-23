import React from "react";
import Sidebar from "@/components/commonItems/Sidebar";
import Navbar from "../commonItems/NavBar";

const Layout = ({
  children,
  hideSidebar = false,
}: {
  children: React.ReactNode;
  hideSidebar?: boolean;
}) => {
  return (
    <div className="relative flex flex-col">
      <Navbar />
      <div className="flex">
        <div className={`flex-shrink-0 ${hideSidebar ? "hidden" : ""}`}>
          <Sidebar />
        </div>
        <div className="grow">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
