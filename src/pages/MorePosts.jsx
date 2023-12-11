import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, orderBy, getDocs, limit, startAfter } from "firebase/firestore";
import { firestore } from "./firebase";
import Search from "../components/Search";
import QuestionCard from "../components/QuestionCard";

export default function MorePosts() {
  const [lastFetchedPosting, setLastFetchPosting] = useState(null);
  const [postings, setPostings] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    async function fetchUserPostings() {
      try {
        setLoading(true);
        const postingsRef = collection(firestore, "posts");

        if (searchQuery === "") {
          const q = query(postingsRef, orderBy("timestamp", "desc"), limit(8));
          const querySnap = await getDocs(q);
          const lastVisible = querySnap.docs[querySnap.docs.length - 1];
          setLastFetchPosting(lastVisible);
          let postings = [];
          querySnap.forEach((doc) => {
            return postings.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setPostings(postings);
          setLoading(false);
        } else {
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          const regex = new RegExp(lowerCaseSearchQuery, "i");

          const q = query(postingsRef, orderBy("timestamp", "desc"));
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
        }
      } catch (error) {
        console.log("no more");
      }
    }
    const timer = setTimeout(() => {
      fetchUserPostings();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  async function onFetchMorePostings() {
    try {
      const postingsRef = collection(firestore, "posts");

      if (searchQuery === "") {
        const q = query(
          postingsRef,
          orderBy("timestamp", "desc"),
          startAfter(lastFetchedPosting),
          limit(8)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchPosting(lastVisible);
        let postings = [];
        querySnap.forEach((doc) => {
          return postings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPostings((prevState) => [...prevState, ...postings]);
        setLoading(false);
      } else {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        const regex = new RegExp(lowerCaseSearchQuery, "i");

        const q = query(
          postingsRef,
          orderBy("timestamp", "desc"),
          startAfter(lastFetchedPosting)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchPosting(lastVisible);
        let postings = [];
        querySnap.forEach((doc) => {
          const question = doc.data().question.toLowerCase();
          if (question.match(regex)) {
            return postings.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        });
        setPostings((prevState) => [...prevState, ...postings]);
        setLoading(false);
      }
    } catch (error) {
      console.log("no more");
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div>
        <p className="font-bold text-3xl text-center p-4 mb-10 ">All Posts</p>
        {loading ? (
          <div className="flex items-center justify-center h-56">
            <p className="w-10 h-10 bg-white border-white border-t-blue-200 border-r-blue-500 border-b-blue-800 animate-spin border-2 rounded-full"></p>
          </div>
        ) : (
          <>
            {postings.length > 0 ? (
              <>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                  {postings.map((posting) => (
                    <QuestionCard
                      key={posting.id}
                      id={posting.id}
                      posting={posting.data}
                    />
                  ))}
                </ul>
                {lastFetchedPosting && (
                  <div className="flex items-center justify-center">
                    <button
                      onClick={onFetchMorePostings}
                      className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded ease-in-out-"
                    >
                      Load more
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-56">
                <p>No questions found</p>
              </div>
            )}
          </>
        )}

        <p className="text-blue-600 hover:text-blue-700 transition ease-in-out duration-150">
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
