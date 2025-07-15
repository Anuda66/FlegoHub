import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="bg-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                                FlegoHub
                            </h3>
                            <p className="mt-4 text-sm text-gray-500">
                                The centralized platform for all Flego Innovation applications.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                                Products
                            </h3>
                            <ul className="mt-4 space-y-2">
                                <li><a href="#" className="text-sm text-gray-500 hover:text-primary">LankaBill</a></li>
                                <li><a href="#" className="text-sm text-gray-500 hover:text-primary">LankaFinance</a></li>
                                <li><a href="#" className="text-sm text-gray-500 hover:text-primary">SmartDoctor</a></li>
                                <li><a href="#" className="text-sm text-gray-500 hover:text-primary">AutoCare Pro</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                                Company
                            </h3>
                            <ul className="mt-4 space-y-2">
                                <li><a href="#" className="text-sm text-gray-500 hover:text-primary">About</a></li>
                                <li><a href="#" className="text-sm text-gray-500 hover:text-primary">Careers</a></li>
                                <li><a href="#" className="text-sm text-gray-500 hover:text-primary">Blog</a></li>
                                <li><a href="#" className="text-sm text-gray-500 hover:text-primary">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                                Connect
                            </h3>
                            <div className="mt-4 flex space-x-6">
                                <a href="#" className="text-gray-500 hover:text-primary">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-primary">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-primary">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-primary">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">
                                    support@flegohub.com
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    +94 112 345 678
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 border-t border-gray-200 pt-8">
                        <p className="text-sm text-gray-500 text-center">
                            &copy; 2025 Flego Innovation. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
