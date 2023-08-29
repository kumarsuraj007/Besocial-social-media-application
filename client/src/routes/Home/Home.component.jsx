import Default from '../../components/Default/Default';
import Main from '../../components/Main/Main';

const Home = () => {
  return (
       <div>
        {
          localStorage.getItem('token') !== null ? (<Main />)
          : (<Default />)
        }
       </div>
  )
}

export default Home