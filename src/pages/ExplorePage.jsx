import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";
import { firestore } from "./firebase";
import QuestionCard from "../components/QuestionCard";
import Spinner from "../components/Spinner";
import { FaGears, FaComputer } from "react-icons/fa6";
import { FaAtom, FaRobot } from "react-icons/fa";
import { HiBeaker } from "react-icons/hi";
import { GiMedicines, GiChemicalDrop } from "react-icons/gi";
import { FcLandscape, FcBiotech, FcCalculator, FcBinoculars, FcAlphabeticalSortingAz } from "react-icons/fc";
import { MdElectricBolt } from "react-icons/md";
import { AiTwotoneFire } from "react-icons/ai";
import { Link } from "react-router-dom";
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import '@splidejs/react-splide';

const ExplorePage = () => {
  const [unansweredPosts, setUnansweredPosts] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);
  const [showMoreOther, setShowMoreOther] = useState(false);
  const [showMoreUnanswered, setShowMoreUnanswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [mostAnsweredQuestions, setMostAnsweredQuestions] = useState([]);


  
  console.log("mostAnsweredQuestions", mostAnsweredQuestions)
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
  
        const postingsRef = collection(firestore, 'posts');
        const questionsSnapshot = await getDocs(postingsRef);
  
        const fetchUnanswered = questionsSnapshot.docs.map(async (doc) => {
          const postData = doc.data();
  
          if (!postData.answered) {
            const answersQuery = query(collection(firestore, 'answers'), where('postingId', '==', doc.id));
            const answersSnapshot = await getDocs(answersQuery);
            return { id: doc.id, data: postData, answers: answersSnapshot };
          }
          return null;
        });
  
        const fetchMostAnswered = questionsSnapshot.docs.map(async (doc) => {
          const postData = doc.data();
          const answersSnapshot = await getDocs(query(collection(firestore, 'answers'), where('postingId', '==', doc.id)));
          const answerCount = answersSnapshot.size;
  
          if (answerCount > 0) {
            return { id: doc.id, data: postData, answerCount };
          }
          return null;
        });
  
        const [unansweredResults, mostAnsweredResults] = await Promise.all([
          Promise.all(fetchUnanswered),
          Promise.all(fetchMostAnswered),
        ]);
  
        const otherPosts = questionsSnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
        setLoading(false);
        setOtherPosts(otherPosts);
        setUnansweredPosts(unansweredResults.filter(Boolean));
  
        const sortedMostAnswered = mostAnsweredResults.filter(Boolean).sort((a, b) => b.answerCount - a.answerCount);
        setMostAnsweredQuestions(sortedMostAnswered);
  
        if (unansweredResults.length > 4) {
          setShowMoreUnanswered(true);
        }
        if (otherPosts.length === 4) {
          setShowMoreOther(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, []);
  
  const handleShowMoreOther = () => {
    setShowMoreOther(false);
    navigate("/more-posts");
  };

  const handleShowMoreUnanswered = () => {
    setShowMoreUnanswered(false);
    navigate("/unanswered-posts");
  };

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
    <div className="p-6 max-w-6xl mx-auto">
      <div className="max-w-6xl mx-auto ">
      <h1 className='mt-5 font-bold text-lg ml-4'>Categories</h1>
            <section className="p-4 m-2 splide ">
            <Splide options={{
                    
                    
                    // perPage : 2,
                    
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
    
                    <Link to={"/more-posts"}  className="category-link">
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
    
                    <Link to={"/subjects/Computer Science"}  className="category-link">
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
    
                    <Link to={"/subjects/Biology"} className="category-link">
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
    
                    <Link to={"/subjects/Chemistry"} className="category-link">
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
    
                    <Link to={"/subjects/Physics"} className="category-link">
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
    
                    <Link to={"/subjects/Mathematics"} className="category-link">
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
    
                    <Link to={"/subjects/Engineering"} className="category-link">
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
    
                    <Link to={"/subjects/Biomedical Science"} className="category-link">
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
    
                    <Link to={"/subjects/Environmental Science"} className="category-link">
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
    
                    <Link to={"/subjects/Chemical Engineering"} className="category-link">
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
    
                    <Link to={"/subjects/Electrical Engineering"} className="category-link">
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
    
                    <Link to={"/subjects/Mechanical Engineering"} className="category-link">
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
      
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <>
             {mostAnsweredQuestions.length > 0 && (
       <div className='mt-4 mx-4'>
       <h1 className='flex items-center space-x-2 text-lg font-semibold'>
           Trending Questions
           <AiTwotoneFire className='text-orange-600' />
           
       </h1>
          <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {mostAnsweredQuestions.slice(0,4).map((question) => (
              <QuestionCard
                key={question.id}
                id={question.id}
                posting={question.data}
              />

            ))}
          </ul>
         
        </div>
      )}

              {unansweredPosts.length > 0 && (
                <div className='mt-4 mx-4'>
                <h1 className='flex items-center space-x-2 text-lg font-semibold'>
                Unanswered Questions
                    
                </h1>
                {unansweredPosts.length>5 && (
                    <div className="">
                      <p
                        onClick={handleShowMoreUnanswered}
                        className="text-blue-600 hover:text-blue-700 transition ease-in-out duration-150 cursor-pointer"
                      >
                        Show More Unanswered
                      </p>
                    </div>
                  )}
                  <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-4">
                    {unansweredPosts.slice(0, 4).map((posting) => (
                      <QuestionCard
                        key={posting.id}
                        id={posting.id}
                        posting={posting.data}
                      />
                    ))}
                  </ul>
                  
                </div>
              )}

              {otherPosts.length > 0 && (
                <div className='mt-4 mx-4'>
                <h1 className='flex items-center space-x-2 text-lg font-semibold'>
                    More Posts
                    
                </h1>
                {otherPosts.length > 5 && (
                    <div className="">
                      <button
                        onClick={handleShowMoreOther}
                        className="text-blue-600 hover:text-blue-700 transition ease-in-out duration-150 cursor-pointer"
                      >
                        Show All Posts
                      </button>
                    </div>
                  )}
                  <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-4">
                    {otherPosts.slice(0, 4).map((posting) => (
                      <QuestionCard
                        key={posting.id}
                        id={posting.id}
                        posting={posting.data}
                      />
                    ))}
                  </ul>
                  
                </div>
              )}
            </>
          )}
        </div>
      </div>
    
  );
};

export default ExplorePage;
