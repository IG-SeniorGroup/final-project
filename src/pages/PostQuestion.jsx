import React, { useState } from 'react'
import { firestore } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

export default function PostQuestion() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        question: "",
        subject: "",
        course: "",
        images: {},
    })
    const {question, subject, images, course} = formData

    function onChange(e) {
        let boolean = null;
        if (e.target.files) {
            setFormData((prevState) => ({
              ...prevState,
              images: e.target.files,
            }));
          }
        if (!e.target.files) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: boolean ?? e.target.value,
            
        }));
        }

    }


  return (
    <div>
        <main className='max-w-md px-2 mx-auto'>
            <h1 className='text-center mt-6 font-bold text-3xl'>Post a new question</h1>
            <form onSubmit={handlePosting}>
                <p className='mt-10 font-semibold text-lg'>Ask your question</p>
                <textarea
                    type = "text"
                    id = "question"
                    value = {question}
                    onChange={onChange}
                    required
                    className='w-full border-2 border-slate-500  rounded-lg bg-slate-50 px-4 hover:border-slate-950 transition duration-300 ease-in-out text-xl'
                     />
                <div className='flex mt-6 space-x-6 justify-start'>

                    <div>

                        <p className=' font-semibold  text-lg'>Select a subject</p>
                        <select onChange={onChange}
                        id = "subject"
                        value={subject}
                        className='border-2 p-2 border-slate-500 bg-slate-50  px-4 rounded-lg text-lg w-full hover:border-slate-950 transition duration-300 ease-in-out'>
                            <option value="Math">Math</option>
                            <option value="Science">Science</option>
                            
                        </select>
                    </div>
                    <div >
                        <p className='font-semibold  text-lg'> Course Title</p>
                        <input 
                            type = "text"
                            id = "course"
                            value={course}
                            maxLength="15"
                            onChange={onChange}
                            required
                            className='border-2 border-slate-500  bg-slate-50   w-full p-2 rounded-lg hover:border-slate-950 transition duration-300 ease-in-out'/>
                    </div>
                </div>
                <p className='mt-6 font-semibold  text-lg'>Images</p>
                <p className='text-xs'>The first Image will the the cover (max 2).</p>
                <input
                    type='file'
                    id = "images"
                    onChange = {onChange}
                    accept='.jpg, .png, .jpeg, .heic'
                    multiple
                    className='w-full p-2  bg-slate-50 border-2 border-slate-500 rounded-lg hover:border-slate-950 transition duration-300 ease-in-out'/>

                
                <button className= " mt-10 w-full bg-[#7CA0FB] text-white px-7 py-3 text-lg font-semibold uppercase rounded-xl   shadow-md hover:bg-blue-400 transition duration-400 ease-in-out hover:shadow-lg active:bg-blue-600" type = "submit">Post Question</button>
            </form>

        </main>
    </div>
  )
}
