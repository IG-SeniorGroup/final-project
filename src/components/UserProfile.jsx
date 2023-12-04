import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { doc, firestore, getDoc } from '../pages/firebase';
import Spinner from './Spinner';
import { FaLinkedin, FaGithub } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import Profilepic from '../assets/profilepic.png';
import { getAuth } from 'firebase/auth';
import SendMessage from './SendMessage';

export default function UserProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [contactUser, setContactUser] = useState(false);
    const params = useParams()
    const auth = getAuth()
    useEffect(() => {
        async function fetchPosting() {
            const docRef = doc(firestore, "users", params.profileId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProfile(docSnap.data());
                setLoading(false);
            }
        }

        fetchPosting();
    }, [params.profileId]);

    return (
        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
            <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>

                {loading ? (
                    <p><Spinner /></p>
                ) : profile ? (
                    <div >
                        <div className='flex text-4xl space-x-2 font-bold pb-6 '>
                            <p>I'm</p>
                            <h5 className='type' style={{ animationDuration: `${profile.firstName.length / 10}s` }}>{profile.firstName}</h5>
                        </div>
                        <div className='pb-6'>
                            <p>
                                {profile.description}
                            </p>

                        </div>
                        <div>
                            <p className='pb-4'>Let's connect:</p>
                            <div className='flex space-x-2 items-center pb-2'>
                                <MdEmail className='' />
                                <p>{profile.email}</p>
                            </div>
                            <div className='flex space-x-2 items-center pb-2'>
                                <FaLinkedin className='text-blue-600' />
                                <p>{profile.linkedin}</p>
                            </div>
                            <div className='flex space-x-2 items-center '>
                                <FaGithub className='' />
                                <p>{profile.gitHub}</p>
                            </div>
                        </div>
                        <div>
                            {params.profileId !== auth.currentUser?.uid && !contactUser && (
                                <div className=''>
                                    <button
                                        onClick={() => setContactUser(true)}
                                        className='w-full mt-4 bg-[#7ca0fb] text-white px-7 py-3 font-semibold uppercase rounded-xl hover:bg-blue-500 transition duration-150 ease-in-out hover:shadow-lg active-bg-blue-600'
                                    >
                                        Contact {profile.firstName}
                                    </button>
                                </div>

                            )}
                            {contactUser && (
                                <SendMessage userRef={params.profileId} />
                            )}
                        </div>
                    </div>
                ) : (
                    <p>Profile not found</p>
                )}
            </div>
            <div className='md:w-[67%] lg:w-[50%] mb-12'>
                <img
                    src={profile?.profileImage || Profilepic}
                    alt="Profile"
                    className='w-full rounded-lg'
                />
            </div>

        </div>
    );
}
