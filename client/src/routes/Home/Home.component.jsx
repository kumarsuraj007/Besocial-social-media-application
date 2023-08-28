import {Link} from 'react-router-dom'

const Home = () => {
  return (
       <div className='md:w-[200vh] mx-auto w-[50vh] mt-[50px] flex items-center flex-col justify-center h-[60vh]'>
      <h2 className='md:text-5xl text-3xl font-bold'>Welcome To Besocial</h2>
      <Link to='/register'>
      <button className='w-[180px] mt-[20px] py-4 bg-black text-white hover:bg-gray-800 transition-all'>Get Started</button>
      </Link>
    </div>
  )
}

export default Home