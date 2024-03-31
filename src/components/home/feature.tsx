import React from 'react'

const Features = () => {
    return (
        <div className='mt-28'>
            <div className='text-center text-4xl font-bold'>
                Features of PM BUDDY
            </div>
            <div className='my-32'>
                <div className="container sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8 mt-20">
                    <div className="">
                        <img className="inline" src="images/image4.svg" alt="alternative" />
                    </div>
                    <div className="mb-16 xl:ml-12 xl:text-left">
                        <h1 className="h1-large mb-5">Dashboard</h1>
                        <p className="p-large mb-8"> Our project management hub streamlines your workflow.  See all your projects in one place, accessible from anywhere. Collaborate effortlessly – assign tasks, share files, and chat with your team in real-time. Stay on top of deadlines, track progress, and boost team productivity. It's the centralized project solution you've been waiting for.  Free yourself from project chaos.</p>
                    </div>
                </div>
                <div className="container sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8 mt-20">
                    <div className="mb-16 xl:mr-12">
                        <h1 className="h1-large mb-5">Timeline</h1>
                        <p className="p-large mb-8">Visualize your workload with our intuitive timeline view. See all your assigned tasks across every project laid out in chronological order, with deadlines clearly marked. No more scrambling to remember what's due when.  This unified view helps you prioritize effectively and manage your time across projects.  Identify potential conflicts early on, ensuring smooth sailing towards project completion.  Take control of your workload and achieve more - all within a single, organized timeline.</p>
                    </div>
                    <div className="xl:text-right">
                        <img className="inline" src="images/image2.svg" alt="alternative" />
                    </div>
                </div>
                <div className="container sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8 mt-20">
                    <div className="">
                        <img className="inline" src="images/image1.svg" alt="alternative" />
                    </div>
                    <div className="mb-16 xl:ml-12 xl:text-left">
                        <h1 className="h1-large mb-5">Connections</h1>
                        <p className="p-large mb-8">PM BUDDY fosters collaboration within your organization. Connect with colleagues by sending quick invites.  Effortlessly add them to projects, streamlining communication and task assignment.  Break down silos and leverage the expertise of your entire organization.  Our platform facilitates easy collaboration, fostering a connected and productive work environment.  Build your network, empower your team, and achieve more together.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Features