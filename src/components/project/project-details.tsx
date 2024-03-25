import { api } from '@/utils/api';
import React from 'react'
import Header from '../commonItems/Header';
import { Card, CardContent } from '../ui/card';
import ProjectInfo from './projectInfo';
import { Button } from '../ui/button';
import EditProject from './edit-project';

const ProjectDetails = ({ projectId }: { projectId: string }) => {
    const { data: projectData, isLoading,refetch } = api.project.getProjectById.useQuery({ id: projectId });
    if(isLoading) return <p>Loading.....</p>
    return (
        <>
            <div className="mb-4 flex flex-col md:mb-8 md:flex-row md:items-center md:justify-between">
                <Header title='Project Details' subtitle='View the details of the project.' />
                <div className="flex items-center gap-4">
                    <EditProject projectData={projectData} refetch={refetch}/>
                    <Button
                        //onClick={handleProfileChanges}
                        className="grow px-8 md:grow-0"
                    >
                        <span className="font-bold">Add Task</span>
                    </Button>
                </div>
            </div>

            {!projectData && (
                <div className="mb-10 mt-4 md:mb-20 text-center text-sm text-gray-400">
                    No project found.
                </div>
            )}
            {projectData && (
                <div className='mb-10 mt-4 md:mb-20'>
                    <ProjectInfo title={projectData?.title} description={projectData?.description} members={projectData.members} />
                    <div>
                        <h1 className="mb-2 text-2xl font-medium">Tasks</h1>
                        <p className="text-md font-medium text-gray-400">Tasks in the projects</p>
                    </div>
                    {projectData?.tasks.length > 0 && (
                        <>
                            {projectData.tasks.map((task) => {
                                return (
                                    <p>hello</p>
                                )
                            })}
                        </>
                    )}
                    {projectData?.tasks.length == 0 && (
                        <div className="mb-10 mt-4 md:mb-20 text-center text-sm text-gray-400">
                            No tasks found.
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default ProjectDetails
