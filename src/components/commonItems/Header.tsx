import React from 'react'

const Header = ({ title , subtitle}:{title:string,subtitle:string}) => {
    return (
        <>
            <h1 className="mb-2 text-5xl font-medium">{title}</h1>
            <p className="mb-5 text-xl font-medium">{subtitle}</p>
        </>
    )
}

export default Header
