import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';

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
<div className='shadow-sm sticky top-0 z-40' style={{
  background: '#E1DFFD' 
}}>
      {/* Announcement Section */}
      <div className='bg-black text-white text-center py-2'>
        <p className='text-sm font-semibold tracking-wider '>Important announcement: We are working on adding Chatbots for Students.</p>
      </div>
      {/* Header */}
      <header className='flex justify-between items-center px-3 max-w-6xl h-20 mx-auto'>
        <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <Link to={'/'} className='cursor-pointer'>
          <img
            src='/logo.svg'
            alt='Logo'
            style={{ height: '40px', width: 'auto' }}
            onClick={() => navigate('/')}
          />
          </Link>
        </div>
        <div>
          <ul className='flex space-x-8 items-center text-white uppercase tracking-[1px]'>
          <li className={`cursor-pointer py-3 text-sm font-bold text-[#3F3F3F] border-b-[3px] hover:text-[#0088FF] border-b-transparent ${pathMatchRoute("/") && " !border-b-[#0088FF]"}`}onClick={()=>navigate("/")}>Home</li>
              <li className={`cursor-pointer py-3 text-sm font-bold text-[#3F3F3F]  border-b-[3px] hover:text-[#0088FF] border-b-transparent ${pathMatchRoute("/explore") && " !border-b-[#0088FF]"}`}onClick={()=>navigate("/explore")}>Explore</li>
              <li className={`cursor-pointer py-3 text-sm font-bold text-[#3F3F3F]  border-b-[3px] hover:text-[#0088FF] border-b-transparent ${pathMatchRoute("/learning-resources") && " !border-b-[#0088FF]"}`}onClick={()=>navigate("/learning-resources")}>Resources</li>
              <li className={`cursor-pointer rounded-2xl py-3 text-sm text-[#3F3F3F] font-bold border-[3px] border-[#]  px-3 hover:text-white hover:bg-[#0088FF] hover:text-[#3F3F3F] ${(pathMatchRoute("/login") || pathMatchRoute("/settings") )&& " !border-[#3F3F3F]"}`}onClick={()=>navigate("/settings")}>{pageState}</li>
          
          </ul>
        </div>
      </header>
    </div>
  );
}
