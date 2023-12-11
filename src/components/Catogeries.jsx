
import { Link } from "react-router-dom";
import {Splide, SplideSlide} from '@splidejs/react-splide'
import { FaGears, FaComputer } from "react-icons/fa6";
import { FaAtom, FaRobot } from "react-icons/fa";
import { HiBeaker } from "react-icons/hi";
import { GiMedicines, GiChemicalDrop } from "react-icons/gi";
import { FcLandscape, FcBiotech, FcCalculator, FcBinoculars, FcAlphabeticalSortingAz } from "react-icons/fc";
import { MdElectricBolt } from "react-icons/md";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const Catogeries = () => {
    const [sliderInstance, setSliderInstance] = useState(null);

    useEffect(() => {
      if (sliderInstance && sliderInstance.splide) {
        const splideAPI = sliderInstance.splide;
    
        // Play/pause button functionality
        const playPauseButton = document.querySelector('.splide__toggle');
        
        if (playPauseButton) {
          playPauseButton.addEventListener('click', () => {
            splideAPI.toggle();
          });
    
          // Update the progress bar on slide change
          splideAPI.on('move', () => {
            const progressBar = document.querySelector('.splide__progress__bar');
            const progress = (splideAPI.index / (splideAPI.length - 1)) * 100;
            progressBar.style.width = `${progress}%`;
          });
        }
      }
    }, [sliderInstance]);
  return (
    <div className="max-w-6xl mx-auto  ">
      <h1 className='mt-5 font-bold text-4xl text-center text-[#3F3F3F] ml-4'>Categories</h1>
            <section className="p-4 m-2 splide  text-[#3F3F3F] hover:text-black ">
            <Splide options={{
                
                    breakpoints: {
                        2500: {perPage: 6},
                        1600: {perPage: 6},
                        1200: { perPage: 4 },
                        800: { perPage: 2 },
                        500: { perPage: 2 },
                      },
    
                    
                    gap: '1rem',
                    updateOnMove : true,
                    pagination: true,
                    arrows: false,
                    autoplay: true,
                    interval: 5000,
                    rewind: true,
                    speed: 1000,
                
            }}
            onMounted={(splide) => setSliderInstance(splide)}
            >
             
  
   
                
    
                {/* <div className='grid-rows-2 sm:grid md:grid-cols-4 lg:grid-cols-6 '> */}
                
     
                <SplideSlide>
    
                    <Link to={"/more-posts"}  className="category-link mx-4 text-[#3F3F3F] hover:text-black">
                        <div className='flex space-x-3'>
                            <div>
                                <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md w-[175px]">
                                <div className="border m-1 bg-slate-200  rounded-full">
                                    <FcAlphabeticalSortingAz  className="text-2xl bg-slate-200 m-3 text-slate-400" />
                                </div>
    
                                <div>
                                    <p className="font-semibold text-start text-sm">All posts</p>
                                    
                                </div>
                                </button>
                            </div>
                        </div>
                    </Link>
                </SplideSlide>
                <SplideSlide>
    
                    <Link to={"/subjects/Computer Science"}  className="category-link mx-4 text-[#3F3F3F] hover:text-black">
                        <div className='flex space-x-3'>
                            <div>
                                <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md w-[175px]">
                                <div className="border m-1 bg-slate-200  rounded-full">
                                    <FaComputer  className="text-2xl bg-slate-200 m-3 text-slate-400" />
                                </div>
    
                                <div>
                                    <p className="font-semibold text-start text-sm">Computer Science</p>
                                    
                                </div>
                                </button>
                            </div>
                        </div>
                    </Link>
                </SplideSlide>
                <SplideSlide>
    
                    <Link to={"/subjects/Biology"} className="category-link mx-4 text-[#3F3F3F] hover:text-black">
                        <div className='flex space-x-3'>
                            <div>
                                <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md  w-[175px]">
                                <div className="border m-1 bg-slate-200  rounded-full">
                                    <FcBiotech className="text-2xl bg-slate-200 m-3 text-red-300" />
                                </div>
    
                                <div>
                                    <p className="font-semibold text-start text-sm">Biology</p>
                                    
                                </div>
                                </button>
                            </div>
                        </div>
                    </Link>
                </SplideSlide>
                <SplideSlide>
    
                    <Link to={"/subjects/Chemistry"} className="category-link mx-4 text-[#3F3F3F] hover:text-black">
                    <div className='flex space-x-3'>
                        <div>
                            <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md  w-[175px]">
                            <div className="border m-1 bg-slate-200  rounded-full">
                                <HiBeaker className="text-2xl bg-slate-200 m-3 text-green-400" />
                            </div>
    
                            <div>
                                <p className="font-semibold text-start text-sm">Chemistry</p>
                                
                            </div>
                            </button>
                        </div>
                    </div>
                    </Link>
                </SplideSlide>
                <SplideSlide>
    
                    <Link to={"/subjects/Physics"} className="category-link mx-4 text-[#3F3F3F] hover:text-black">
                    <div className='flex space-x-3'>
                        <div>
                            <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md  w-[175px]">
                            <div className="border m-1 bg-slate-200  rounded-full">
                                <FaAtom className="text-2xl bg-slate-200 m-3 text-cyan-700" />
                            </div>
    
                            <div>
                                <p className="font-semibold text-start text-sm">Physics</p>
                                
                            </div>
                            </button>
                        </div>
                    </div>
                    </Link>
                </SplideSlide>
                    <SplideSlide>
    
                    <Link to={"/subjects/Mathematics"} className="category-link mx-4 text-[#3F3F3F] hover:text-black">
                    <div className='flex space-x-3'>
                        <div>
                            <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md  w-[175px]">
                            <div className="border m-1 bg-slate-200  rounded-full">
                                <FcCalculator className="text-2xl bg-slate-200 m-3" />
                            </div>
    
                            <div>
                                <p className="font-semibold text-start text-sm">Mathematics</p>
                                
                            </div>
                            </button>
                        </div>
                    </div>
                    </Link>
                    </SplideSlide>
                    <SplideSlide>
    
                    <Link to={"/subjects/Engineering"} className="category-link mx-4 text-[#3F3F3F] hover:text-black">
                    <div className='flex space-x-3'>
                        <div>
                            <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md  w-[175px]">
                            <div className="border m-1 bg-slate-200  rounded-full">
                                <FaGears className="text-2xl bg-slate-200 m-3 text-slate-600" />
                            </div>
    
                            <div>
                                <p className="font-semibold text-start text-sm">Engineering</p>
                            </div>
                            </button>
                        </div>
                    </div>
                    </Link>
                    </SplideSlide>
                    <SplideSlide>
    
                    <Link to={"/subjects/Biomedical Science"} className="category-link mx-4 text-[#3F3F3F] hover:text-black">
                    <div className='flex space-x-3'>
                                
                        <div>
                            <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md  w-[175px]">
                            <div className="border m-1 bg-slate-200  rounded-full">
                                <GiMedicines className="text-2xl bg-slate-200 m-3 text-red-600" />
                            </div>
    
                            <div>
                                <p className="font-semibold text-start text-sm">Biomedical Science</p>
                                
                            </div>
                            </button>
                        </div>
                    </div>
                    </Link>
                    </SplideSlide>
                    <SplideSlide>
    
                    <Link to={"/subjects/Environmental Science"} className="category-link mx-4 text-[#3F3F3F] hover:text-black">
                    <div className='flex space-x-3'>
                        <div>
                            <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md  w-[175px]">
                            <div className="border m-1 bg-slate-200  rounded-full">
                                <FcLandscape className="text-2xl bg-slate-200 m-3" />
                            </div>
    
                            <div>
                                <p className="font-semibold text-start text-sm">Environmental Science</p>
                                
                            </div>
                            </button>
                        </div>
                    </div>
                    </Link>
                    </SplideSlide>
                    <SplideSlide>
    
                    <Link to={"/subjects/Chemical Engineering"} className="category-link mx-4 text-[#3F3F3F] hover:text-black">
                    <div className='flex space-x-3'>
                        <div>
                            <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md  w-[175px]">
                            <div className="border m-1 bg-slate-200  rounded-full">
                                <GiChemicalDrop  className="text-2xl bg-slate-200 m-3 text-green-600" />
                            </div>
    
                            <div>
                                <p className="font-semibold text-start text-sm">Chemical Engineering</p>
                                
                            </div>
                            </button>
                        </div>
                    </div>
                    </Link>
                    </SplideSlide>
                    <SplideSlide>
    
                    <Link to={"/subjects/Electrical Engineering"} className="category-link mx-4 text-[#3F3F3F] hover:text-black">
                    <div className='flex space-x-3'>
                        <div> 
                            <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md  w-[175px]">
                            <div className="border m-1 bg-slate-200  rounded-full">
                                <MdElectricBolt className="text-2xl bg-slate-200 m-3 text-yellow-300" />
                            </div>
    
                            <div>
                                <p className="font-semibold text-start text-sm">Electrical Engineering</p>
                                
                            </div>
                            </button>
                        </div>
                    </div>
                    </Link>
                    </SplideSlide>
                    <SplideSlide>
    
                    <Link to={"/subjects/Mechanical Engineering"} className="category-link mx-4 text-[#3F3F3F] hover:text-black">
                    <div className='flex space-x-3'>
                        <div>
                            <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md w-[175px]">
                            <div className="border m-1 bg-slate-200  rounded-full">
                                <FaRobot className="text-2xl bg-slate-200 m-3 text-cyan-600" />
                            </div>
    
                            <div>
                                <p className="font-semibold text-start text-sm">Mechanical Engineering</p>
                                
                            </div>
                            </button>
                        </div>
                    </div>
                    </Link>
                    </SplideSlide>
                {/* </div> */}
                </Splide>
                <button className="splide__toggle" type="button">
          <span className="splide__toggle__play">Play</span>
          <span className="splide__toggle__pause">Pause</span>
        </button>
        <div className="splide__progress">
          <div className="splide__progress__bar"></div>
        </div>
            </section>
        </div>
  )
}

export default Catogeries
