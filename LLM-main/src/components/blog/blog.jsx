
import React from 'react';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Intro from '../Overview/Intro';
import Hero from '../Overview/Hero';
import Navbar from '../HomeNav';
import Footer from '../footer/footer';

const blog = () => {
  return (
    <>

      <div className=" ">
    <Navbar />
    <Hero />
    <Intro />
    
    <section className=" p-5 lg:p-10">
        <div className="textIntro text-white flex flex-col items-start justify-between p-5 lg:p-10 mx-5 lg:mx-10 leading-7 lg:leading-8">
            <b className='text-xl lg:text-2xl font-normal mb-4'>Difference between</b>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">DisruptiveGPT</h1>
            <p className="text-base lg:text-lg leading-relaxed mb-4">
                The difference between the 7B and 70B models depends on the context in which they are used. However, typically, when comparing models, such as in technology or product lines, the differences could include:
            </p>
            <p className="text-base lg:text-lg leading-relaxed mb-4"><span className="text-[#D7FE63]">1. Features and Specifications:</span> The 7B and 70B models may have different features, specifications, or capabilities. This could include differences in processing power, memory, storage capacity, display size, resolution, or any other technical specifications relevant to the product.</p>
            <p className="text-base lg:text-lg leading-relaxed mb-4"><span className="text-[#D7FE63]">2. Price Range:</span> The 7B and 70B models might vary in price, with one being positioned as a more budget-friendly option and the other offering higher-end features or performance at a higher price point.</p>
            <p className="text-base lg:text-lg leading-relaxed mb-4"><span className="text-[#D7FE63]">3. Target Audience:</span> The 7B and 70B models may target different market segments or user demographics. For example, one model might be designed for casual users or entry-level applications, while the other targets professionals or power users with specific needs.</p>
            <p className="text-base lg:text-lg leading-relaxed mb-4"><span className="text-[#D7FE63]">4. Release Date:</span> There could be a difference in the release date of the two models, indicating advancements or updates in technology over time.</p>
            <p className="text-base lg:text-lg leading-relaxed mb-4"><span className="text-[#D7FE63]">5. Brand or Manufacturer:</span> The 7B and 70B models could be produced by different brands or manufacturers, each with its own design philosophy, quality standards, and customer support.</p>
            <button className='btnIntro text-base lg:text-lg mt-4 px-4 py-2' type="button">
                Read more <FontAwesomeIcon className='icon rotate-45 ml-2' icon={faArrowUp} />
            </button>
        </div>
    </section>
    
    <section className=" p-5 lg:p-10">
        <div className="textIntro text-white flex flex-col items-start justify-between p-5 lg:p-10 mx-5 lg:mx-10 leading-7 lg:leading-8">
            <i className='text-3xl lg:text-[39.87px] font-bold mb-4'>Parent</i>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4"><i>Company</i></h1>
            <p className="text-base lg:text-lg leading-relaxed mb-4">
                Disruptive AI stands as a pioneering force in the realm of artificial intelligence, spearheading groundbreaking innovations that redefine industry standards and reshape the technological landscape. Serving as the parent organization of Synthesia AI chatbot, akin to OpenAI's relationship with ChatGPT, Disruptive AI operates at the forefront of AI research and development. With a relentless commitment to pushing the boundaries of AI capabilities, Disruptive AI specializes in crafting advanced AI models and large language models (LLMs) that catalyze transformative change across various sectors. From revolutionizing communication with Synthesia AI chatbot to democratizing access to cutting-edge AI technologies, Disruptive AI is dedicated to making the intricate world of AI accessible and beneficial to every individual, fostering a future where innovation knows no bounds.
            </p>
            <button className='btnIntro text-base lg:text-lg mt-4 px-4 py-2' type="button">
                Read blog <FontAwesomeIcon className='icon rotate-45 ml-2' icon={faArrowUp} />
            </button>
        </div>
    </section>
    
    <Footer />
</div>

   

    </>
  )
}

export default blog
