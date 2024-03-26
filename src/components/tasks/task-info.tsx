import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import Image from 'next/image'
import EditTask from './edit-task'
import { Button } from '../ui/button'
import { api } from '@/utils/api'
import { toast } from '../ui/use-toast'


const TaskInfo = ({ task, refetch, project }: { task: any, refetch: () => void, project: any }) => {
    const deleteTaskMutation = api.task.deleteTaskById.useMutation();

    async function deleteTask(id: string) {
        await deleteTaskMutation.mutateAsync({ id: id })
            .then(() => {
                toast({ title: "Task Deleted." });
                refetch();
            }).catch((err) => {
                toast({
                    title: "Unexpected error",
                    description: err.message,
                    variant: "destructive",
                });
            })
    }
    return (
        <Card className="w-full m-2 pt-3">
            <CardContent className="w-full">
                <div >
                    <p className="text-sm font-medium leading-none mb-2">
                        {task.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {task.description}
                    </p>

                    {task.assignedTo.length > 0 && (
                        <div className="my-2 flex items-center gap-4">
                            {task.assignedTo.map((k: any) => {
                                return (
                                    <TooltipProvider key={k.id}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Image
                                                    key={k.id}
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
                                )
                            })}
                        </div>
                    )}
                    <div className="flex justify-between mt-3">
                        <EditTask project={project} refetch={refetch} data={task} />
                        <Button onClick={() => deleteTask(task.id)}>Delete</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default TaskInfo
