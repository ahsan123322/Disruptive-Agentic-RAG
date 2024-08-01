import React from 'react'


import icon from '/assets/Group 72.png'
const footer = () => {
  return (
    <>
    <div className="flex flex-col
     p-5 lg:p-10">
    {/* Upper Section */}
    <div className="flex flex-col lg:flex-row lg:items-center w-full">
        {/* Logo and Title - Left Side */}
        <div className="flex  items-start mb-4 lg:mb-0 lg:w-1/3">
            {/* Logo Box */}
            <div className="rounded-full bg-[#D7FE63] mx-24 md:mx-1.5   w-10 h-10 flex items-center justify-center mr-3">
                <img src={icon} alt="Logo" className="w-3/5 h-3/5 object-cover" />
            </div>
            <div className="rounded-full md:ml-9 ml-6   w-10 h-10 flex items-center justify-center  text-[#D7FE63] text-sm lg:text-base font-semibold">
                DisruptiveGPT
            </div>
        </div>

        {/* Navigation Links - Right Side */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 text-center lg:text-left lg:w-2/3">
            {/* Products */}
            <ul className="flex flex-col text-white gap-2">
                <h1 className="text-xl lg:text-2xl text-white mb-2">Products</h1>
                <li className="text-sm lg:text-base">Overview</li>
                <li className="text-sm lg:text-base">Features</li>
                <li className="text-sm lg:text-base">Solutions</li>
                <li className="text-sm lg:text-base">Pricing</li>
                <li className="text-sm lg:text-base">Releases</li>
            </ul>
            {/* Company */}
            <ul className="flex text-white flex-col gap-2">
                <h1 className="text-xl lg:text-2xl text-white mb-2">Company</h1>
                <li className="text-sm lg:text-base">Overview</li>
                <li className="text-sm lg:text-base">Features</li>
                <li className="text-sm lg:text-base">Solutions</li>
                <li className="text-sm lg:text-base">Pricing</li>
                <li className="text-sm lg:text-base">Releases</li>
            </ul>
            {/* Resources */}
            <ul className="flex text-white flex-col gap-2">
                <h1 className="text-xl lg:text-2xl text-white mb-2">Resources</h1>
                <li className="text-sm lg:text-base">Overview</li>
                <li className="text-sm lg:text-base">Features</li>
                <li className="text-sm lg:text-base">Solutions</li>
                <li className="text-sm lg:text-base">Pricing</li>
                <li className="text-sm lg:text-base">Releases</li>
            </ul>
        </div>
    </div>

    <hr className="my-4 lg:my-8 border-[#D7FE63]" />

    {/* Lower Section */}
    <div className="text-center">
        <span className="text-[#D7FE63] border-b-2 border-[#D7FE63] pb-1">
            A Great Assist with Single Click!
        </span>
    </div>
</div>


    </>
  )
}

export default footer
