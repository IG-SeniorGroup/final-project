import React, { useState,useEffect } from 'react'

import { firestore, collection} from './firebase';
import { getAuth } from 'firebase/auth';
import {  getDocs, orderBy, query, where } from 'firebase/firestore';
import QuestionCard from '../components/QuestionCard';

export default function MyQuestions() {
    const [postings, setPostings] = useState(false);
    const auth = getAuth()
    useEffect(() => {
        async function fetchUserPostings(){
            const postingsRef = collection(firestore, "posts");
            const q = query(postingsRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"))
            const querySnap  = await getDocs(q)
            let postings = [];
            querySnap.forEach((doc) => {
                return postings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setPostings(postings)
    
        }
        fetchUserPostings()
    
    },[])
  return (
    
    <div className=' max-w-6xl px-3 mt-6 mx-auto justify-center min-h-screen'>
        <p className='text-center mb-9 text-3xl font-bold'>My Questions</p>
        {postings.length > 0 && (
            <>
            
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                {postings.map((posting) =>(
                    <QuestionCard
                    key = {posting.id}
                    id = {posting.id}
                    posting = {posting.data}
                    
                    
                    />
                ))}
            </ul>

            
            
            </>
          )}
    </div>
  )
}
