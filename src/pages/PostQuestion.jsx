import React, { useState } from 'react';
import { auth, firestore } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

export default function PostQuestion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: '',
    subject: '',
    course: '',
    images: [],
  });
  const [imageCount, setImageCount] = useState(0);
  const [uploading, setUploading] = useState(false);

  const { question, subject, images, course } = formData;

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
      if (!subject) {
        // Subject not selected, display an error message or alert
        alert('Please select a subject before posting your question.');
        return;
      }
      setUploading(true);
  
      let imageUrls = [];
  
      if (images.length === 0) {
        // If no images were uploaded, use the default image URL
        const defaultImageUrl = '/image.svg';
        imageUrls.push(defaultImageUrl);
      } else {
        imageUrls = await uploadImages(images);
      }
  
      const docRef = await addDoc(collection(firestore, 'posts'), {
        question,
        subject,
        course,
        images: imageUrls,
        timestamp: serverTimestamp(),
        userRef: auth.currentUser.uid,
      });
  
      console.log('Question posted successfully:', docRef.id);
      navigate('/');
    } catch (error) {
      console.error('Error posting question:', error);
    }
    setUploading(false);
  }
  

  return (
    <div>
      <main className="max-w-md px-2 mx-auto">
        <h1 className="text-center mt-6 font-bold text-3xl">Post a new question</h1>
        {uploading ? ( // Check if uploading is true
        <Spinner /> // Render the spinner while uploading
      ) : 
        <form onSubmit={handlePosting}>
          <p className="mt-10 font-semibold text-lg">Ask your question</p>
          <textarea
            type="text"
            id="question"
            value={question}
            onChange={onChange}
            required
            className="w-full border-2 border-slate-500 rounded-lg bg-slate-50 px-4 hover:border-slate-950 transition duration-300 ease-in-out text-xl"
          />
          <div className="flex mt-6 space-x-6 justify-start">
            <div>
              <p className="font-semibold text-lg">Select a subject</p>
              <select
                onChange={onChange}
                id="subject"
                value={subject}
                className="border-2 p-2 border-slate-500 bg-slate-50 px-4 rounded-lg text-lg w-full hover:border-slate-950 transition duration-300 ease-in-out"
              >
                <option value="">Select Subject</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Physics">Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Environmental Science">Environmental Science</option>
                <option value="Biomedical Science">Biomedical Science</option>
                <option value="Chemical Engineering">Chemical Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Electronics Engineering">Electronics Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </select>
            </div>
            <div>
              <p className="font-semibold text-lg">Course Title</p>
              <input
                type="text"
                id="course"
                value={course}
                maxLength="15"
                onChange={onChange}
                required
                className="border-2 border-slate-500 bg-slate-50 w-full p-2 rounded-lg hover:border-slate-950 transition duration-300 ease-in-out"
              />
            </div>
          </div>
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
            Post Question
          </button>
        </form>
}
    </main>
    </div>
  );
}

