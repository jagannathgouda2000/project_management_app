import { api } from '@/utils/api';
import React from 'react'
import Header from '../commonItems/Header';
import { Card, CardContent } from '../ui/card';
import ProjectInfo from './projectInfo';

const ProjectDetails = ({ projectId }: { projectId: string }) => {
    const { data: projectData } = api.project.getProjectById.useQuery({ id: projectId });
    console.log(projectData,"project data")
    return (
        <>
            <Header title='Project Details' subtitle='View the details of the project.' />
            {!projectData && (
                <div className="mb-10 mt-4 md:mb-20 text-center text-sm text-gray-400">
                    No project found.
                </div>
            )}
            {projectData && (
                <div className='mb-10 mt-4 md:mb-20'>
                    <ProjectInfo title={projectData?.title} description={projectData?.description} members={projectData.members} />
                    {projectData?.tasks.length > 0 && (
                        <>
                            <div>
                                <h1 className="mb-2 text-2xl font-medium">Tasks</h1>
                                <p className="text-md font-medium text-gray-400">Tasks in the projects</p>
                            </div>
                            {projectData.tasks.map((task) => {
                                return (
                                    <p>hello</p>
                                )
                            })}
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default ProjectDetails
