import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { Button } from "@material-tailwind/react";

const MainLayout = () => {
 
  return (
    <div>
      <header className={`sticky top-0 z-10`}>
      <Navbar />
      
      </header>
      <div className='min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
    
    </div>
  )
}

export default MainLayout