import React from "react";
import { Sidebar } from "./Sidebar";

interface MainProps {
  children: React.ReactNode;
}

export const Layout = (props: MainProps) => {
  return (
    <>
      <div className="flex">
        <Sidebar></Sidebar>
        <main className="w-4/5">{props.children}</main>
      </div>
    </>
  );
};
