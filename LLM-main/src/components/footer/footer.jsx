import React from 'react'
import icon from '../../../public/assets/icon.png'
const footer = () => {
  return (
    <>
      <div className="flex flex-col justify-between items-center">
        {/* upper */}
        <div className="flex justify-between items-center">
            {/* right */}
            <div className="flex justify-between items-center">
                {/* logo box */}
                <div className="rounded-full bg-[#D7FE63] w-[42px] h-[42px] ">
                    <img src={icon} alt="" />
                </div>
                <div className="rounded-full shadow-[#D7FE63] shadow-md w-[42px] h-[42px] ">DisruptiveGPT</div>
            </div>
            {/* left */}
            <div className="flex justify-between items-center">
                {/* 1 */}
                <ul className="flex flex-col gap-4">
                    <h1 className="text-2xl text-white ">Products</h1>
                    <li className="">Overview</li>
                    <li className="">Features</li>
                    <li className="">Solutions</li>
                    <li className="">Pricing</li>
                    <li className="">Releases</li>
                </ul>
                {/* 2 */}
                <ul className="flex flex-col gap-4">
                    <h1 className="text-2xl text-white ">Company</h1>
                    <li className="">Overview</li>
                    <li className="">Features</li>
                    <li className="">Solutions</li>
                    <li className="">Pricing</li>
                    <li className="">Releases</li>
                </ul>
                {/* 3 */}
                <ul className="flex flex-col gap-4">
                    <h1 className="text-2xl text-white ">Resources</h1>
                    <li className="">Overview</li>
                    <li className="">Features</li>
                    <li className="">Solutions</li>
                    <li className="">Pricing</li>
                    <li className="">Releases</li>
                </ul>
            </div>
        </div>
        <hr/>
        {/* lower */}
        <div className="">
        <span className="text-[#D7FE63] border-2 border-b-[#D7FE63]">A Great Assist with Single Click!</span>
        </div>
      </div>
    </>
  )
}

export default footer
