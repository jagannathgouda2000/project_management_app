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

const AddTask = () => {
  const [task, setTask] = useState(initTaskState);

  function resetForm() {
    setTask(initTaskState);
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
            <Input type="text" placeholder="Add a title" />
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
        </div>
        <div className="">
          <Label>
            Description
            <Input type="text" placeholder="Add a description" />
          </Label>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Create Task</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddTask;
