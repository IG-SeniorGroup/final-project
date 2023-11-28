import "./ExplorePage.css";

import React, { useState } from 'react';
import {FaGears, FaComputer} from "react-icons/fa6"
import { FaAtom,  FaRobot } from "react-icons/fa"
import { HiBeaker } from 'react-icons/hi'
import {GiMedicines, GiChemicalDrop } from 'react-icons/gi'
import { FcLandscape,FcBiotech, FcCalculator} from "react-icons/fc";
import {MdElectricBolt} from "react-icons/md"
import { AiTwotoneFire } from "react-icons/ai";
import { Link } from "react-router-dom";
const questions = [
  {
    id: 1,
    title: 'Question 1',
    description: 'Description of question 1',
    previewImage: 'url_to_preview_image_1.jpg', // Replace with your image URLs
    subject: 'Science'
  },
  {
    id: 2,
    title: 'Question 2',
    description: 'Description of question 2',
    previewImage: 'url_to_preview_image_2.jpg', // Replace with your image URLs
  },
  {
    id: 3,
    title: 'Question 3',
    description: 'Description of question 3',
    previewImage: 'url_to_preview_image_2.jpg', // Replace with your image URLs
  },
  {
    id: 4,
    title: 'Question 4',
    description: 'Description of question 4',
    previewImage: 'url_to_preview_image_2.jpg', // Replace with your image URLs
  },
  {
    id: 5,
    title: 'Question 5',
    description: 'Description of question 5',
    previewImage: 'url_to_preview_image_2.jpg', // Replace with your image URLs
  },
  {
    id: 6,
    title: 'Question 6',
    description: 'Description of question 6',
    previewImage: 'url_to_preview_image_2.jpg', // Replace with your image URLs
  },
  {
    id: 7,
    title: 'Question 7',
    description: 'Description of question 7',
    previewImage: 'url_to_preview_image_2.jpg', // Replace with your image URLs
  },
  {
    id: 8,
    title: 'Question 8',
    description: 'Description of question 8',
    previewImage: 'url_to_preview_image_2.jpg', // Replace with your image URLs
  },
  // Add more questions as needed
];
const subjects = [
  { id: 1, name: 'Mathematics' },
  { id: 2, name: 'English' },
  { id: 3, name: 'Science' },
  { id: 4, name: 'History' },
];

const unansweredQuestions = [
  // ... your unanswered questions data
];

const ExplorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const navigateToQuestion = (questionId) => {
    // Replace with your logic to navigate to the individual question page
    console.log(`Navigating to question ${questionId}`);
  };
  const filterQuestionsByCategory = (category) => {
    setSelectedCategory(category);
  };
  const filterQuestionsBySubject = (subject) => {
    setSelectedSubject(subject);
  };
  const filteredQuestions =
    selectedCategory === 'Unanswered'
      ? unansweredQuestions
      : selectedCategory === 'All'
      ? questions.filter(question => selectedSubject === 'All' || question.subject === selectedSubject)
      : questions.filter((question) => question.category === selectedCategory && (selectedSubject === 'All' || question.subject === selectedSubject));


  return (
    <div className="p-6">
       <div className='max-w-6xl mx-auto '>
        <h1 className='mt-5 font-bold text-xl ml-4'>Categories</h1>
        <section>

            <div className='sm:grid md:grid-cols-4 lg:grid-cols-6 flex'>
                <Link to={"/subjects/Computer Science"}>
                    <div className='flex space-x-3'>
                        <div>
                            <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md w-[175px]">
                            <div className="border m-1 bg-slate-200  rounded-full">
                                <FaComputer  className="text-2xl bg-slate-200 m-3 text-slate-400" />
                            </div>

                            <div>
                                <p className="font-semibold text-start text-sm">Computer Science</p>
                                
                            </div>
                            </button>
                        </div>
                    </div>
                </Link>
                <Link to={"/subjects/Biology"}>
                    <div className='flex space-x-3'>
                        <div>
                            <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md w-[175px]">
                            <div className="border m-1 bg-slate-200  rounded-full">
                                <FcBiotech className="text-2xl bg-slate-200 m-3 text-red-300" />
                            </div>

                            <div>
                                <p className="font-semibold text-start text-sm">Biology</p>
                                
                            </div>
                            </button>
                        </div>
                    </div>
                </Link>
                <Link to={"/subjects/Chemistry"}>
                <div className='flex space-x-3'>
                    <div>
                        <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md w-[175px]">
                        <div className="border m-1 bg-slate-200  rounded-full">
                            <HiBeaker className="text-2xl bg-slate-200 m-3 text-green-400" />
                        </div>

                        <div>
                            <p className="font-semibold text-start text-sm">Chemistry</p>
                            
                        </div>
                        </button>
                    </div>
                </div>
                </Link>
                <Link to={"/subjects/Physics"}>
                <div className='flex space-x-3'>
                    <div>
                        <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md w-[175px]">
                        <div className="border m-1 bg-slate-200  rounded-full">
                            <FaAtom className="text-2xl bg-slate-200 m-3 text-cyan-700" />
                        </div>

                        <div>
                            <p className="font-semibold text-start text-sm">Physics</p>
                            
                        </div>
                        </button>
                    </div>
                </div>
                </Link>
                <Link to={"/subjects/Mathematics"}>
                <div className='flex space-x-3'>
                    <div>
                        <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md w-[175px]">
                        <div className="border m-1 bg-slate-200  rounded-full">
                            <FcCalculator className="text-2xl bg-slate-200 m-3" />
                        </div>

                        <div>
                            <p className="font-semibold text-start text-sm">Mathematics</p>
                            
                        </div>
                        </button>
                    </div>
                </div>
                </Link>
                <Link to={"/subjects/Engineering"}>
                <div className='flex space-x-3'>
                    <div>
                        <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md w-[175px]">
                        <div className="border m-1 bg-slate-200  rounded-full">
                            <FaGears className="text-2xl bg-slate-200 m-3 text-slate-600" />
                        </div>

                        <div>
                            <p className="font-semibold text-start text-sm">Engineering</p>
                        </div>
                        </button>
                    </div>
                </div>
                </Link>
                <Link to={"/subjects/Biomedical Science"}>
                <div className='flex space-x-3'>
                            
                    <div>
                        <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md w-[175px]">
                        <div className="border m-1 bg-slate-200  rounded-full">
                            <GiMedicines className="text-2xl bg-slate-200 m-3 text-red-600" />
                        </div>

                        <div>
                            <p className="font-semibold text-start text-sm">Biomedical Science</p>
                            
                        </div>
                        </button>
                    </div>
                </div>
                </Link>
                <Link to={"/subjects/Environmental Science"}>
                <div className='flex space-x-3'>
                    <div>
                        <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md w-[175px]">
                        <div className="border m-1 bg-slate-200  rounded-full">
                            <FcLandscape className="text-2xl bg-slate-200 m-3" />
                        </div>

                        <div>
                            <p className="font-semibold text-start text-sm">Environmental Science</p>
                            
                        </div>
                        </button>
                    </div>
                </div>
                </Link>
                <Link to={"/subjects/Chemical Engineering"}>
                <div className='flex space-x-3'>
                    <div>
                        <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md w-[175px]">
                        <div className="border m-1 bg-slate-200  rounded-full">
                            <GiChemicalDrop  className="text-2xl bg-slate-200 m-3 text-green-600" />
                        </div>

                        <div>
                            <p className="font-semibold text-start text-sm">Chemical Engineering</p>
                            
                        </div>
                        </button>
                    </div>
                </div>
                </Link>
                <Link to={"/subjects/Electrical Engineering"}>
                <div className='flex space-x-3'>
                    <div> 
                        <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md w-[175px]">
                        <div className="border m-1 bg-slate-200  rounded-full">
                            <MdElectricBolt className="text-2xl bg-slate-200 m-3 text-yellow-300" />
                        </div>

                        <div>
                            <p className="font-semibold text-start text-sm">Electrical Engineering</p>
                            
                        </div>
                        </button>
                    </div>
                </div>
                </Link>
                <Link to={"/subjects/Mechanical Engineering"}>
                <div className='flex space-x-3'>
                    <div>
                        <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md w-[175px]">
                        <div className="border m-1 bg-slate-200  rounded-full">
                            <FaRobot className="text-2xl bg-slate-200 m-3 text-cyan-600" />
                        </div>

                        <div>
                            <p className="font-semibold text-start text-sm">Mechanical Engineering</p>
                            
                        </div>
                        </button>
                    </div>
                </div>
                </Link>
            </div>
        </section>
        <div className='mt-4 mx-4'>
            <h1 className='flex items-center space-x-2 text-lg font-semibold'>
                Trending Questions
                <AiTwotoneFire className='text-orange-600' />
                
            </h1>
        </div>
        


    </div>
  
  
       
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 relative"
            onClick={() => navigateToQuestion(question.id)}
          >
            
            <div className="h-40 mb-4 overflow-hidden rounded-lg">
              <img
                src={question.previewImage}
                alt={`Preview for ${question.title}`}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
            <p className="text-gray-600">{question.description}</p>
            
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;