import Header from "@/components/commonItems/Header";
import UserNotFound from "@/components/commonItems/UserNotFound";
import Layout from "@/components/layout/Layout";
import Timelinepage from "@/components/timeline/timeline";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/utils/api";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import React, { ReactElement } from "react";

const Timeline = () => {
  const { data } = useSession();
  const { data: taskData, isLoading } = api.task.getTaskByUserId.useQuery();
  if (!data) return <UserNotFound />;

  if (isLoading) return <p>Loading....</p>
  return (
    <>
      <Header title="Timeline" subtitle="Timeline of your tasks." />
      {taskData?.length == 0 && <div className="text-center">No tasks  found.</div>}
      {taskData && taskData.length > 0 && <Timelinepage taskData={taskData} />}

    </>
  )

};

Timeline.getLayout = function getLayout(page: ReactElement) {
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

export default Timeline;
