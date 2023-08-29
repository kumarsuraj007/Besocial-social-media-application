import {Outlet} from 'react-router-dom';
import Nav from '../Nav/Nav.component';
import Logo from '../Logo/Logo.component';

const Header = () => {
  return (
    <nav className=''>
    <div className='shadow-xl md:h-[80px] h-[100px] flex justify-between items-center px-10 flex-wrap'>
      <Logo />
      <Nav />
    </div>
    <Outlet />
    </nav>
  )
}

export default Header