import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // Import 'auth' from your 'firebase.js'
import OAuth from '../components/OAuth';

export default function Login() {


  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { email, password } = formData;
  const navigate = useNavigate();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function handleSignIn(e) {
    e.preventDefault();

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true); // Set loading state

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);

      navigate('/');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Error signing in:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  return (
    <div>
      <section>
        <h1 className="text-center p-4 text-5xl font-bold">Login</h1>
        <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
          <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
            <img src='https://images.unsplash.com/photo-1616400619175-5beda3a17896?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80' alt="key" className='w-full rounded-2xl'/>
          </div>
          <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
            <form onSubmit={handleSignIn}>
              <div>
                <p className='font-semibold'>Email</p>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  placeholder="name@gmail.com"
                  className="w-full px-4 py-2  text-xl border border-gray-300 rounded placeholder-opacity-50"
                />
              </div>
              <div className="mt-5">
                <p className="text-start font-semibold">Password</p>
                <div className="relative mb-6">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"
                    className="w-full px-4 py-2 text-xl text-gray-700 placeholder-opacity-50 bg-white border border-gray-300 rounded transition ease-in-out"
                  />
                  {showPassword ? (
                    <AiFillEyeInvisible
                      className="absolute right-3 top-3 text-xl cursor-pointer"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    />
                  ) : (
                    <AiFillEye
                      className="absolute right-3 top-3 text-xl cursor-pointer"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    />
                  )}
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                className="w-full bg-[#7ca0fb] text-white px-7 py-3 font-semibold uppercase rounded-xl hover:bg-blue-500 transition duration-150 ease-in-out hover:shadow-lg active-bg-blue-600"
                type="submit"
                disabled={loading} // Disable the button during loading
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <p className='mt-6 text-center text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out'>
                            <Link to = "/forgot-password" className=''>Forgot Password</Link>
                        </p>
                        <div className='flex space-x-4 mt-4 items-center justify-center'>
                          
                              <p className='font-semibold '>Don't have an account?</p>
                              <p className='text-center text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out'>
                              <Link to = "/create-account" className=''>Sign up</Link>
                              </p>
                          
                          </div>
                <div className='flex items-center my-4 before:border-t before:flex-1  before:border-gray after:border-t after:flex-1  after:border-gray-300' >
                  <p className='text-center font-semibold mx-4'>OR</p>
                </div>
                <OAuth />
            
            </form>
            
          </div>
        </div>
      </section>
    </div>
  );
}
