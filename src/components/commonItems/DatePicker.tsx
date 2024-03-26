import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import useOutsideClick from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const DatePicker = ({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: Date;
  onSelectDate: (x: Date) => void;
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const datePickerRef = useRef(null);
  useOutsideClick({
    ref: datePickerRef,
    callback: () => {
      //
      setShowCalendar(false);
    },
  });
  return (
    <div ref={datePickerRef} className="relative">
      <Button
        variant={"secondary"}
        onClick={() => {
          setShowCalendar((prev) => !prev);
        }}
        size={"sm"}
        className="relative w-44"
      >
        {format(selectedDate ?? new Date(), "dd MMM, yyyy")}
        <ChevronDown className="absolute right-4 h-4 w-4" />
      </Button>
      <Calendar
        mode="single"
        disabled={(e) => e < new Date()}
        selected={selectedDate ?? new Date()}
        onSelect={(e) => {
          if (e) {
            onSelectDate(e);
            setShowCalendar(false);
          }
        }}
        className={cn(
          "absolute z-10 rounded-md border bg-background",
          showCalendar ? "" : "hidden",
        )}
      />
    </div>
  );
};

export default DatePicker;
