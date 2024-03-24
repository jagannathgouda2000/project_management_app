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
import { Button } from "@/components/ui/button";
import { UserType } from "@/types/user";
import { toast } from "@/components/ui/use-toast";

const LoadingProfilePage = () => {
  return <div>{/*  */}</div>;
};

const Profile = () => {
  const { data, status } = useSession();
  const isLoadingSession = status === "loading";

  const userData = data?.user;
  const userName = userData?.name;
  const userEmail = userData?.email;

  const [name, setName] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const userUpdateMutation = api.profile.updateUser.useMutation();

  useEffect(() => {
    if (userName) {
      setName(userName);
    }
  }, [userName]);

  const updateUser = async (name: string) => {
    if (!name) {
      toast({ title: "user name cant be empty." });
    }
    try {
      await userUpdateMutation.mutateAsync({ name: name.trim() });
      console.log("user updated successfully");
    } catch (err: any) {
      console.log(err, "err");
    } finally {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    console.log(data);
  }); 

  function handleProfileChanges() {
    if (!isEditing) return;
    if (name !== null) {
      updateUser(name);
    }
  }

  if (isLoadingSession) return <LoadingProfilePage />;
  if (!userName || !userEmail) return <UserNotFound />;

  return (
    <div>
      <div className="mb-4 flex flex-col md:mb-8 md:flex-row md:items-center md:justify-between">
        <Header title={"Profile"} subtitle={"Manage your profile settings."} />
        {isEditing ? (
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                if (userName) {
                  setName(userName);
                  setIsEditing(false);
                }
              }}
              className="grow px-8 md:grow-0"
            >
              <span className="font-bold">Cancel</span>
            </Button>
            <Button
              onClick={handleProfileChanges}
              className="grow px-8 md:grow-0"
            >
              <span className="font-bold">Save</span>
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
            className="px-8"
          >
            <span className="font-bold">Edit</span>
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <Label>
          <p className="ml-3 pb-2">Name</p>
          <Input
            type="text"
            className={cn(
              isEditing ? "" : "border-0 focus-visible:ring-transparent",
            )}
            readOnly={!isEditing}
            value={name ?? ""}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Label>
        <Label>
          <p className="ml-3 pb-2">Email</p>
          <Input
            type="text"
            className={cn("border-0 focus-visible:ring-transparent")}
            readOnly
            value={userEmail}
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
