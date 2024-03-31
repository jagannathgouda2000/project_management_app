import React from 'react'

const Header = () => {
    return (
        <header id="header" className=" text-cente lg:text-left py-20">
            <div className="container sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
                <div className="mb-16 lg:mt-20 xl:mt-32 xl:mr-12">
                    <h1 className="h1-large mb-5">Team management mobile application</h1>
                    <p className="p-large mb-8">Start getting things done together with your team based on PM BUDDY's revolutionary team management features</p>
                </div>
                <div className="xl:text-right">
                    <img className="inline" src="images/main.svg" alt="alternative" />
                </div>
            </div>
        </header>
    )
}

export default Header
