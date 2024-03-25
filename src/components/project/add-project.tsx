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
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import AddProjectMembers from "./add-project-member";
import { useSession } from "next-auth/react";

const defaultNewProjectState = { title: "", description: "", members: [] };

export default function AddProject() {
  const { data, status } = useSession();
  const userData = data?.user;

  const createProjectMutation = api.project.createProject.useMutation();

  const [project, setProject] = useState<any>(defaultNewProjectState);

  function setInitialProjectState() {
    if (userData) {
      if (project.members.find((k: any) => k.email === userData?.email)) return;

      setProject((prev: any) => ({
        title: "",
        description: "",
        members: [userData],
      }));
    }
  }

  function updateSelectedProjectMembers(member: any) {
    if (project.members.find((k: any) => k.id === member.id)) {
      setProject((prev: any) => ({
        ...prev,
        members: prev.members.filter((k: any) => k.id !== member.id),
      }));
    } else {
      setProject((prev: any) => ({
        ...prev,
        members: [...prev.members, member],
      }));
    }
  }

  useEffect(() => {
    setInitialProjectState();
  }, [userData]);

  async function handleCreateProject() {
    if (!project.title || !project.description) return;
    console.log("here");
    await createProjectMutation
      .mutateAsync({
        title: project.title.trim(),
        description: project.description.trim(),
        members: project.members.map((k: any) => k.id),
      })
      .then((res: any) => {
        toast({ title: "Project Created." });
      })
      .catch((err: any) => {
        toast({
          title: "Unexpected error",
          description: err.message,
          variant: "destructive",
        });
      })
      .finally(() => {
        setInitialProjectState();
      });
  }

  function resetProject() {
    setInitialProjectState();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button onClick={resetProject} variant="secondary">
          Add Project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Project</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="">
          <Label>
            Title
            <Input
              value={project?.title}
              onChange={(e) => {
                setProject((prev: any) => ({ ...prev, title: e.target.value }));
              }}
              type="text"
              placeholder="Add a title"
            />
          </Label>
        </div>
        <div className="">
          <Label>
            Description
            <Input
              onChange={(e) => {
                setProject((prev: any) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
              value={project?.description}
              type="text"
              placeholder="Add a description"
            />
          </Label>
        </div>
        <div>
          <AddProjectMembers
            project={project}
            updateSelectedProjectMembers={updateSelectedProjectMembers}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCreateProject}>
            Create Project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
