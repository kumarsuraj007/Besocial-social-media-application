import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/user.context";
import { Link } from "react-router-dom";


const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const [myPost, setMyPost] = useState();

  useEffect(() => {
    fetch('http://localhost:5000/api/post/mypost', {
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("token")
      }
    }).then(res => res.json()).then(result => {
      setMyPost(result)
    })
  }, [])

  return (
    <div className="flex h-screen w-full justify-center pt-[50px]">
      <div className="w-[160vh]">
        <div className="shadow-sm rounded-lg py-3">
          <div className="md:w-[100vh] w-[50vh] photo-wrapper p-2 flex mx-auto justify-around">
            <img
              className=" object-cover md:w-[300px] md:h-[300px] h-[150px] w-[150px] border-2 rounded-full"
              src={currentUser?.photo}
            />
            <div className="flex justify-center flex-col mx-2">
            <h3 className="md:text-5xl text-2xl text-gray-900 font-medium leading-8 flex items-center">
              {currentUser?.username}
            </h3>
            <p className="md:mt-[20px] md:text-[20px] text-[12px] text-gray-500">{currentUser?.body}</p>
            <div className="md:ps-1 md:mt-[20px] mt-5 flex md:gap-4 gap-2">
        <h4 className="md:text-xl text-[15px] text-center">{myPost?.length} Posts</h4>
        <h4 className="md:text-xl text-[15px] text-center">{currentUser?.followers.length} Followers</h4>
        <h4 className="md:text-xl text-[15px] text-center">{currentUser?.following.length} Following</h4>
        </div>
            </div>
          </div>
        </div>
        <div className="flex ms-4">
        <div className="mt-[30px] flex py-3  px-9 bg-gray-200 cursor-pointer hover:bg-slate-300 transition-all">
        <Link to='/uploadimage'>
          <p className="mx-1">Upload Image</p>
        </Link>
        </div>

        <div className="mt-[30px] flex py-3 ml-2  px-9 bg-gray-200 cursor-pointer hover:bg-slate-300 transition-all">
        <Link to='/uploadvideo'>
          <p className="mx-1">Upload Video</p>
        </Link>
        </div>
        
        <div className="mt-[30px] flex py-3 ml-2 px-9 bg-gray-200 cursor-pointer hover:bg-slate-300 transition-all">
        <Link to='/editprofile'>
        <p className="mx-1">
            Edit Profile
          </p>
        </Link>
        </div>
        </div>
        <div className=" mt-8 flex flex-wrap md:px-4 px-5 gap-4">
          {
            myPost?.map(item => {
              return (
                <img key={item._id} className="h-[200px] object-contain rounded-md" src={item.photo} alt="" />
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;
