import { CircleX } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const MOCK_USERS = [
  { name: "Jaga", email: "jaga@gmail.commmmmmmmmmmmm" },
  { name: "Jaga", email: "jaga@gmail1.com" },
  { name: "Jaga", email: "jaga@gmail2.com" },
  { name: "Jaga", email: "jaga@gmail3.com" },
];

const RemoveMember = ({ member }: { member: any }) => {
  const closePopupRef = useRef(null);

  async function handleRemoveMember() {
    //
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="ml-auto rounded-full text-red-500 dark:hover:bg-red-500 dark:hover:text-white">
          <CircleX className="w-6 min-w-6" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove{" "}
            <span className="text-red-500 underline decoration-red-500">
              {member.email}
            </span>{" "}
            ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel ref={closePopupRef}>Cancel</AlertDialogCancel>
          <Button variant={"destructive"} onClick={handleRemoveMember}>
            Remove
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const TeamMembers = () => {
  const { data } = useSession();
  const user = data?.user;
  const userImage = user?.image;
  //   const
  return (
    <div className="space-y-4">
      {MOCK_USERS.map((member) => {
        return (
          <div key={member.email} className="flex items-center gap-4 truncate">
            {userImage && (
              <Image
                src={userImage}
                alt={member.email}
                className="h-6 w-6 rounded-full md:h-12 md:w-12"
                width={48}
                height={48}
              />
            )}
            <div className="max-w-[200px]">
              <p>{member.name}</p>
              <p className="text-xs md:text-base">{member.email}</p>
            </div>
            <RemoveMember member={member} />
          </div>
        );
      })}
    </div>
  );
};

export default TeamMembers;
