import Header from "@/components/commonItems/Header";
import UserNotFound from "@/components/commonItems/UserNotFound";
import Layout from "@/components/layout/Layout";
import ManageTeam from "@/components/team/manage-team";
import { getServerAuthSession } from "@/server/auth";
import { UserType } from "@/types/user";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import React, { ReactElement } from "react";

const LoadingPage = () => {
  return <div>Loading</div>;
};

const Team = () => {
  const { data, status } = useSession();

  const user = data?.user;
  const userName = user?.name;
  const userEmail = user?.email;
  const userId = user?.id;
  const userExists = user && userName && userEmail && userId;

  const isLoadingUser = status === "loading";
  if (isLoadingUser) return <LoadingPage />;
  if (!isLoadingUser && !user) return <UserNotFound />;
  return (
    <div>
      <Header title={"Colaborations"} subtitle={"Manage your team."} />
      {userExists && (
        <ManageTeam userName={userName} userEmail={userEmail} userId={userId} />
      )}
    </div>
  );
};

Team.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// export async function getServerSideProps({
//     req,
//     res,
// }: {
//     req: GetServerSidePropsContext["req"];
//     res: GetServerSidePropsContext["res"];
// }) {
//     const session = await getServerAuthSession({
//         req,
//         res,
//     });
//     return {
//         props: { user: session?.user ?? null }, // Will be passed to the page component as props
//     };
// }

export default Team;
