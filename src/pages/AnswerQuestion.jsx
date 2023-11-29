import { doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { auth, firestore } from './firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Spinner from '../components/Spinner';

export default function AnswerQuestion() {
    const navigate = useNavigate();
    const [subject, setSubject] = useState('');
    const [posting, setPosting] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageCount, setImageCount] = useState(0);
    const [uploading, setUploading] = useState(false);
    const params = useParams()
    const [formData, setFormData] = useState({
        answer: '',
        images: [],
    });
    const { answer, images } = formData;

    const userId = auth.currentUser.uid;

    // Define initial user data
    const initialUserData = {
        firstName: '',
        lastName: '',
    };

    const [userData, setUserData] = useState(initialUserData);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userDocRef = doc(firestore, "users", userId);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserData(userData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchUserData();
    }, [userId]);

    // Get the user's first name and last name from userData
    const userFirstName = userData.firstName;
    const userLastName = userData.lastName;
    const userDisplayName = `${userFirstName} ${userLastName}` || '';

    useEffect(() => {
        async function fetchPosting() {
            const docRef = doc(firestore, "posts", params.postingId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const postData = docSnap.data();
              setPosting(postData);
              setSubject(postData.subject);
              setLoading(false);
      
              // Fetch associated answers and count their quantity
              const answersSnapshot = await getDocs(
                  query(collection(firestore, 'answers'), where('postingId', '==', params.postingId))
              );
              const answerCount = answersSnapshot.size;
              postData.answerCount = answerCount; // Store the answer count in postData
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

    function removeImage(index) {
        setFormData((prevState) => {
          const updatedImages = [...prevState.images];
          setImageCount(prevCount => prevCount - 1);
          updatedImages.splice(index, 1);
          return { ...prevState, images: updatedImages };
        });
      }
      async function uploadImages(imageFiles) {
        const imageUrls = [];
        for (const imageFile of imageFiles) {
          const storage = getStorage();
          const imageRef = ref(storage, 'images/' + imageFile.name);
          await uploadBytes(imageRef, imageFile);
          const imageUrl = await getDownloadURL(imageRef);
          imageUrls.push(imageUrl);
        }
    
        return imageUrls;
      }
    
      async function handlePosting(e) {
        e.preventDefault();
        try {
          setUploading(true);
      
          let imageUrls = [];
      
          if (images.length > 0) {
            // If images were uploaded, get their URLs
            imageUrls = await uploadImages(images);
          }
      
          const docRef = await addDoc(collection(firestore, 'answers'), {
            answer,
            images: imageUrls,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,
            userDisplayName,
            postingId: params.postingId,
          });

          // Mark the question as answered by updating its 'answered' field
    const postRef = doc(firestore, 'posts', params.postingId);
    await updateDoc(postRef, { answered: true }); // Update the 'answered' field to true

      
          console.log('Question posted successfully:', docRef.id);
          const questionUrl = `/category/${subject}/${params.postingId}`;
          navigate(questionUrl);
        } catch (error) {
          console.error('Error posting question:', error);
        }
        setUploading(false);
      }
    return (
        <form onSubmit={handlePosting}>
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
                        <div><Spinner /></div>
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
          <div className="mt-4">
            {images.map((image, index) => (
              <div key={index} className="flex justify-between">
                <p>{image.name}</p>
                <button type="button" onClick={() => removeImage(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            className="mt-6 w-full bg-[#7CA0FB] text-white px-7 py-3 text-lg font-semibold uppercase rounded-xl shadow-md hover:bg-blue-400 transition duration-400 ease-in-out hover:shadow-lg active:bg-blue-600"
            type="submit"
          >
            Post Answer
          </button>
            </div>
        </div>
        </form>
        
    )

            }