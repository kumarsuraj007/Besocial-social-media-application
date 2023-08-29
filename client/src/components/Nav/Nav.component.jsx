import { useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import {Menu, X} from 'lucide-react'
import { UserContext } from '../../context/user.context'

const NavLinks = () => {
  const {setCurrentUser} = useContext(UserContext)
  const logoutUser = () => {
    localStorage.clear();
    setCurrentUser(null);
  };
  return (
    <>
      <Link className='' to='/profile'>CREATE</Link>
      {
      localStorage.getItem('token') !== null ? (<Link to='/login' onClick={logoutUser}>LOGOUT</Link>)
      : (<Link className='' to='/login'>LOGIN</Link>)
    }  
    </>
  )
}

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  return (
    <>
    <nav className='flex w-[150px] justify-end'>
    <div className='hidden w-full md:flex justify-between'>
      <NavLinks />
    </div>
    <div>
        <button className='md:hidden' onClick={toggle}>{isOpen ? <X/> : <Menu />}</button>
      </div>
    
    </nav>
    {isOpen && (
      <div className='flex flex-col items-center basis-full'>
        <NavLinks />
      </div>
    )}
    </>
  )
}

export default Nav