import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";
import { firestore } from "./firebase";
import QuestionCard from "../components/QuestionCard";
import Spinner from "../components/Spinner";

import { AiTwotoneFire } from "react-icons/ai";

import '@splidejs/splide/dist/css/splide.min.css'
import '@splidejs/react-splide';
import Catogeries from "../components/Catogeries";

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



  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      <Catogeries />

      <div>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {mostAnsweredQuestions.length > 0 && (
              <div className='mt-4 mx-4'>
                <h1 className='flex items-center space-x-2 text-[#3F3F3F] my-4 text-2xl font-semibold'>
                  Trending Questions
                  <AiTwotoneFire className='text-orange-600' /></h1>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                  {mostAnsweredQuestions.slice(0, 4).map((question) => (
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
                <h1 className='flex items-center space-x-2 text-[#3F3F3F] my-4 text-2xl font-semibold'>Unanswered Questions</h1>
                {unansweredPosts.length > 5 && (
                  <div className="">
                    <p
                      onClick={handleShowMoreUnanswered}
                      className="text-blue-600 hover:text-blue-700 transition ease-in-out duration-150 cursor-pointer"
                    >Show More Unanswered </p>
                  </div>
                )}
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
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
                <h1 className='flex items-center space-x-2 text-[#3F3F3F] my-4 text-2xl font-semibold'>More Posts</h1>
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
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
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
