import Layout from "@/components/layout/Layout"
import { api } from "@/utils/api";
import { ReactElement } from "react";
import Footer from "@/components/commonItems/Footer";
import Header from "@/components/home/Header";
import Introduction from "@/components/home/Introduction";
import Image from "next/image";
import { TopClients } from "@/components/home/top-clients";
import Features from "@/components/home/feature";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Introduction />
        <Features/>    
        <TopClients />
        <div className="mt-44">

        <Footer />
        </div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout hideSidebar>{page}</Layout>;
};
