import React from 'react'


import icon from '/assets/Group 72.png'
const footer = () => {
  return (
    <div className=' bg-black'>
 

<div className=' flex   md:flex-row items-center flex-col border-b-2   py-5  border-[#D7FE63] md:space-x-28  lg:space-x-60 lg:px-7 pt-6  md:items-start'>
<div className=' flex gap-6 md:gap-7 lg:gap-10 md:h-52 md:pr-20 md: lg:pr-16 lg:pl-8  mb-4 lg:mb-0  md:border-r-2 md:border-[#D7FE63]'>
<div className="rounded-full bg-[#D7FE63]  md:mx-1.5   w-10 h-10 flex items-center justify-center mr-3">
                <img src={icon} alt="Logo" className="w-3/5 h-3/5 object-cover" />
            </div>
            <div className="rounded-full    w-10 h-10 flex items-center justify-center  text-[#D7FE63] text-sm lg:text-base font-semibold">
                DisruptiveGPT
            </div>
</div>
            <div className=' flex  md:flex-row flex-col items-cente justify-centerr md:space-x-14  '>
            <ul className="flex flex-col text-white gap-2 mb-6 md:mb-0 lg:mb-0 ">
                <h1 className="text-xl lg:text-2xl text-white ">Products</h1>
                <li className="text-sm lg:text-base">Overview</li>
                <li className="text-sm lg:text-base">Features</li>
                <li className="text-sm lg:text-base">Solutions</li>
                <li className="text-sm lg:text-base">Pricing</li>
                <li className="text-sm lg:text-base">Releases</li>
            </ul>
            <ul className="flex text-white flex-col mb-6 md:mb-0 lg:mb-0  gap-2">
                <h1 className="text-xl lg:text-2xl text-white ">Company</h1>
                <li className="text-sm lg:text-base">Overview</li>
                <li className="text-sm lg:text-base">Features</li>
                <li className="text-sm lg:text-base">Solutions</li>
                <li className="text-sm lg:text-base">Pricing</li>
                <li className="text-sm lg:text-base">Releases</li>
            </ul>
            <ul className="flex text-white flex-col mb-2 md:mb-0 lg:mb-0 gap-2">
                <h1 className="text-xl lg:text-2xl text-white ">Resources</h1>
                <li className="text-sm lg:text-base">Overview</li>
                <li className="text-sm lg:text-base">Features</li>
                <li className="text-sm lg:text-base">Solutions</li>
                <li className="text-sm lg:text-base">Pricing</li>
                <li className="text-sm lg:text-base">Releases</li>
            </ul>
            </div>

</div>

 {/* Lower Section */}
 <div className="md:text-start text-center pb-6 mt-4 px-4">
        <span className="text-[#D7FE63] border-b-2 border-[#D7FE63] pb-1">
            A Great Assist with Single Click!
        </span>
    </div>
    </div>
  )
}

export default footer




  


