import React, { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./firebase";

const MostAnsweredQuestions = () => {
    const [mostAnsweredQuestions, setMostAnsweredQuestions] = useState([]);

    useEffect(() => {

    async function fetchMostAnsweredQuestions() {
        try {
          const questionsSnapshot = await getDocs(collection(firestore, 'posts'));
          const questionsData = [];
  
          for (const doc of questionsSnapshot.docs) {
            const postData = doc.data();
  
            const answersSnapshot = await getDocs(
              query(collection(firestore, 'answers'), where('postingId', '==', doc.id))
            );
  
            const answerCount = answersSnapshot.size;
            if (answerCount > 0) { // Only include questions with answers
              questionsData.push({ id: doc.id, data: postData, answerCount });
            }
          }
  
          const sortedQuestions = questionsData.sort((a, b) => b.answerCount - a.answerCount);
          setMostAnsweredQuestions(sortedQuestions);
        } catch (error) {
          console.error('Error fetching most answered questions:', error);
        }
      }
  
      fetchMostAnsweredQuestions(); // Add this line to call the new function
    }, []);
  return (
    <div className="max-w-6xl mx-auto">
      <div>
        {mostAnsweredQuestions.length > 0 && (
          <div className="mt-8">
            <h2 className="font-bold text-2xl mb-4">Most Answered Questions</h2>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-4">
              {mostAnsweredQuestions.map((question) => (
                <QuestionCard
                  key={question.id}
                  id={question.id}
                  posting={question.data}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MostAnsweredQuestions;
