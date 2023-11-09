import React, { useEffect, useState } from 'react';
import { firestore } from './firebase';
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { useParams } from 'react-router';
import Spinner from '../components/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { HiOutlineThumbDown, HiOutlineThumbUp } from 'react-icons/hi';

export default function AnswerPage() {
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const params = useParams();

  // Check if the user has voted in the past using local storage
  useEffect(() => {
    const hasVoted = localStorage.getItem(`vote_${params.postingId}`);
    if (hasVoted === 'like') {
      setLiked(true);
    } else if (hasVoted === 'dislike') {
      setDisliked(true);
    }
  }, [params.postingId]);

  useEffect(() => {
    async function fetchAnswer() {
      try {
        const docRef = doc(firestore, 'answers', params.postingId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          const likes = data.likes || 0;
          const dislikes = data.dislikes || 0;

          setAnswer({
            ...data,
            likes,
            dislikes,
          });

          setLoading(false);

          const unsubscribe = onSnapshot(docRef, (snapshot) => {
            const updatedData = snapshot.data();
            setAnswer({
              ...updatedData,
              likes: updatedData.likes || 0,
              dislikes: updatedData.dislikes || 0,
            });
          });

          return () => {
            unsubscribe();
          };
        } else {
          console.log('Answer not found.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching answer:', error);
        setLoading(false);
      }
    }

    fetchAnswer();
  }, [params.postingId]);

  const handleLike = async () => {
    if (!liked) {
      // Check if the user has already voted
      const hasVoted = localStorage.getItem(`vote_${params.postingId}`);
      if (!hasVoted) {
        setLiked(true);
        const answerRef = doc(firestore, 'answers', params.postingId);
        await updateDoc(answerRef, {
          likes: answer.likes + 1,
        });
        // Set the user's vote status in local storage
        localStorage.setItem(`vote_${params.postingId}`, 'like');
      }
    }
  };

  const handleDislike = async () => {
    if (!disliked) {
      // Check if the user has already voted
      const hasVoted = localStorage.getItem(`vote_${params.postingId}`);
      if (!hasVoted) {
        setDisliked(true);
        const answerRef = doc(firestore, 'answers', params.postingId);
        await updateDoc(answerRef, {
          dislikes: answer.dislikes + 1,
        });
        // Set the user's vote status in local storage
        localStorage.setItem(`vote_${params.postingId}`, 'dislike');
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!answer) {
    return <div>Answer not found.</div>;
  }

  return (
    <div>
      <div className="p-4 max-w-4xl lg:mx-auto rounded-lg shadow-lg bg-[#F9F9F9] lg:space-x-5">
        <div className="w-full">
          <Swiper
            slidesPerView={1}
            navigation
            pagination={{ type: 'progressbar' }}
            effect="fade"
            modules={[EffectFade, Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 3000 }}
            onSlideChange={(swiper) => {
              setCurrentImageIndex(swiper.activeIndex);
            }}
          >
            {answer.images.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative w-full overflow-hidden h-[600px]"
                  style={{
                    background: `url(${answer.images[index]}) center no-repeat`,
                    backgroundSize: 'contain',
                    opacity: index === currentImageIndex ? 1 : 0,
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="m-4 p-4 rounded-lg shadow-lg bg-[#F9F9F9] max-w-4xl mx-auto px-6">
        <div className='flex items-center justify-between max-w-2xl mx-auto'>
          <p className='text-center text-2xl font-semibold mb-8'>Answer</p>
          <div className="flex space-x-3 relative">
            <button
              onClick={handleLike}
              className={`${
                liked ? 'text-blue-500' : 'text-gray-500'
              } hover:text-blue-700`}
            >
              <div className="text-2xl">
                <HiOutlineThumbUp />
                <div className="text-sm absolute left-5 top-4 bg- ">
                  {answer.likes}
                </div>
              </div>
            </button>
            <button
              onClick={handleDislike}
              className={`${
                disliked ? 'text-red-500' : 'text-gray-500'
              } hover:text-red-700`}
            >
              <div className="text-2xl">
                <HiOutlineThumbDown />
                <div className="text-sm absolute left-14 top-4 bg- ">
                  {answer.dislikes}
                </div>
              </div>
            </button>
          </div>
        </div>
        <p className='mr-5 text-lg max-w-2xl mx-auto'>{answer.answer}</p>
      </div>
    </div>
  );
}
