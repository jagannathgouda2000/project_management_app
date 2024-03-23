import Layout from "@/components/layout/Layout"
import { api } from "@/utils/api";
import { ReactElement } from "react";
import Footer from "@/components/commonItems/Footer";
import Header from "@/components/home/Header";
import Introduction from "@/components/home/Introduction";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Introduction />
        <Footer />
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout hideSidebar>{page}</Layout>;
};
