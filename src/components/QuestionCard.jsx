import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export default function QuestionCard({ posting, id }) {
  return (
    <li className="w-full max-w-sm min-h-[400px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
    <Link to={`/category/${posting.subject}/${id}`} className="flex-grow">
      <div className="relative">
        <img
          className="p-8 rounded-t-lg w-full h-48 object-cover"
          loading="lazy"
          src={posting.images[0]}
          alt="product image"
        />
        <Moment
          className="absolute top-2 left-2 bg-[#E1DFFD] text-[#3F3F3F] uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {posting.timestamp?.toDate()}
        </Moment>
      </div>
    </Link>
    <div className="px-5 pb-5">
      <div>
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mt-4">
            {posting.question}
          </h5>
        </a>
      </div>
      <div className="flex items-end justify-between mt-2">
        <span className="text-md font-bold text-gray-900 dark:text-[#E1DFFD]">
          {posting.subject}
        </span>
        <a
          href="#"
          className="text-[#E1DFFD] bg-[#3F3F3F] hover:bg-blue-800 focus:ring-4 font-semibold focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {posting.course}
        </a>
      </div>
    </div>
  </li>
  
  );
}
