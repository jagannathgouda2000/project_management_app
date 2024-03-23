import UserNotFound from "@/components/commonItems/UserNotFound";
import Layout from "@/components/layout/Layout";
import { getServerAuthSession } from "@/server/auth";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { ReactElement } from "react";

const Dashboard = () => {
  const { data } = useSession();
  console.log(data);
  if (!data) return <UserNotFound />;
  return <div className="">dashboard</div>;
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
