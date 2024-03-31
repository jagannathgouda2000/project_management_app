import { WorkflowIcon } from 'lucide-react';
import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { format } from "date-fns";
import { useRouter } from 'next/router'



const Timelinepage = ({ taskData }: { taskData: any }) => {
    const router = useRouter()

    function navigateTo(link: string) {
        router.push(link)
    }

    return (
        <>
            <VerticalTimeline>
                <>
                    {taskData.map((task: any, i: any) => {
                        return (
                            <>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{ background: 'rgb(255, 255, 255)', color: '#000' }}
                                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                    //date={${format(task?.deadline, "dd MMMM yyyy")}}
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#000' }}
                                    icon={<WorkflowIcon />}
                                    key={i}
                                >
                                    <div onClick={() => navigateTo(`/project/${task.projectId}`)}>
                                        <h3 className="font-bold">{task.Project.title}</h3>
                                        <h4 className="">{task?.title}</h4>
                                        <p className='mt-0'>
                                            <span className='font-bold'>Description:</span>{task.description}
                                        </p>
                                        <p><span className='font-bold'>Status:</span> {task?.status}</p>
                                        <p><span className='font-bold'>Deadline:</span> {format(task?.deadline, "dd MMMM yyyy")}</p>
                                    </div>
                                </VerticalTimelineElement>
                            </>
                        )
                    })}
                    < VerticalTimelineElement
                        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                        icon={<WorkflowIcon />}
                    />
                </>
            </VerticalTimeline>

        </>

    )
}

export default Timelinepage