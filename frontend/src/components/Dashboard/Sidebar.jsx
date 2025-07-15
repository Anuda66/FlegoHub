import { NavLink } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';
import { FaUserPlus } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { IoIosHome } from "react-icons/io";
import { RiMenuFold2Fill } from "react-icons/ri";


const Sidebar = () => {
  const { isOpen, setIsOpen } = useSidebar();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <IoIosHome /> },
    { name: 'All Servicess', path: '/users', icon: <FaUserPlus /> },
    { name: 'My apps', path: '/products', icon: <AiFillProduct /> },
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

                {isOpen && <span className="ml-3">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;