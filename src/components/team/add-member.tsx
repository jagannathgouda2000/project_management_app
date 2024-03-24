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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { api } from "@/utils/api";
import { useState } from "react";
import { toast } from "../ui/use-toast";

export function AddMember() {
  const [email, setEmail] = useState("");
  const sendConnectionRequestMutation = api.members.sendRequest.useMutation();

  async function handleAddMember() {
    if (!email) return;

    await sendConnectionRequestMutation
      .mutateAsync({
        email: email.toLowerCase().trim(),
      })
      .then((res: any) => {
        console.log(res);
        toast({ title: "Request sent successfully" });
      })
      .catch((err: any) => {
        console.log(err);
        toast({
          title: "Unexpected error",
          description: err.message,
          variant: "destructive",
        });
      });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">Add Member</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a team member.</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="my-4">
          <Label>
            Email
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="member-email@example.com"
            />
          </Label>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAddMember}>
            Add member
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
