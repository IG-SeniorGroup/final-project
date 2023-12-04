import React, { useEffect, useRef, useState } from 'react';
import { Parallax, ParallaxLayer} from '@react-spring/parallax'

import { FcAlphabeticalSortingAz, FcBinoculars, FcBiotech } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { collection, firestore } from './firebase';
import { getDocs, limit, orderBy, query } from 'firebase/firestore';
import QuestionCard from '../components/QuestionCard';

export default function Homepage() {
    const ref = useRef();
    const navigate = useNavigate();

    const [postings, setPostings] = useState(false);

  useEffect(() => {
    
      async function fetchUserPostings(){
          const postingsRef = collection(firestore, "posts");
          const q = query(postingsRef, orderBy("timestamp", "desc"), limit(2))
          const querySnap  = await getDocs(q)
          let postings = [];
          querySnap.forEach((doc) => {
              return postings.push({
                  id: doc.id,
                  data: doc.data()
              })
          })
          setPostings(postings)

      }
      fetchUserPostings()

  },[])

  return (
    <div>
        <Parallax pages = {2.25} ref = {ref} className='bg-[#749afb]'>
            <ParallaxLayer
            offset = {0}
            speed = {1}
            style={{
                backgroundImage: `url(https://awv3node-homepage.surge.sh/build/assets/stars.svg)`,
                backgroundSize: 'cover',
            }}
            className=''
            // onClick={() => ref.current.scrollTo(1)}
            />
             
            



            <ParallaxLayer offset={0} speed={0.5}  >
                <div className='h-screen flex flex-col items-center justify-center'>
                    <h1 className='text-5xl font-bold shine-effect'>BrainLink</h1>
                    <h2 className='max-w-2xl mx-auto p-5 text-2xl text-slate-300' >Tailor your learning experience. With BrainLink, you're in control. Explore questions, discover new perspectives, and learn at your own pace.</h2>
                    <div className='flex space-x-3 '>
                        <div>
                            <Link to="/explore" className="flex items-center justify-start bg-[#9db7f8] px-2 m-2 border-2 rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out hover:border-5 shadow-lg w-[140px]">
                                <div className=" m-1 bg-slate-500 rounded-full">
                                    <FcBinoculars className="text-lg  m-3 " />
                                </div>
                                <div>
                                    <p className="font-semibold text-start text-sm text-white">Explore</p>
                                </div>
                        </Link>
                        </div>
                        <div>

                            <Link to="/more-posts" className="flex items-center justify-start bg-[#5ba0b3] px-2 m-2 border-2 border-red-200 rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out hover:border-5 shadow-lg w-[140px]">
                                <div className=" m-1 bg-slate-300 rounded-full">
                                    <FcAlphabeticalSortingAz className="text-lg  m-3 " />
                                </div>
                                <div>
                                    <p className="font-semibold text-start text-sm text-white">All posts</p>
                                </div>
                        </Link>
                        </div>
                        
                    </div>

                </div>

            

            <img src="image.svg" style={{ width: '15%', marginLeft: '75%' , marginTop: '40%', opacity: .3}}/>
            <img src="image.svg" style={{ width: '5%', marginLeft: '25%' , marginTop: '1%'}}/>
              
                
        </ParallaxLayer>
        {/* <ParallaxLayer sticky={{ start:0.2, end: 1.5}} speed={-.6}>
            <img src="brainno.png" style={{ width: '15%', marginLeft: '80%' }} />
            </ParallaxLayer> */}
            
            <ParallaxLayer offset={1} speed={.4}  style={{opacity: 0.3}}>

            <img src="image.svg" style={{ width: '15%', marginLeft: '75%' , marginTop: '95%'}}/>
            <img src="image.svg" style={{  width: '15%', marginLeft: '20%' , marginTop: '60%'}}/>
            </ParallaxLayer>


            <ParallaxLayer offset={1}  >
            <div className='max-w-4xl mx-auto'>
                <div className='max-w-4xl mx-auto p-5 text-center text-4xl font-semibold'>
                    <h1 className='text-white px-4'>What is BrainLink?</h1>
                </div>
                <p className='text-white p-4'>We're redefining the learning experience by providing a dynamic platform, "BrainLink", where students can seamlessly connect, share knowledge, and elevate their academic journey. BrainLink is a space where students can share insights, discuss challenging topics, and collaboratively explore new ideas.</p>                
                <div className='max-w-4xl mx-auto p-5 text-center text-4xl font-semibold'>
                    <h1 className='text-white px-4'>Ask Anything!</h1>
                </div>
                <p className='text-white p-4'>A space for curiosity! Post questions across subjects, and our vibrant community of learners and experts will assemble to provide the insights you seek.</p>                
                <div className='max-w-4xl mx-auto p-5 text-center text-4xl font-semibold'>
                    <h1 className='text-white px-4'>User-Driven Learning</h1>
                </div>
                <p className='text-white p-4'>Tailor your learning experience. With BrainLink, you're in control. Explore questions, discover new perspectives, and learn at your own pace.</p>                
            </div>
            <div className='max-w-4xl mx-auto'>
            <div className='max-w-4xl mx-auto p-5 text-center text-4xl font-semibold'>
                    <h1 className='text-white px-4'>Recently posted questions</h1>
                </div>

        

        <p className="text-blue-600 hover:text-blue-700 transition ease-in-out duration-150">
          {/* <Link to="/more-posts">Show more posts</Link> */}
        </p>
        <div className='flex justify-center items-center'>

  {postings.length > 0 && (
    <>
      <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-4 flex justify-center items-center'>
        {postings.map((posting) => (
          <li key={posting.id}>
            <QuestionCard
              id={posting.id}
              posting={posting.data}
            />
          </li>
        ))}
      </ul>
    </>
  )}
</div>
      </div>

            </ParallaxLayer>
        </Parallax>
      
    </div>
  );
}


