import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { firestore } from './firebase';
import Spinner from '../components/Spinner';
import QuestionCard from '../components/QuestionCard';

export default function Subjects() {
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const [postings, setPostings] = useState(null);
    const [lastFetchedPosting, setLastFetchPosting] = useState(null);
    
    useEffect(() => {
        async function fetchPosting() {
            
                const postingRef = collection(firestore, "posts");
                const q = query(postingRef, where("subject", "==", params.subjectName), orderBy("timestamp", "desc"), limit(8));
                const querySnap= await getDocs(q)
                const lastVisible = querySnap.docs[querySnap.docs.length - 1];
                setLastFetchPosting(lastVisible)
                const posting = []
                querySnap.forEach((doc) => {
                    return posting.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                })
                console.log(posting)
                setPostings(posting)
                setLoading(false)
            
        }
        fetchPosting()
    }, [params.subjectName])

    async function onFetchMorePostings(){
        try {
            const postingRef = collection(firestore, "posts")
            const q = query(postingRef, where("subject", "==", params.subjectName), orderBy("timestamp", "desc"),
            startAfter(lastFetchedPosting), limit(4))
            const querySnap = await getDocs(q);
            const lastVisible = querySnap.docs[querySnap.docs.length - 1]
            const posting = [];
            
            querySnap.forEach((doc) => {
                return posting.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setPostings((prevState) => [...
            prevState, ...posting]);
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return <Spinner />
    }
    

  return (
    <div className='max-w-6xl mx-auto'>
        <div className='mt-5'>
            <h1 className='text-center font-semibold text-xl mb-5'>
                All {params.subjectName} postings
            </h1>
            {loading ? (
                <Spinner  />
            ) :  postings && postings.length > 0 ? (
                <>
                <main>
                    <ul className=' sm:grid lg:grid-cols-4 md:grid-cols-3'>
                        {postings.map((posting) => (
                            <QuestionCard key={posting.id} id = {posting.id} posting = {posting.data} />
                        ))}

                    </ul>
                </main>
                </>

            ) : <p> There is no questions for this subject</p> }

        
        </div>
    </div>
  )
}