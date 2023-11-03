import React from 'react'
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../components/Search';

export default function Home() {
    const [input, setInput] = useState("");
  return (
    <div className='max-w-6xl mx-auto'>
        <Search />
        <div>
            <p className='font-bold text-2xl'>Recently posted</p>
            <p className='text-blue-600 hover:text-blue-700 transition ease-in-out duration-150'>
                <Link to = "">
                    Show more posts
                </Link>
            </p>

                                                    {/* recently posted query */}
             
        </div>
    </div>
  )
}
