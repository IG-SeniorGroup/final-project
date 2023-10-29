import React, { useEffect, useState } from 'react'

import Spinner from '../components/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';

import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { doc, firestore, getDoc } from './firebase';
import { useParams } from 'react-router';


export default function Question() {

  const params = useParams();
  const [posting, setPosting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchPosting() {
      const docRef = doc(firestore, 'posts', params.postingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPosting(docSnap.data());
        setLoading(false);
        
      }
    }
    fetchPosting();
  }, [params.postingId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className='gray-backg'>
        
        
      <div className='p-4 max-w-4xl lg:mx-auto rounded-lg shadow-lg bg-[#F9F9F9] lg:space-x-5'>
        <div className='w-full'>
          <Swiper
            slidesPerView={1}
            navigation
            pagination={{ type: 'progressbar' }}
            effect='fade'
            modules={[EffectFade,Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 3000 }}
            onSlideChange={(swiper) => {
              setCurrentImageIndex(swiper.activeIndex);
            }}
          >
            {posting.images.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className='relative w-full overflow-hidden h-[600px]'
                  style={{
                    background: `url(${posting.images[index]}) center no-repeat`,
                    backgroundSize: 'contain',
                    opacity: index === currentImageIndex ? 1 : 0,
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        </div>
        <div className='m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg  shadow-lg bg-[#F9F9F9] lg:space-x-5'>
            <div className='w-full h-[300px] lg:h-[400px] z-10 overflow-x-hidden mt-6 lg:mt-0'>
                <div className='flex items-center space-x-5'> 
                    <p className='font-semibold'>Subject:</p>
                    <p className='font-semibold'>{posting.subject}</p>
                </div>
                <div className='flex items-center space-x-8 mt-3'> 
                    <p className='font-semibold'>Class:</p>
                    <p className='font-semibold '>{posting.course}</p>
                </div>
                <div className='flex items-center space-x-2 mt-3'> 
                    <p className='font-semibold'>Question:</p>
                    <p className='font-semibold '>{posting.question}</p>
                </div>
            
                    
                    
                    
                    

            </div>
            <div className='w-full h-[300px] lg:h-[400px] z-10 overflow-x-hidden mt-6 lg:mt-0 '>
            <p className='text-center font-bold text-xl mb-3'>Answers</p>

                                        {/* Code for Answers HERE!!!!! */}


            <p className='text-center font-bold text-xl mb-3'>Comments</p>
                                        {/* Code for Comments HERE!!!!!!! */}

            </div>
        </div>
        
    </div>
  )
}
