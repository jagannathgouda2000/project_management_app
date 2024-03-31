import Header from "@/components/commonItems/Header";
import UserNotFound from "@/components/commonItems/UserNotFound";
import Layout from "@/components/layout/Layout";
import AddProject from "@/components/project/add-project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/utils/api";
import { format } from "date-fns";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

const Dashboard = () => {
  const { data, status } = useSession();
  const isLoadingUser = status === "loading";
  const { data: projectsList, isLoading ,refetch } =
    api.project.getAllProjectDetails.useQuery();
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
        <AddProject refetch={refetch}/>
      </div>
      <div className="mt-8">
        {projectsList?.length === 0 ? (
          <div>No projects found.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projectsList?.map((k) => {
              return (
                <Link href={`project/${k.id}`}>
                  <Card key={k.id} className="hover:bg-gray-700">
                    <CardHeader>
                      <CardTitle>
                        <p>{k.title}</p>
                        <span className="text-xs">
                          {format(k.updatedAt, "dd MMM, yyyy | HH:mm")}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <p>{k.description}</p>
                        <p className="mb-2 mt-4 text-sm underline">Members</p>
                        <div className="flex items-center gap-4">
                          {k.members.map((k) => {
                            return (
                              <TooltipProvider key={k.id}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Image
                                      alt=""
                                      width={48}
                                      height={48}
                                      src={k.image!}
                                      className="h-8 w-8 rounded-full"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{k.email}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
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
