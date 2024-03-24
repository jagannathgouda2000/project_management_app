import { api } from '@/utils/api';
import React from 'react'

const ProjectDetails = ({ projectId }: { projectId: string }) => {
    const { data: projectData } = api.project.getProjectById.useQuery({ id: projectId });
    if (!projectData) return (
        <div className="text-center text-sm text-gray-400">
            No data found.
        </div>
    )
    return (
        <div>
            hello
        </div>
    )
}

export default ProjectDetails
