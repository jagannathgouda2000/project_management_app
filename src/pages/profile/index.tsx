import UserNotFound from "@/components/commonItems/UserNotFound";
import { getServerAuthSession } from "@/server/auth";
import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import React, { ReactElement, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Session } from "next-auth";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import Header from "@/components/commonItems/Header";

const LoadingProfilePage = () => {
  return <div>{/*  */}</div>;
};

const Profile = () => {
  const { data, status } = useSession();
  const isLoadingSession = status === "loading";

  const userData = data?.user;
  const [user, setUser] = useState<Session["user"] | null>(null);
  const [isEditing, setIsEditing] = useState(true);
  const userUpdateMutation = api.profile.updateUser.useMutation();
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  if (isLoadingSession) return <LoadingProfilePage />;
  if (!data) return <UserNotFound />;

  const updateUser = async(user:Session["user"]) => {
      if(!user?.name){
        console.log("user name cant be empty.")
      }
      try{
        await userUpdateMutation.mutateAsync({name: user.name!});
        console.log("user updated successfully")
      }catch(err:any){
        console.log(err,"err")
      }finally{
        setIsEditing(false)
      }
  }
  return (
    <div>
      <Header title={"Profile"} subtitle={"You can view and edit your profile here."} />
      <div className="flex flex-col gap-4">
        <Label>
          <p className="ml-3 pb-2">Name</p>
          <Input
            type="text"
            className={cn(
              isEditing ? "" : "border-0 focus-visible:ring-transparent",
            )}
            readOnly={!isEditing}
            value={user?.name || ""}
            onChange={(e) => {
                setUser((prev) => {
                  return {
                    ...prev,
                    name: e.target.value,
                  }
                });
            }}
          />
        </Label>
        <Label>
          <p className="ml-3 pb-2">Email</p>
          <Input
            type="text"
            readOnly={!isEditing}
            className=""
            value={user?.email || ""}
          />
        </Label>

      </div>
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// export async function getServerSideProps({
//   req,
//   res,
// }: {
//   req: GetServerSidePropsContext["req"];
//   res: GetServerSidePropsContext["res"];
// }) {
//   const session = await getServerAuthSession({
//     req,
//     res,
//   });
//   return {
//     props: { user: session?.user ?? null }, // Will be passed to the page component as props
//   };
// }

export default Profile;
