import React, { useEffect, useRef, useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

import { FcAlphabeticalSortingAz, FcBinoculars, FcBiotech } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { collection, firestore } from './firebase';
import { getDocs, limit, orderBy, query } from 'firebase/firestore';
import QuestionCard from '../components/QuestionCard';
import Service from '../components/Service';

export default function Homepage() {
    const ref = useRef();
    const navigate = useNavigate();

    const [postings, setPostings] = useState(false);

    useEffect(() => {

        async function fetchUserPostings() {
            const postingsRef = collection(firestore, "posts");
            const q = query(postingsRef, orderBy("timestamp", "desc"))
            const querySnap = await getDocs(q)
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

    }, [])

    return (
        <div>
          <div className='h-screen relative' style={{
    backgroundImage: 'url("hero.jpg")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '80vh',

    backgroundSize: 'cover',
}}>
    <div
        style={{
            position: 'absolute',
            inset: '0',
            backgroundSize: 'cover',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: '1',
            height: '80vh',
            transition: 'background-color 0.3s ease-in-out',
        }}
    />

    <div className='relative flex flex-col items-center z-20 justify-center'>
        <h1 className='text-[112px] mt-[60px] font-bold text-[#0088ff] tracking-wide'>BrainLink</h1>
        <h2 className='max-w-2xl mx-auto p-5 text-[24px] text-center text-[#f0f0f0] font-semibold tracking-wide'>
            Tailor your learning experience. With BrainLink, you're in control. Explore questions, discover new perspectives, and learn at your own pace.
        </h2>
        <div className='flex space-x-3 '>
            <div>
                <Link to="/explore" className="flex items-center justify-start hover:text-black text-[#f0f0f0] px-4 py-3 m-2 border-2 rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out hover:border-5 shadow-lg font-semibold text-lg">
                    <div className="m-1 bg-slate-500 rounded-full">
                        <FcBinoculars className="text-xl mx-4 my-2" />
                    </div>
                    <div>
                        <p className="text-sm">Explore</p>
                    </div>
                </Link>
            </div>
            <div>
                <Link to="/more-posts" className="flex items-center hover:text-black text-[#f0f0f0] justify-start px-4 py-3 m-2 border-2 border-red-200 rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out hover:border-5 shadow-lg font-semibold text-lg">
                    <div className="m-1 bg-slate-300 rounded-full">
                        <FcAlphabeticalSortingAz className="text-xl mx-4 my-2" />
                    </div>
                    <div>
                        <p className="text-sm">All posts</p>
                    </div>
                </Link>
            </div>
        </div>
    </div>
</div>



            <div className='max-w-4xl mx-auto '>
                <Service  />
            </div>

            <div className='min-h-screen mt-[114px] relative'
                style={{
                    backgroundImage: 'url("back.webp")',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >

                <div className='max-w-4xl mx-auto p-5 text-center text-5xl font-semibold relative z-10'>
                    <h1 className='text-[#3F3F3F] mt-5 uppercase px-4'>Recently posted questions</h1>
                </div>
                <div className='flex justify-center items-center mt-10 mx-auto container py-4'>
                    {postings.length > 0 && (
                        <>
                            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {postings.slice(0, 3).map((posting) => (
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


        </div>
    );
}


