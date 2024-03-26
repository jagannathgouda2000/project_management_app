import React, { Children, useRef, useState } from "react";
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
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ChevronDown } from "lucide-react";
import useOutsideClick from "@/hooks/use-outside-click";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import DatePicker from "../commonItems/DatePicker";
import AddProjectMembers from "../project/add-project-member";
import { Project } from "@prisma/client";
import { api } from "@/utils/api";
import { toast } from "../ui/use-toast";

export const TASK_STATUS_OPTIONS = [
  "Not Started",
  "In Progress",
  "Review",
  "Done",
];

export const TASK_PRIORITY_OPTIONS = ["Low", "Medium", "High"];

const SingleSelectDropdown = ({
  title,
  selectedItem,
  dropdownItems,
  handleItemSelect,
}: {
  title: string;
  selectedItem: string;
  dropdownItems: string[];
  handleItemSelect: (x: string) => void;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  useOutsideClick({
    ref: dropdownRef,
    callback: () => {
      setShowDropdown(false);
    },
  });
  return (
    <div className="flex items-center gap-4">
      <p className="w-[100px] text-sm font-medium">{title}</p>
      <div ref={dropdownRef} className="relative">
        <Button
          variant={"secondary"}
          onClick={() => {
            setShowDropdown((prev) => !prev);
          }}
          className="relative w-44"
          size="sm"
        >
          {selectedItem} <ChevronDown className="absolute right-4 h-4 w-4" />
        </Button>
        {showDropdown && (
          <div className="absolute z-10 w-full rounded-b-lg bg-gray-600 py-2">
            {dropdownItems.map((k) => {
              return (
                <div
                  onClick={() => {
                    handleItemSelect(k);
                    setShowDropdown(false);
                  }}
                  className="cursor-pointer p-2 text-sm hover:bg-gray-700"
                >
                  {k}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const initTaskState = {
  title: "",
  description: "",
  status: "Not Started",
  priority: "Low",
  assignedTo: [],
  deadline: new Date(),
};

const AddTask = ({ project, refetch }: { project: any, refetch: () => void }) => {
  const [task, setTask] = useState(initTaskState);
  const addTaskMutation = api.task.createTask.useMutation();
  function resetForm() {
    setTask(initTaskState);
  }

  function updateSelectedProjectMembers(member: any) {
    if (task.assignedTo.find((k: any) => k.id === member.id)) {
      setTask((prev: any) => ({
        ...prev,
        assignedTo: prev.assignedTo.filter((k: any) => k.id !== member.id),
      }));
    } else {
      setTask((prev: any) => ({
        ...prev,
        assignedTo: [...prev.assignedTo, member],
      }));
    }
  }

  async function handleCreateTask() {
    console.log(task)
    if (!task.title || !task.description || task.assignedTo.length == 0) {
      toast({
        title: "Unexpected error",
        description: "Fill all required fields",
        variant: "destructive",
      });
      return
    };
    await addTaskMutation
      .mutateAsync({
        title: task.title.trim(),
        description: task.description.trim(),
        assignedTo: task.assignedTo.map((k: any) => k.id),
        deadline: task.deadline,
        priority: task.priority,
        status: task.status,
        projectId: project.id
      })
      .then((res: any) => {
        toast({ title: "Task Created." });
        console.log("done");
      })
      .catch((err: any) => {
        toast({
          title: "Unexpected error",
          description: err.message,
          variant: "destructive",
        });
      })
      .finally(() => {
        resetForm();
        refetch();
      });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => {
            resetForm();
          }}
        >
          Create Task
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Task</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="">
          <Label>
            Title
            <Input type="text" placeholder="Add a title" onChange={(e) => setTask((prev) => ({ ...prev, title: e.target.value }))} />
          </Label>
        </div>
        <div className="flex items-center gap-4">
          <p className="w-[100px] text-sm font-medium">Deadline</p>
          <DatePicker
            selectedDate={task.deadline ?? new Date()}
            onSelectDate={(k) => {
              setTask({ ...task, deadline: k });
            }}
          />
        </div>
        <SingleSelectDropdown
          title="Status"
          selectedItem={task.status}
          dropdownItems={TASK_STATUS_OPTIONS}
          handleItemSelect={(k) => {
            setTask((prev) => ({ ...prev, status: k }));
          }}
        />
        <SingleSelectDropdown
          title="Priority"
          selectedItem={task.priority}
          dropdownItems={TASK_PRIORITY_OPTIONS}
          handleItemSelect={(k) => {
            setTask((prev) => ({ ...prev, priority: k }));
          }}
        />

        <div>
          <p className="text-sm font-medium">Assigned To</p>
          <AddProjectMembers
            project={task}
            updateSelectedProjectMembers={updateSelectedProjectMembers}
            task={true}
            members={project.members}
          />
        </div>
        <div className="">
          <Label>
            Description
            <Input type="text" placeholder="Add a description" onChange={(e) => setTask((prev) => ({ ...prev, description: e.target.value }))} />
          </Label>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCreateTask}>Create Task</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddTask;
