// import React from 'react'
// import { FaGithub, FaLinkedin } from 'react-icons/fa'

// const Profile = ({}) => {
//   return (
//     <>
// <section class="relative block h-[50vh]">

//     <div class="bg-profile-background absolute top-0 h-full w-full bg-cover bg-center scale-105">
//     </div>
// <div class="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center">
//     </div>
// </section>
// <section class="relative bg-white py-16">
//     <div class="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
//     <div class="container mx-auto">
//     <div class="flex flex-col lg:flex-row justify-between">
//     <div class="relative flex gap-6 items-start">
//     <div class="-mt-20 w-40">
//     <img src={profile?.profileImage || Profilepic} alt="Profile picture" class="inline-block relative object-cover object-center !rounded-full rounded-lg h-full w-full"/>
//     </div>
// <div class="flex flex-col mt-2">
//     <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900" style={{ animationDuration: `${profile.firstName.length / 10}s` }}>
//     {profile.firstName}</h4>
// <p class="block antialiased font-sans text-base leading-relaxed text-gray-700 !mt-0 font-normal">
// {profile.email}</p>
// </div>
// </div>
// <div class="mt-10 mb-10 flex lg:flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
    
    
    
//     <div>
//     {params.profileId !== auth.currentUser?.uid && !contactUser && (

//     <button 
//                                             onClick={() => setContactUser(true)}

//     class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-gray-900 w-fit lg:ml-auto" type="button">
//     Contact
    
//     </button>
//                                 )}

//     {contactUser && (

//    <SendMessage userRef={params.profileId} />
//     )}
//     </div>





// <div class="flex justify-start py-4 pt-8 lg:pt-4">
//     <div class="mr-4 p-3 text-center">
//     <p class="block antialiased font-sans text-xl leading-relaxed text-blue-gray-900 font-bold uppercase">
//     22</p>
// <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
//     Friends</p>
// </div>
// <div class="mr-4 p-3 text-center">
//     <p class="block antialiased font-sans text-xl leading-relaxed text-blue-gray-900 font-bold uppercase">
//     10</p>
// <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
//     Photos</p>
// </div>
// <div class="p-3 text-center lg:mr-4">
//     <p class="block antialiased font-sans text-xl leading-relaxed text-blue-gray-900 font-bold uppercase">
//     89</p>
// <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
//     Comments</p>
// </div>
// </div>
// </div>
// </div>
// <div class="-mt-4 container space-y-2">
//     <div class="flex items-center gap-2">
//     <FaLinkedin className='text-blue-600' />
// <p class="block antialiased font-sans text-base leading-relaxed font-medium text-blue-gray-500">
// {profile.linkedin}
// </p>
// </div>
// <div class="flex items-center gap-2">
// <FaGithub className='' />

// <p class="block antialiased font-sans text-base leading-relaxed font-medium text-blue-gray-500">
// {profile.gitHub}</p>
// </div>
// <div class="flex items-center gap-2">
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="-mt-px h-4 w-4 text-blue-gray-500">
//     <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z">
//     </path>
// <path fill-rule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clip-rule="evenodd">
//     </path>
// <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z">
//     </path>
// </svg>
// <p class="block antialiased font-sans text-base leading-relaxed font-medium text-blue-gray-500">
//     University of Computer Science</p>
// </div>
// </div>
// <div class="mb-10 py-6">
//     <div class="flex w-full flex-col items-start lg:w-1/2">
//     <p class="block antialiased font-sans text-base leading-relaxed mb-6 font-normal text-blue-gray-500">
//     An artist of considerable range, Jenna the name taken by Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>
// <button class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button">
//     Show more</button>
// </div>
// </div>
// </div>
// </div>
// </section>

// </>
//   )
// }

// export default Profile
