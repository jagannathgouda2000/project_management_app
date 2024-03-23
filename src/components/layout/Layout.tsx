import React from "react";
import Navbar from "../commonItems/NavBar";

const Layout = ({
  children,
  hideSidebar = false,
}: {
  children: React.ReactNode;
  hideSidebar?: boolean;
}) => {
  return (
    <div className="relative grid grid-cols-12 p-4 md:p-0">
      <Navbar />

      <div className="col-span-full md:col-span-10 md:col-start-2">
        <div className="pt-8 md:pt-14">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
