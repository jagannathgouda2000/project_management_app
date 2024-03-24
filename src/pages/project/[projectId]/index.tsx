import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Layout from '@/components/layout/Layout';
import ProjectDetails from '@/components/project/project-details';
const projectById = () => {
    const params = useParams();
    const projectId: any = params && params?.projectId
    if (!projectId) return <p>Loading.......</p>
    return (
        <ProjectDetails projectId={projectId} />
    )
}
projectById.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default projectById;


