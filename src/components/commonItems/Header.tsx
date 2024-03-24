import React from "react";

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div>
      <h1 className="mb-2 text-5xl font-medium">{title}</h1>
      <p className="text-lg font-medium text-gray-400">{subtitle}</p>
    </div>
  );
};

export default Header;
