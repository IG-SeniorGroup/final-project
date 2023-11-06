import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { firestore } from './firebase';
import Spinner from '../components/Spinner';

export default function AnswerQuestion() {
    const [posting, setPosting] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageCount, setImageCount] = useState(0);
    const params = useParams()
    const [formData, setFormData] = useState({
        answer: '',
        images: [],
    });
    const { answer, images } = formData;

    useEffect(() => {
        async function fetchPosting() {
            const docRef = doc(firestore, "posts", params.postingId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPosting(docSnap.data());
                setLoading(false);
            }
        }
        fetchPosting();
    }, [params.postingId]);

    function onChange(e) {
        const { id, value, files } = e.target;
        if (id === 'images') {
            if (imageCount < 2) {
                // Handle image file selection, limit to 2 images
                setFormData((prevState) => ({
                    ...prevState,
                    images: [...prevState.images, ...files],
                }));
                setImageCount(prevCount => prevCount + files.length);
            } else {
                // Display a message or alert the user about the limit
                alert('You can only upload a maximum of 2 images.');
            }
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [id]: value,
            }));
        }
    }

    return (
        <div className='max-w-2xl mx-auto px-3'>
            <div className='mt-10 text-center font-bold text-2xl'>
                <p>Answer question</p>
            </div>
            <div>

                <div className='mt-4 flex space-x-2 items-center'>
                    <p className='text-lg font-semibold'>
                        Question:
                    </p>
                    {loading ? (
                        <p><Spinner /></p>
                    ) : (
                        <p> {posting?.question}</p>
                    )}
                </div>
                <div>
                    <textarea
                        type="text"
                        id="answer"
                        value={answer}
                        onChange={onChange}
                        required
                        className="w-full mt-2 border-2 border-slate-500 rounded-lg bg-slate-50 px-4 hover:border-slate-950 transition duration-300 ease-in-out text-xl"
                    />
                </div>
                
            </div>
            <div>
            <p className="mt-6 font-semibold text-lg">Images</p>
          <p className="text-xs">The first image will be the cover (max 2).</p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg, .png, .jpeg, .heic"
            multiple
            className="w-full p-2 bg-slate-50 border-2 border-slate-500 rounded-lg hover-border-slate-950 transition duration-300 ease-in-out"
            disabled={imageCount >= 2}
          />
            </div>
        </div>
    )
}
