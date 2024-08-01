import React from "react";
import Navbar from "../HomeNav"; // Ensure this component is correctly imported

const Api = () => {
  return (
    <div className="box min-h-screen bg-transparent text-[#D7FE63] flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow text-center w-full px-4">
        <div className="flex flex-col items-center justify-center bg-transparent p-4 rounded-lg" style={{ width: "572px", height: "184.09px" }}>
          <p className="text-4xl font-bold mb-2">
            <span className="text-white">FLEXIBLE</span>
            <span className="text-[#D7FE63]"> PLANS</span>
          </p>
          <p className="text-lg text-white">Choose a plan that works best for you</p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 mt-16 w-full px-4">
          <div className="w-full sm:w-2/3 md:w-auto lg:w-[534px] bg-transparent p-6 rounded-2xl shadow-lg flex flex-col items-center border-x-4 border-y-4 border-[#D7FE63]">
            <div className="text-xl font-bold mb-4 text-[#D7FE63]">Basic</div>
            <div className="text-3xl mb-2 text-white items-start">$0.00</div>
            <div className="text-[#D7FE63] bg-black py-1 px-2 inline-block rounded border border-[#D7FE63]">Free</div>
            <ul className="text-left mt-4 space-y-2 text-[#D7FE63] text-lg">
              <li>✔ Access to 7B Model</li>
              <li>✔ Faster than GPT 3.5</li>
              <li>✔ Free Image Generator Feature</li>
              <li>✔ Free Chat with Document</li>
            </ul>
            <button className="mt-6 bg-[#D7FE63] text-black py-2 px-4 rounded-full hover:bg-black hover:text-white transition duration-300">Choose Plan</button>
          </div>

          <div className="w-full sm:w-2/3 md:w-auto lg:w-[534px] bg-[#D7FE63] p-6 rounded-2xl shadow-lg flex flex-col items-center mt-8 sm:mt-0">
            <div className="text-xl font-bold mb-4 text-black">Professional</div>
            <div className="text-3xl mb-2 text-black items-start">$5.00/- per month</div>
            <ul className="text-left mt-4 space-y-2 text-black text-lg">
              <li>✔ Access to 70B Model</li>
              <li>✔ Faster Querying</li>
              <li>✔ More Context</li>
              <li>✔ Free API Access</li>
            </ul>
            <button className="mt-6 bg-black text-[#D7FE63] py-2 px-4 rounded-full hover:bg-lime-700 hover:text-black transition duration-300">Choose Plan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Api;
