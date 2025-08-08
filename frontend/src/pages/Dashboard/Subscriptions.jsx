import React from 'react'
import { useSidebar } from '../../context/SidebarContext';

function Subscriptions() {

    const { isOpen, setIsOpen } = useSidebar();
  
    
  return (
    <div  className='bg-slate-100'>
      <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
        <h1 className="text-2xl font-bold mb-6">Subscriptions</h1>
      </div>
    </div>
  )
}

export default Subscriptions
