import React from 'react'
import { Card, CardContent } from '../ui/card'

const ProjectInfo = ({ title, description, members }: { title: string, description: string | null, members: any }) => {
    return (
        <Card className="flex w-1/2 m-2 pt-3">
            <CardContent className="">
                <div >
                    <p className="text-sm font-medium leading-none mb-2">
                        {title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProjectInfo
