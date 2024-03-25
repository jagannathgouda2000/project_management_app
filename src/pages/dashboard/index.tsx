import Header from "@/components/commonItems/Header";
import UserNotFound from "@/components/commonItems/UserNotFound";
import Layout from "@/components/layout/Layout";
import AddProject from "@/components/project/add-project";
import { getServerAuthSession } from "@/server/auth";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { ReactElement } from "react";

const Dashboard = () => {
  const { data, status } = useSession();
  const isLoadingUser = status === "loading";
  if (isLoadingUser) return <div>Loading...</div>;
  if (!data) return <UserNotFound />;
  return (
    <div className="">
      <div className="mb-4 md:mb-10">
        <Header title="Dashboard" subtitle="" />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl">Projects</h2>
          <div className="text-gray-400">Manage your projects.</div>
        </div>
        <AddProject />
      </div>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps({
  req,
  res,
}: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) {
  const session = await getServerAuthSession({
    req,
    res,
  });
  return {
    props: { user: session?.user ?? null }, // Will be passed to the page component as props
  };
}

export default Dashboard;
