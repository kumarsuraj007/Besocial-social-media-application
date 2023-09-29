import { useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import {Menu, X, MessageSquare, SearchIcon} from 'lucide-react'
import { UserContext } from '../../context/user.context'

const NavLinks = () => {
  const {setCurrentUser} = useContext(UserContext)
  const logoutUser = () => {
    localStorage.clear();
    setCurrentUser(null);
  };
  return (
    <>
    {
      localStorage.getItem('token') !== null ? (<Link to='/profile'>PROFILE</Link>)
      : (<Link to='/'>HOME</Link>)
    }
      {
      localStorage.getItem('token') !== null ? (<Link to='/login' onClick={logoutUser}>LOGOUT</Link>)
      : (<Link className='' to='/login'>LOGIN</Link>)
    }  
     {
      localStorage.getItem('token') !== null ? (<Link to='/chat'>< MessageSquare/></Link>)
      : (null)
    }  
    {
      localStorage.getItem('token') !== null ? (<Link to='/search'>< SearchIcon/></Link>)
      : (null)
    }  
    </>
  )
}

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  return (
    <>
    <nav className='flex justify-end'>
    <div className='hidden w-full md:flex justify-between gap-5'>
      <NavLinks />
    </div>
    <div>
        <button className='md:hidden' onClick={toggle}>{isOpen ? <X/> : <Menu />}</button>
      </div>
    
    </nav>
    {isOpen && (
      <div className='flex flex-col items-center basis-full gap-4'>
        <NavLinks />
      </div>
    )}
    </>
  )
}

export default Nav