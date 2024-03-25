import { api } from '@/utils/api';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import AddProjectMembers from './add-project-member';
import { toast } from '../ui/use-toast';

const EditProject = ({ projectData, refetch }: { projectData: any, refetch:any }) => {
    const updateProjectDetailsMutation = api.project.updateProject.useMutation();
    const [project, setProject] = useState<any>()

    useEffect(() => {
        setProject({ title: projectData?.title, description: projectData?.description, members: projectData?.members })
    }, [projectData])
    function resetProject() {
        setProject({ title: projectData.title, description: projectData.description, members: projectData.members })
    }
    async function handleUpdateProject() {
        if (!project.title || !project.description) return;
        await updateProjectDetailsMutation
            .mutateAsync({
                id: projectData.id,
                title: project.title.trim(),
                description: project.description.trim(),
                members: project.members.map((k: any) => k.id),
            })
            .then((res: any) => {
                toast({ title: "Project Updated." });
            })
            .catch((err: any) => {
                toast({
                    title: "Unexpected error",
                    description: err.message,
                    variant: "destructive",
                });
            }).finally(()=>{
                refetch()
            })

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
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button onClick={resetProject} variant="secondary">
                    Edit Project
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit Project</AlertDialogTitle>
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
                    <AlertDialogAction onClick={handleUpdateProject}>
                        Update Project
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default EditProject
