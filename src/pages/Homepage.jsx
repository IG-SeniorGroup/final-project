import React, { useRef } from 'react';
import { Parallax, ParallaxLayer} from '@react-spring/parallax'

import { FcBiotech } from 'react-icons/fc';

export default function Homepage() {
    const ref = useRef();
  return (
    <div>
        <Parallax pages = {2} className='bg-[#014D4E]'>
            <ParallaxLayer
            offset = {0}
            speed = {1}
            style={{
                backgroundImage: `url(https://awv3node-homepage.surge.sh/build/assets/stars.svg)`,
                backgroundSize: 'cover',
            }}
            className=''
            onClick={() => ref.current.scrollTo(1)}
            />
             
            



            <ParallaxLayer offset={0} speed={1} onClick={() => ref.current.scrollTo(1)}>
                <div className='h-screen flex flex-col items-center justify-center'>
                    <h1 className='text-5xl font-bold shine-effect'>BrailLink</h1>
                    <h2 className='max-w-2xl mx-auto p-5 text-2xl text-slate-300' >Tailor your learning experience. With BrainLink, you're in control. Explore questions, discover new perspectives, and learn at your own pace.</h2>
                    <div className='flex space-x-3'>
                        <div>
                            <button className="flex items-center justify-start px-2 m-2 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out  hover:border-5 shadow-md  w-[175px]">
                                <div className="border m-1 bg-slate-200  rounded-full">
                                    <FcBiotech className="text-2xl bg-slate-200 m-3 text-red-300" />
                                </div>
            
                                <div>
                                    <p className="font-semibold text-start text-sm">Biology</p>
                                    
                                </div>
                            </button>
                        </div>
                    </div>

                </div>
        </ParallaxLayer>
        <ParallaxLayer sticky={{ start:0.2, end: 1.5}} speed={-.6}>
            <img src="https://awv3node-homepage.surge.sh/build/assets/satellite4.svg" style={{ width: '15%', marginLeft: '80%' }} />
            </ParallaxLayer>
            <ParallaxLayer offset={0} speed={.3}  style={{opacity: 0.2}}>

            <img src="https://awv3node-homepage.surge.sh/build/assets/cloud.svg" style={{ display: 'block', width: '15%', marginLeft: '75%' , marginTop: '40%'}}/>
            <img src="https://awv3node-homepage.surge.sh/build/assets/cloud.svg" style={{ display: 'block', width: '5%', marginLeft: '25%' , marginTop: '1%'}}/>
            </ParallaxLayer>
            <ParallaxLayer offset={0} speed={.1}  style={{opacity: 0.3}}>

            <img src="https://awv3node-homepage.surge.sh/build/assets/cloud.svg" style={{ display: 'block', width: '15%', marginLeft: '75%' , marginTop: '95%'}}/>
            <img src="https://awv3node-homepage.surge.sh/build/assets/cloud.svg" style={{ display: 'block', width: '15%', marginLeft: '20%' , marginTop: '60%'}}/>
            </ParallaxLayer>


            <ParallaxLayer offset={1}  onClick={() => ref.current.scrollTo(0)}>
            <div className='max-w-4xl mx-auto'>

                <div className='max-w-4xl mx-auto p-5 text-center text-4xl font-semibold'>
                    <h1 className='text-white px-4'>What is BrainLink?</h1>
                </div>
                <p className='text-white p-4'>We're redefining the learning experience by providing a dynamic platform, "BrainLink", where students can seamlessly connect, share knowledge, and elevate their academic journey. BrainLink is a space where students can share insights, discuss challenging topics, and collaboratively explore new ideas.</p>                
                <div className='max-w-4xl mx-auto p-5 text-center text-4xl font-semibold'>
                    <h1 className='text-white px-4'>Ask Anything!</h1>
                </div>
                <p className='text-white p-4'>A space for curiosity! Post questions across subjects, and our vibrant community of learners and experts will assemble to provide the insights you seek.</p>                
                <div className='max-w-4xl mx-auto p-5 text-center text-4xl font-semibold'>
                    <h1 className='text-white px-4'>User-Driven Learning</h1>
                </div>
                <p className='text-white p-4'>Tailor your learning experience. With BrainLink, you're in control. Explore questions, discover new perspectives, and learn at your own pace.</p>                
            </div>

            </ParallaxLayer>
        </Parallax>
      
    </div>
  );
}


