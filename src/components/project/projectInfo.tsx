import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import Image from 'next/image'

const ProjectInfo = ({ title, description, members }: { title: string, description: string | null, members: any }) => {
    return (
        <Card className="flex w-1/2 m-2 pt-3">
            <CardContent className="font-medium">
                <div >
                    <p className='text-sm text-muted-foreground'>Title</p>
                    <p className="mb-2 text-lg">
                        {title}
                    </p>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className='text-lg'>
                        {description}
                    </p>
                        <p className='text-muted-foreground mt-2'>Project members :   </p>
                    {members.length > 0 && (
                        <div className="my-2 flex items-center gap-4">
                            {members.map((k: any) => {
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

                </div>
            </CardContent>
        </Card>
    )
}

export default ProjectInfo
