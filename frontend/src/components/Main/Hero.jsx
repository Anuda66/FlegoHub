import React from 'react'

function Hero() {
  return (
    <div className='mt-18'>
      
    <div className="hero-gradient text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    One Gateway. All Your Apps.
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-xl text-blue-100">
                    FlegoHub provides seamless access to all Flego Innovation applications through a single, secure <br /> platform.
                </p>
                <div className="mt-10 flex justify-center space-x-4">
                    <a href="#" className="btn-primary inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary bg-accent hover:bg-yellow-400">
                        Explore Apps
                    </a>
                    <a href="#" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-blue-800">
                        Learn More
                    </a>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Hero
