import { Link, Outlet } from 'react-router-dom'
import Logo from '../../assets/besocial.png'

const Navbar = () => {
  return (
    <>
    <nav className='bg-gray-100 shadow-lg'>
        <div className='flex justify-between items-center px-10 py-5'>
          <Link to='/'>
        <img className='h-[50px]' src={Logo} alt="Besocial" />
          </Link>
        <ul className='flex items-center'>
          <Link to='/login'>
          <li className='px-5 cursor-pointer hover:translate-x-1 transition'>LOGIN</li>
          </Link>
            <li className='px-5 cursor-pointer hover:translate-x-1 transition'>PROFILE</li>
        </ul>
        </div>
    </nav>
    <Outlet />
    </>
  )
}

export default Navbar