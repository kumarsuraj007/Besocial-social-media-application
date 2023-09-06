import {Outlet} from 'react-router-dom';
import Nav from '../Nav/Nav.component';
import Logo from '../Logo/Logo.component';

const Header = () => {
  return (
    <nav className=''>
    <div className='shadow-md md:h-[80px] py-4 flex justify-between items-center md:px-10 px-4 flex-wrap'>
      <Logo />
      <Nav />
    </div>
    <Outlet />
    </nav>
  )
}

export default Header