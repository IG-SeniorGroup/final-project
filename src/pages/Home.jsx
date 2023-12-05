import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore";
import { firestore } from "./firebase";
import Search from "../components/Search";
import QuestionCard from "../components/QuestionCard";

export default function Home() {
  const [postings, setPostings] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    async function fetchUserPostings() {
      setLoading(true);
      const postingsRef = collection(firestore, "posts");

      if (searchQuery === "") {
        const q = query(postingsRef, orderBy("timestamp", "desc"), limit(8));
        const querySnap = await getDocs(q);
        let postings = [];
        querySnap.forEach((doc) => {
          postings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPostings(postings);
        setLoading(false);
        return;
      }

      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      const regex = new RegExp(lowerCaseSearchQuery, "i");

      const q = query(postingsRef, orderBy("timestamp", "desc"));

      try {
        const querySnap = await getDocs(q);
        let postings = [];
        querySnap.forEach((doc) => {
          const question = doc.data().question.toLowerCase();
          if (question.match(regex)) {
            postings.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        });
        setPostings(postings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user postings:", error);
      }
    }

    const timer = setTimeout(() => {
      fetchUserPostings();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Your search component */}
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div>
        <p className="font-bold text-2xl">Recently posted</p>

        <p className="text-blue-600 hover:text-blue-700 transition ease-in-out duration-150">
          <Link to="/more-posts">Show more posts</Link>
        </p>
        {loading ? (
          <div className="flex items-center justify-center h-56">
            <p className="w-10 h-10 bg-white border-white border-t-blue-200 border-r-blue-500 border-b-blue-800 animate-spin border-2 rounded-full"></p>
          </div>
        ) : (
          <>
            {postings.length > 0 ? (
              <>
                <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-4  ">
                  {postings.map((posting) => (
                    <QuestionCard
                      key={posting.id}
                      id={posting.id}
                      posting={posting.data}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <div className="flex items-center justify-center h-56">
                <p>No questions found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// useEffect(() => {
//     // Define a query to get the most recent 5 questions with images from Firestore
//     const q = query(
//       collection(firestore, 'posts'),
//       orderBy('timestamp', 'desc'),
//       limit(10) // Fetch a larger number of recent posts to ensure you get 5 with images
//     );

//     // Fetch the data
//     getDocs(q)
//       .then((querySnapshot) => {
//         const questionsWithImages = [];
//         querySnapshot.forEach((doc) => {
//           // Map the document data to your question structure
//           const questionData = doc.data();

//           // Include only questions that have images
//           if (questionData.images && questionData.images.length > 0) {
//             questionsWithImages.push({
//               id: doc.id,
//               subject: questionData.subject,
//               course: questionData.course,
//               question: questionData.question,
//               images: questionData.images,
//               // Add other properties here based on your Firestore document structure
//             });
//           }
//         });

//         // Slice the array to get the 5 most recent questions with images
//         const mostRecentQuestions = questionsWithImages.slice(0, 5);

//         console.log('Fetched questions:', mostRecentQuestions);

//         setRecentQuestions(mostRecentQuestions);
//       })
//       .catch((error) => {
//         console.error('Error fetching recent questions:', error);
//       });
//   }, []);

// {/* Render the most recent questions/posts in descending order */
// recentQuestions.map((question) => (
//     <div key={question.id} className="my-4 border border-gray-300 p-4 rounded-md flex">
//       <div className="flex-1">
//         <p className="font-semibold">Subject: {question.subject}</p>
//         <p className="font-semibold">Class: {question.course}</p>
//         <p className="font-semibold">Question: {question.question}</p>
//       </div>

//       <div className="flex-1">
//         <div className="grid grid-cols-2 gap-2">
//           {question.images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Image ${index + 1}`}
//               className="max-h-40 max-w-40 object-cover"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   ))}
