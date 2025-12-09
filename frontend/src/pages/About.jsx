import React from 'react'

function About() {
  return (
    <div className='pt-32 px-4 sm:px-[5vw] md;px-[7vw] lg:px-[9vw] mb-32'>
      <div className="lg:text-center mb-10">
        <h2 className="text-base text-primary font-semibold tracking-wide uppercase">FlegoHub</h2>
        <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
          About Us
        </p>
      </div>    

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700  leading-relaxed mb-6">
              <span className="font-semibold text-blue-700">Flego Hub</span> is the official payment and subscription management platform developed and operated by <span className="font-medium">Flego Innovation (Pvt) Ltd</span>.
              It serves as a unified gateway for customers to securely manage all payments, subscriptions, and invoices across Flego Innovation's suite of digital products and services.
            </p>

            <p className="text-gray-700  leading-relaxed mb-6">
              As Flego Innovation continues to expand its ecosystem — with leading platforms such as <span className="font-medium text-blue-600">Lanka Bill</span>, <span className="font-medium text-blue-600">EduMate</span>, <span className="font-medium text-blue-600">CINA</span>, and <span className="font-medium text-blue-600">Flego ERP</span> — Flego Hub plays a central role in providing a seamless digital experience. The platform enables users to subscribe, renew, upgrade, and manage services effortlessly, all through a single login.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg">
              <p className="text-gray-700 italic">
                "Flego Hub is more than just a payment platform — it is the digital foundation that connects our customers with the full strength of Flego Innovation's technology ecosystem."
              </p>
            </div>

            <p className="text-gray-700  leading-relaxed mb-6">
              Our system is built with <span className="font-medium">security, transparency, and efficiency</span> at its core. Every transaction and customer interaction is protected through advanced authentication and encryption protocols, ensuring reliability and trust. With integration to CINA, Flego Hub delivers real-time notifications, reminders, and updates to keep customers informed at every step.
            </p>

            <p className="text-gray-700  leading-relaxed">
              By centralizing payment and subscription management, we are helping individuals, organizations, and enterprises save time, reduce complexity, and operate with confidence.
            </p>
          </div>
        </div> 

         {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-blue-100 leading-relaxed">
                To provide a secure, intelligent, and unified platform for managing payments and subscriptions across all Flego Innovation products — ensuring convenience, transparency, and customer satisfaction.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-purple-100 leading-relaxed">
                To be Sri Lanka's most trusted and advanced digital payment and subscription management hub — driving innovation and reliability in every interaction.
              </p>
            </div>
          </div>
        </div>

         {/* Core Values */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Integrity",
                description: "We build trust through honesty, accountability, and transparency.",
                icon: "🤝",
                color: "text-green-600"
              },
              {
                title: "Innovation",
                description: "We continuously evolve to create smarter, faster, and more scalable digital solutions.",
                icon: "💡",
                color: "text-blue-600"
              },
              {
                title: "Customer Commitment",
                description: "We prioritize user experience and long-term relationships.",
                icon: "❤️",
                color: "text-red-600"
              },
              {
                title: "Excellence",
                description: "We strive for the highest standards in technology, design, and service delivery.",
                icon: "⭐",
                color: "text-yellow-600"
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-300">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className={`text-xl font-bold mb-3 ${value.color}`}>{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-gray-600 italic">
            Connecting you to the future of digital payments and subscription management
          </p>
        </div>



    </div>
  )
}

export default About
