import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineSecurity } from "react-icons/md";
import { FaRotate } from "react-icons/fa6";
import { RiCustomerService2Fill } from "react-icons/ri";
import { AppContext } from '../../context/appContext';
import { Link } from 'react-router-dom';

function Featured() {

    const { applications } = useContext(AppContext)
    //console.log(applications);

    const [latestApp, setLatestApp] = useState([])

    useEffect(() => {
        if (applications && applications.length > 0) {
            setLatestApp(applications.slice(0, 4));
        }
    }, [applications]);

    //console.log("latestApp:", latestApp);

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Featured Applications
                    </h2>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                        Discover the powerful suite of applications available on FlegoHub
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {/* render product-----------------------------------------------------------------------------------  */}
                    {latestApp.map((item, index) => (
                        <div  key={index} className='bg-white rounded-lg shadow-md overflow-hidden hover:scale-110 transition ease-in-out'>
                            <div className="p-6">
                                <img className="h-24  mb-4  mx-auto" src={item.image} alt='' />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">{item.name}</h3>
                                <p className="text-gray-500 text-sm">
                                    {item.description}
                                </p>
                                <div  className="mt-6">
                                    <Link to={`/product/${item._id}`}  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-800">
                                        Visit App
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a href="/apps" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-800">
                        View All Applications
                        <i className="fas fa-arrow-right ml-2"></i>
                        
                    </a>
                </div>
            </div>


            {/* Features Section--------------------------------------------------------------------------- */}
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
                        <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                            Why Choose FlegoHub?
                        </p>
                    </div>

                    <div className="mt-20">
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                            <div className="text-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto mb-4">
                                    <i className="fas fa-shield-alt"><MdOutlineSecurity /></i>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Enterprise Security</h3>
                                <p className="text-gray-500">
                                    Military-grade encryption and multi-factor authentication to protect your data.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto mb-4">
                                    <i className="fas fa-sync-alt"><FaRotate />
                                    </i>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Seamless Integration</h3>
                                <p className="text-gray-500">
                                    All applications work together seamlessly with single sign-on and shared data.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto mb-4">
                                    <i className=""><RiCustomerService2Fill /></i>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">24/7 Support</h3>
                                <p className="text-gray-500">
                                    Dedicated support team available around the clock to assist you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*CTA Section*/}
            <div className="bg-primary">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Ready to get started?</span>
                        <span className="block text-accent">Sign up for FlegoHub today.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <a href="/singin" className="btn-primary inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-accent hover:bg-yellow-400">
                                Get Started
                            </a>
                        </div>
                        <div className="ml-3 inline-flex rounded-md shadow">
                            <a href="/contact" className="inline-flex items-center justify-center px-5 py-3 border  text-base font-medium rounded-md text-white bg-primary  hover:bg-blue-800">
                                Contact Sales
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Featured
