import React from 'react'

const Service = () => {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-20">
            <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 rounded-lg shadow-lg shadow-gray-500/10">
                <div className="p-6 px-8 text-center">
                    <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] h-12 max-h-[48px] text-sm bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] pointer-events-none mb-6 rounded-full" type="button">
                        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <img src="/brain.svg" alt="" />
                        </span>
                    </button>
                    <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mb-2">
                        What is BrainLink? </h5>
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    Introducing BrainLink: a dynamic platform revolutionizing learning, connecting students to seamlessly share knowledge and elevate their academic journey through collaborative exploration.                         </p>
                </div>
            </div>
            <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 rounded-lg shadow-lg shadow-gray-500/10">
                <div className="p-6 px-8 text-center">
                    <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] h-12 max-h-[48px] text-sm bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] pointer-events-none mb-6 rounded-full" type="button">
                        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <img src="/ask.svg" alt="" />
                        </span>
                    </button>
                    <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mb-2">
                        Ask Anything!</h5>
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        A space for curiosity! Post questions across subjects, and our vibrant community of learners and experts will assemble to provide the insights you seek.</p>
                </div>
            </div>
            <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 rounded-lg shadow-lg shadow-gray-500/10">
                <div className="p-6 px-8 text-center">
                    <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] h-12 max-h-[48px] text-sm bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] pointer-events-none mb-6 rounded-full" type="button">
                        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <img src="/learning.svg" alt="" />

                        </span>
                    </button>
                    <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mb-2">
                        User-Driven Learning</h5>
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        Tailor your learning experience. With BrainLink, you're in control. Explore questions, discover new perspectives, and learn at your own pace.</p>
                </div>
            </div>
        </div>

    )
}

export default Service
