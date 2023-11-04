import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';
import Search from '../components/Search';

export default function MorePosts() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [visibleQuestions, setVisibleQuestions] = useState(10);

  useEffect(() => {
    // Define a query to get all questions from Firestore
    const q = query(
      collection(firestore, 'posts'),
      orderBy('timestamp', 'desc')
    );

    // Fetch the data
    getDocs(q)
      .then((querySnapshot) => {
        const allQuestionsData = [];
        querySnapshot.forEach((doc) => {
          // Map the document data to your question structure
          const questionData = doc.data();

          // Include all questions
          allQuestionsData.push({
            id: doc.id,
            subject: questionData.subject,
            course: questionData.course,
            question: questionData.question,
            images: questionData.images,
            // Add other properties here based on your Firestore document structure
          });
        });

        setAllQuestions(allQuestionsData);
      })
      .catch((error) => {
        console.error('Error fetching all questions:', error);
      });
  }, []);

  const handleShowMore = () => {
    setVisibleQuestions((prev) => prev + 10); // Load an additional 10 posts
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Search />

      <div>
        <p className="font-bold text-2xl">All Posts</p>

        {allQuestions.slice(0, visibleQuestions).map((question) => (
          <div key={question.id} className="my-4 border border-gray-300 p-4 rounded-md">
            <p className="font-semibold">Subject: {question.subject}</p>
            <p className="font-semibold">Class: {question.course}</p>
            <p className="font-semibold">Question: {question.question}</p>
          </div>
        ))}

        {visibleQuestions < allQuestions.length && (
          <div className="text-center">
            <button
              className=" text-blue-700 py-2 px-4 rounded hover"
              onClick={handleShowMore}
            >
              Show More
            </button>
          </div>
        )}

        <p className="text-blue-600 hover:text-blue-700 transition ease-in-out duration-150">
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
