import { useState } from 'react'
import {NavLink} from 'react-router-dom'
import {Menu, X} from 'lucide-react'

const NavLinks = () => {
  return (
    <>
      <NavLink className='' to='/login'>Login</NavLink>
      <NavLink className='' to='/profile'>profile</NavLink>
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