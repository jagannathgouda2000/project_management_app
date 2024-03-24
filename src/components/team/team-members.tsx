import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { CircleX } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef } from "react";
import { toast } from "../ui/use-toast";
import LoadingList from "../commonItems/LoadingList";

const RemoveMember = ({
  member,
  reqId,
  refetchMembers,
}: {
  member: any;
  reqId: string;
  refetchMembers: () => void;
}) => {
  const closePopupRef = useRef<null | HTMLButtonElement>(null);
  const removeMemberMutation = api.members.deleteConnection.useMutation();

  async function handleRemoveMember() {
    await removeMemberMutation
      .mutateAsync({ reqId })
      .then((res) => {
        toast({ title: "Removed member successfully" });
      })
      .catch((err: any) => {
        toast({
          title: "Unexpected error",
          description: err.message ?? "",
          variant: "destructive",
        });
      })
      .finally(() => {
        refetchMembers();
        closePopupRef.current?.click();
      });
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

  const {
    data: teamMembers,
    isLoading,
    refetch,
    isError,
  } = api.members.getConnections.useQuery(undefined, {
    enabled: !!user,
  });
  //   const
  if (isLoading) return <LoadingList />;
  if (isError) return <div>Error fetching data</div>;

  const showTeamMembers = teamMembers && teamMembers?.length > 0;
  return (
    <div className="space-y-4">
      {showTeamMembers ? (
        teamMembers.map((k) => {
          const member = k.member;
          return (
            <div key={k.id} className="flex items-center gap-4 truncate">
              {member.image && (
                <Image
                  src={member.image}
                  alt={member.email!}
                  className="h-6 w-6 rounded-full md:h-12 md:w-12"
                  width={48}
                  height={48}
                />
              )}
              <div className="max-w-[200px]">
                <p>{member.name}</p>
                <p className="text-xs md:text-base">{member.email}</p>
              </div>
              <RemoveMember
                member={member}
                reqId={k.id}
                refetchMembers={() => {
                  refetch();
                }}
              />
            </div>
          );
        })
      ) : (
        <div className="text-center text-sm text-gray-400">
          <div>No members found</div>
          <div>Add a member to view here.</div>
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
