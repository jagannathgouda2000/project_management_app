import { api } from "@/utils/api";
import React from "react";
import Header from "../commonItems/Header";
import { Card, CardContent } from "../ui/card";
import ProjectInfo from "./projectInfo";
import { Button } from "../ui/button";
import AddTask from "../tasks/add-task";
import EditProject from './edit-project';
import TaskInfo from "../tasks/task-info";

const ProjectDetails = ({ projectId }: { projectId: string }) => {
    const { data: projectData, refetch } = api.project.getProjectById.useQuery({
        id: projectId,
    });
    return (
        <>
            <div className="mb-4 flex flex-col md:mb-8 md:flex-row md:items-center md:justify-between">
                <Header
                    title="Project Details"
                    subtitle="View the details of the project."
                />
                {projectData && (<div className="flex items-center gap-4">
                    <EditProject projectData={projectData} refetch={refetch} />
                    <AddTask project={projectData} refetch={refetch} />
                </div>)}
            </div>

            {!projectData && (
                <div className="mb-10 mt-4 text-center text-sm text-gray-400 md:mb-20">
                    No project found.
                </div>
            )}
            {projectData && (
                <div className="mb-10 mt-4 md:mb-20">
                    <ProjectInfo
                        title={projectData?.title}
                        description={projectData?.description}
                        members={projectData.members}
                    />
                    <div className="ml-2 mt-8">
                        <h1 className="text-2xl font-medium">Tasks</h1>
                        <p className="text-md font-medium text-gray-400">
                            Tasks in the projects
                        </p>
                    </div>
                    {projectData?.tasks.length > 0 && (
                        <div className="mt-5 grid md:grid-cols-2 grid-cols-1 gap-y-4 gap-x-8">
                            {projectData.tasks.map((task) => {
                                return (
                                    <TaskInfo
                                        task={task}
                                        refetch={refetch}
                                        project={projectData}
                                    />
                                )
                            })}
                        </div>
                    )}
                    {projectData?.tasks.length == 0 && (
                        <div className="mb-10 mt-4 text-center text-sm text-gray-400 md:mb-20">
                            No tasks found.
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ProjectDetails;
