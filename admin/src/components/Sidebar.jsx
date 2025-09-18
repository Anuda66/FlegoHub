import { NavLink } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import { FaUserPlus } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { IoIosHome } from "react-icons/io";
import { RiMenuFold2Fill } from "react-icons/ri";
import { IoDocumentsSharp } from "react-icons/io5";
import { MdLocalOffer } from "react-icons/md";


const Sidebar = () => {
  const { isOpen, setIsOpen } = useSidebar();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <IoIosHome /> },
    { name: 'Users', path: '/users', icon: <FaUserPlus /> },
    { name: 'Products', path: '/products', icon: <AiFillProduct /> },
    { name: 'Pricing Plan', path: '/pricingPlan', icon: <IoDocumentsSharp  /> },
    { name: 'Subscriptions', path: '/subscriptions', icon: <AiFillProduct /> },
    { name: 'Offers', path: '/offers', icon: <MdLocalOffer  /> },

  ];

  return (
    <div className={`bg-primary text-white ${isOpen ? 'w-60' : 'w-18 '} min-h-screen transition-all duration-300 fixed`}>
      <div className="p-4 flex items-center justify-between">
        {isOpen && <h2 className="text-xl font-semibold">Menu</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-700 cursor-pointer"
        >
          <RiMenuFold2Fill className='text-2xl' />

        </button>
      </div>
      <nav className="mt-1">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="px-4 py-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                }
              >
                <p className="text-xl">{item.icon}</p>

                {isOpen && <span className="ml-3 ">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;