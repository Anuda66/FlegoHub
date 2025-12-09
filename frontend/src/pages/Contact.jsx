import React from 'react'
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";

function Contact() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "a83eac10-45f1-43ae-a973-685dbf22b2f8");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Success!",
        text: "Mesage sent successfully!",
        icon: "success"
      });
    }
  };

  return (
    <div className='pt-32 px-4 sm:px-[5vw] md;px-[7vw] lg:px-[9vw] mb-32'>
      <div className="lg:text-center mb-10">
        <h2 className="text-base text-primary font-semibold tracking-wide uppercase">FlegoHub</h2>
        <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
          Contact Us
        </p>
      </div>

      <div className="mx-auto md:w-2/3 lg:w-1/2">
        <div className="">
          <form onSubmit={onSubmit} className="">
            <div className="">
              <label className="text-md">Full Name</label>
              <input type="text" placeholder="Enter your name" name="name" required className="w-full h-10 px-5 mt-3 text-sm border-2 border-primary-100" />
            </div>

            <div className="mt-8">
              <label className="text-md">Email</label>
              <input type="email" placeholder="Enter your email" name="email" required className="w-full h-10 px-5 mt-3 text-sm border-2 border-primary-100" />
            </div>

            <div className="mt-8">
              <label className="text-md">Message</label>
              <textarea name="message" id="" placeholder="Enter your message" required className="w-full px-5 mt-3 text-sm border-2 h-28 border-primary-100" />
            </div>

            <button type="submit" className="w-full h-10 mt-10 text-white rounded-lg bg-blue-700 hover:bg-primary cursor-pointer">Send Message</button>
          </form>
        </div>
      </div>

      <div class="mt-8 w-full border-t border-gray-800 p-2 pt-8 text-center">
        <a class="text-indigo-400">info@flegoinnovation.com</a>
        <p class="my-3 leading-normal">No-494, High level road, Nugegoda, Sri Lanka</p>
        <div className="flex items-center justify-center gap-3 pt-5 text-2xl text-gray-500 md:gap-5">
          <Link to={'https://www.facebook.com/share/1EodzT2VZD/'}><FaFacebookSquare className="cursor-pointer hover:text-secondary-200" /></Link>
          <Link to={'https://www.instagram.com/flegoinnovation?igsh=MTBqYWdoOGt5dWh2Nw=='}><FaSquareInstagram className="cursor-pointer hover:text-secondary-200" /></Link>
          <Link to={'https://www.linkedin.com/in/flego-innovation-44720b345?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'}><IoLogoLinkedin className="cursor-pointer hover:text-secondary-200" /></Link>
        </div>
      </div>
    </div>
  )
}

export default Contact
