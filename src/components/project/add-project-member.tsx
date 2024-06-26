import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { api } from "@/utils/api";
import { cn } from "@/lib/utils";
import useOutsideClick from "@/hooks/use-outside-click";
import { Check, PlusCircle } from "lucide-react";

const AddProjectMembers = ({
  project,
  updateSelectedProjectMembers,
  task,
  members
}: {
  project: any;
  updateSelectedProjectMembers: any;
  task?: boolean;
  members?: any[]
}) => {
  const isForNewProject = !project.id;
  const [showMembersList, setShowMembersList] = useState(false);
  const selectProjectMembersRef = useRef(null);
  useOutsideClick({
    ref: selectProjectMembersRef,
    callback: () => {
      setShowMembersList(false);
    },
  });
  const {
    data: allTeamMembers,
    isLoading,
    refetch,
    isError,
  } = api.members.getConnections.useQuery();

  return (
    <div className="flex items-center gap-4">
      <Label>{`Select ${task ? "Task" : "Project"} Members ( ${task ? project?.assignedTo.length : project?.members?.length} )`}</Label>

      <div ref={selectProjectMembersRef} className="relative">
        <button
          onClick={() => {
            setShowMembersList(true);
          }}
          className=""
        >
          <PlusCircle />
        </button>
        <div
          className={cn(
            showMembersList ? "" : "hidden",
            "absolute -left-20 min-w-[300px] rounded-b-lg bg-gray-700 p-2",
          )}
        >
          {!task && allTeamMembers?.map((k) => {
            const isSelectedMember = project?.members?.find(
              (l: any) => l.id === k.member.id,
            );
            return (
              <div
                onClick={() => {
                  updateSelectedProjectMembers(k.member);
                }}
                className={cn(
                  "flex cursor-pointer items-center gap-4 p-2 hover:bg-gray-600",
                  isSelectedMember ? "bg-gray-600" : "",
                )}
              >
                <Image
                  key={k.id}
                  alt=""
                  width={48}
                  height={48}
                  src={k.member.image!}
                  className="h-8 w-8 rounded-full"
                />
                <div className="flex w-full items-center justify-between gap-4">
                  <div className="">
                    <p>{k.member.name}</p>
                    <p className="text-xs">{k.member.email}</p>
                  </div>
                  {isSelectedMember && <Check />}
                </div>
              </div>
            );
          })}
          {task && members?.map((k) => {
            const isSelectedMember = project?.assignedTo?.find(
              (l: any) => l.id === k.id,
            );
            return (
              <div
                onClick={() => {
                  updateSelectedProjectMembers(k);
                }}
                className={cn(
                  "flex cursor-pointer items-center gap-4 p-2 hover:bg-gray-600",
                  isSelectedMember ? "bg-gray-600" : "",
                )}
                key={k.id}
              >
                <Image
                  key={k.id}
                  alt=""
                  width={48}
                  height={48}
                  src={k.image!}
                  className="h-8 w-8 rounded-full"
                />
                <div className="flex w-full items-center justify-between gap-4">
                  <div className="">
                    <p>{k.name}</p>
                    <p className="text-xs">{k.email}</p>
                  </div>
                  {isSelectedMember && <Check />}
                </div>
              </div>
            );
          })}

        </div>
      </div>
      <div className="my-4 flex items-center gap-4">
        {!task && project?.members?.map((k: any) => {
          return (
            <TooltipProvider key={k.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    alt=""
                    width={48}
                    height={48}
                    src={k.image}
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
        {task && project?.assignedTo?.map((k: any) => {
          return (
            <TooltipProvider key={k.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    alt=""
                    width={48}
                    height={48}
                    src={k.image}
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
  );
};

export default AddProjectMembers;
