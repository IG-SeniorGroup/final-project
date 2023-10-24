import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

export default function QuestionCard({posting, id}) {
  return (
    <li className="relative flex flex-col border justify-between items-center shadow-md hover:shadow-xl rounded-xl overflow-hidden transition-shadow duration-150 m-[10px]">
        <Link className="contents" to={`/category/${posting.subject}/${id}`}>
            <img
            className='h-[220px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in border rounded-xl'
            loading='lazy'
            src={posting.images[0]}
        />
        </Link>
        <Moment
            className='absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg' fromNow>
                {posting.timestamp?.toDate()}
        </Moment>
        <div className='w-full p-[10px]'>
            <div className='flex items-center justify-center space-x-5 text-lg'>
                
                <p className='font-bold  mb-[2px]  truncate '>
                    {posting.subject}
                </p>
                <p className='font-bold  mb-[2px]  truncate '>
                    {posting.course}
                </p>


            </div>
            
            <p className='font-semibold m-0 text-md '>{posting.question}</p>

        </div>

        

  </li>
  )
}
