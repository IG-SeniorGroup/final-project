import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Navbar() {
  const [pageState, setPageState] = useState('Sign in');
  const auth = getAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState('Settings');
      } else {
        setPageState('Login');
      }
    });
  }, []);

  function pathMatchRoute(route) {
    return route === location.pathname;
  }

  return (
    <div className='bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40'>
      {/* Announcement Section */}
      <div className='bg-blue-400 text-white text-center py-2'>
        <p className='text-sm'>Important announcement: The site is currently under maintenance.</p>
      </div>
      {/* Header */}
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <img
            src='/logo.svg'
            alt='Logo'
            style={{ height: '40px', width: 'auto' }}
            onClick={() => navigate('/')}
          />
        </div>
        <div>
          <ul className='flex space-x-10'>
          <li className={`cursor-pointer py-3 text-sm font-semibold  border-b-[3px] border-b-transparent ${pathMatchRoute("/") && " !border-b-[#7CA0FB]"}`}onClick={()=>navigate("/")}>Home</li>
              <li className={`cursor-pointer py-3 text-sm font-semibold  border-b-[3px] border-b-transparent ${pathMatchRoute("/explore") && " !border-b-[#7CA0FB]"}`}onClick={()=>navigate("/explore")}>Explore</li>
              <li className={`cursor-pointer py-3 text-sm font-semibold  border-b-[3px] border-b-transparent ${pathMatchRoute("/learning-resources") && " !border-b-[#7CA0FB]"}`}onClick={()=>navigate("/learning-resources")}>Resources</li>
              <li className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] border-b-transparent ${(pathMatchRoute("/login") || pathMatchRoute("/settings") )&& " !border-b-[#7CA0FB]"}`}onClick={()=>navigate("/settings")}>{pageState}</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
