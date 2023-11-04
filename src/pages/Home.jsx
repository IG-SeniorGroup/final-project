import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';
import Search from '../components/Search';

export default function Home() {
  const [recentQuestions, setRecentQuestions] = useState([]);

  useEffect(() => {
    // Define a query to get the most recent 5 questions with images from Firestore
    const q = query(
      collection(firestore, 'posts'),
      orderBy('timestamp', 'desc'),
      limit(10) // Fetch a larger number of recent posts to ensure you get 5 with images
    );

    // Fetch the data
    getDocs(q)
      .then((querySnapshot) => {
        const questionsWithImages = [];
        querySnapshot.forEach((doc) => {
          // Map the document data to your question structure
          const questionData = doc.data();

          // Include only questions that have images
          if (questionData.images && questionData.images.length > 0) {
            questionsWithImages.push({
              id: doc.id,
              subject: questionData.subject,
              course: questionData.course,
              question: questionData.question,
              images: questionData.images,
              // Add other properties here based on your Firestore document structure
            });
          }
        });

        // Slice the array to get the 5 most recent questions with images
        const mostRecentQuestions = questionsWithImages.slice(0, 5);

        console.log('Fetched questions:', mostRecentQuestions);

        setRecentQuestions(mostRecentQuestions);
      })
      .catch((error) => {
        console.error('Error fetching recent questions:', error);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Your search component */}
      <Search />

      <div>
        <p className="font-bold text-2xl">Recently posted</p>

        {/* Render the most recent questions/posts in descending order */
        recentQuestions.map((question) => (
          <div key={question.id} className="my-4 border border-gray-300 p-4 rounded-md flex">
            <div className="flex-1">
              <p className="font-semibold">Subject: {question.subject}</p>
              <p className="font-semibold">Class: {question.course}</p>
              <p className="font-semibold">Question: {question.question}</p>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-2 gap-2">
                {question.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="max-h-40 max-w-40 object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
        <p className="text-blue-600 hover:text-blue-700 transition ease-in-out duration-150">
          <Link to="/more-posts">Show more posts</Link>
        </p>
      </div>
    </div>
  );
}
