import {Link} from 'react-router-dom'
import LogoImg from '../../assets/besocial.png'

const Logo = () => {
  return (
    <div>
        <Link to='/'>
        <img className='md:h-[50px] h-[35px]' src={LogoImg} alt="Besocial" />
        </Link>
    </div>
  )
}

export default Logo