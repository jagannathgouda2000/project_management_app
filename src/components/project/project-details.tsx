import { api } from '@/utils/api';
import React from 'react'
import Header from '../commonItems/Header';

const ProjectDetails = ({ projectId }: { projectId: string }) => {
    const { data: projectData } = api.project.getProjectById.useQuery({ id: projectId });
    return (
        <>
            <Header title='Project Details' subtitle='View the details of the project.' />
            {!projectData && (
                <div className="text-center text-sm text-gray-400">
                    No project found.
                </div>
            )}
            {projectData && (
                <>
                    hello
                </>
            )}
        </>
    )
}

export default ProjectDetails
