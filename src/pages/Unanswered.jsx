import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';
import Spinner from '../components/Spinner';
import QuestionCard from '../components/QuestionCard';

export default function UnansweredQuestions() {
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUnansweredQuestions();
  }, []);

  const fetchUnansweredQuestions = async () => {
    try {
      console.log('Fetching unanswered questions...');
      setLoading(true);
  
      const unansweredRef = collection(firestore, 'posts');
      console.log('unansweredRef:', unansweredRef);
  
      const q = query(unansweredRef, where('answered', '==', false));
      console.log('Query:', q);
  
      const querySnapshot = await getDocs(q);
      console.log('Query Snapshot:', querySnapshot);
  
      const unanswered = [];
      querySnapshot.forEach((doc) => {
        unanswered.push({
          id: doc.id,
          data: doc.data(),
        });
      });
  
      console.log('Unanswered Questions:', unanswered);
  
      setUnansweredQuestions(unanswered);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching unanswered questions:', error);
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-6xl mx-auto">
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {unansweredQuestions.length > 0 && (
            <div className="mt-8">
              <h2 className="font-bold text-2xl mb-4">Unanswered Questions</h2>
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-4">
                {unansweredQuestions.map((posting) => (
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
}

