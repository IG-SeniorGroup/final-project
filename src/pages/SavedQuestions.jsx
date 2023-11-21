import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { firestore } from './firebase';
import QuestionCard from '../components/QuestionCard'; // Import QuestionCard
import { Link } from 'react-router-dom';

const SavedQuestions = () => {
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [postData, setPostData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe(); // Unsubscribe the listener when the component unmounts
    };
  }, []);

  useEffect(() => {
    const fetchSavedQuestions = async () => {
      if (user) {
        const savedCollectionRef = collection(firestore, 'savedQuestions');
        const q = query(savedCollectionRef, where('userId', '==', user.uid));

        try {
          const querySnapshot = await getDocs(q);
          const savedQuestionsData = [];

          for (const doc of querySnapshot.docs) {
            const data = doc.data();

            savedQuestionsData.push({
              id: doc.id,
              data: {
                userId: data.userId,
                postId: data.postId,
                subject: data.subject,
                course: data.course,
                question: data.question,
                images: data.images,
                timestamp: data.timestamp,
              },
            });
          }

          // Sort the questions by timestamp in descending order (latest first)
          savedQuestionsData.sort((a, b) => b.data.timestamp - a.data.timestamp);

          console.log("Fetched saved questions:", savedQuestionsData);
          setSavedQuestions(savedQuestionsData);
        } catch (error) {
          console.error('Error fetching saved questions:', error);
        }
      }
    };

    fetchSavedQuestions();
  }, [user]);

  useEffect(() => {
    const fetchPostData = async () => {
      const postDataArray = [];

      for (const savedQuestion of savedQuestions) {
        const postDocRef = doc(firestore, 'posts', savedQuestion.data.postId);

        try {
          const postDoc = await getDoc(postDocRef);

          if (postDoc.exists()) {
            postDataArray.push({
              id: postDoc.id,
              data: postDoc.data(),
            });
          } else {
            console.error(`Post with ID ${savedQuestion.data.postId} does not exist.`);
          }
        } catch (error) {
          console.error('Error fetching post data:', error);
        }
      }

      console.log("Fetched post data:", postDataArray);
      setPostData(postDataArray);
      // Now you have the post data, and you can use it as needed
    };

    if (savedQuestions.length > 0) {
      fetchPostData();
    }
  }, [savedQuestions]);

  return (
    <div className='max-w-6xl px-3 mt-6 mx-auto'>
      <p className='text-center mb-9 text-3xl font-bold'>Saved Questions</p>
      {/* Display Saved Questions */}
      <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3'>
        {postData.map((post, index) => (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <QuestionCard
              key={post.id}
              posting={post.data}
              id={post.id}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SavedQuestions;
