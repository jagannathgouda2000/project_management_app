import { api } from "@/utils/api";
import { format } from "date-fns";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { Toggle } from "../ui/toggle";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ArrowDownToLine, Send } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import LoadingList from "../commonItems/LoadingList";

const LoadingMemberRequests = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((k, i) => {
        return <Skeleton key={i} className="h-20" />;
      })}
    </div>
  );
};

const ErrorFetchingData = () => {
  return <div>Error fetching data</div>;
};

const MemberRequestDialog = ({
  title = "",
  memberEmail = "",
  triggerVariant = "default",
  handleClick = () => {},
}: {
  title: string;
  memberEmail: string;
  triggerVariant?: "default" | "destructive";
  handleClick: () => void;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={triggerVariant}>{title}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title} request from{" "}
            <span className="underline underline-offset-4">{memberEmail}</span>{" "}
            ?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>{title}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const MemberRequests = () => {
  const {
    data: memberRequests,
    isLoading,
    isError,
    refetch,
  } = api.members.getPendingRequest.useQuery();

  const respondMemberRequestMutation =
    api.members.sendConnectionResponse.useMutation();

  async function handleMemberRequest(reqId: string, response: boolean) {
    await respondMemberRequestMutation
      .mutateAsync({ response, reqId })
      .then((res) => {
        toast({
          title: `Request ${response ? "accepted" : "rejected"}`,
        });
      })
      .catch((err: any) => {
        toast({
          title: "Unexpected error",
          description: err.message ?? "",
          variant: "destructive",
        });
      })
      .finally(() => {
        refetch();
      });
  }

  const [showRejectedRequests, setShowRejectedRequests] = useState(false);

  if (isLoading) return <LoadingList />;
  if (!memberRequests) return <ErrorFetchingData />;
  const formattedRequests = memberRequests
    .filter((k) => {
      if (showRejectedRequests) return true;

      return k.status !== "rejected";
    })
    .sort((a, b) => {
      if (a.status === "pending") {
        return -1;
      } else return 1;
    });
  return (
    <div>
      <div className="mb-4">
        {/* <div className="flex items-center space-x-2">
          <Label htmlFor="rejected-requests">Show rejected </Label>
          <Switch id="rejected-requests" />
        </div> */}
      </div>
      <div className="space-y-4">
        {formattedRequests.length > 0 ? (
          formattedRequests.map((k) => {
            const isSentRequest = !k.received;
            const member = isSentRequest ? k.to : k.from;
            const memberEmail = member.email!;
            return (
              <Card
                key={k.id}
                className="rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      {isSentRequest ? (
                        <Send className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDownToLine className="h-5 w-5" />
                      )}
                      <div className="text-xs">
                        {format(k.updatedAt, "dd MMM, yyyy | HH:mm")}
                      </div>
                    </div>
                    <Badge
                      variant={
                        k.status === "rejected" ? "destructive" : "default"
                      }
                    >
                      {k.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    {isSentRequest
                      ? `Request sent to ${k.to.email}`
                      : `Request received from ${k.from.email}`}
                  </div>
                  {!isSentRequest && (
                    <CardFooter className="flex justify-end space-x-4 p-0 pt-4">
                      <MemberRequestDialog
                        title="Reject"
                        memberEmail={memberEmail}
                        triggerVariant="destructive"
                        handleClick={() => {
                          handleMemberRequest(k.id, false);
                        }}
                      />
                      <MemberRequestDialog
                        title="Accept"
                        memberEmail={memberEmail}
                        triggerVariant="default"
                        handleClick={() => {
                          handleMemberRequest(k.id, true);
                        }}
                      />
                    </CardFooter>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center text-sm text-gray-400">
            No requests sent / received .
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberRequests;
