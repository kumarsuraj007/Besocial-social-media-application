import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const {userId} = useParams()
    const [userProfile, setUserProfile] = useState(null);
    const [userPosts, setUserPosts] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/profile/user/${userId}`, {
          headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
          }
        }).then(res => res.json()).then(result => {
         const {findUser, postedByUser} = result
          setUserProfile(findUser)
          setUserPosts(postedByUser)
        })
      }, [])

  return (
    <div className="flex h-screen w-full justify-center pt-[50px]">
    <div className="w-[160vh]">
    <div className="shadow-sm rounded-lg py-3">
      <div className="md:w-[100vh] w-[50vh] photo-wrapper p-2 flex mx-auto justify-around">
        <img
          className=" object-cover md:w-[300px] md:h-[300px] h-[150px] w-[150px] border-2 rounded-full"
          src={userProfile?.photo}
        />
        <div className="flex justify-center flex-col mx-2 ">
            <div className="flex gap-10">
            <h3 className="md:text-5xl text-2xl text-gray-900 font-medium leading-8 flex items-center">
          {userProfile?.username}
        </h3>
        <button className="mt-3 py-2 px-5 bg-blue-600 text-white hover:bg-blue-500 transition-all cursor-pointer">Follow</button>
            </div>
        
        <p className="md:mt-[10px] ps-1 mt-0 md:text-[15px] text-[10px] text-gray-500">Hey there</p>
        <div className="ps-1 md:mt-[20px] mt-5 flex md:gap-4 gap-2">
        <h4 className="md:text-xl text-[15px] text-center">{userPosts?.length} Posts</h4>
        <h4 className="md:text-xl text-[15px] text-center">{userProfile?.followers.length} Followers</h4>
        <h4 className="md:text-xl text-[15px] text-center">{userProfile?.following.length} Following</h4>
        </div>
        </div>
      </div>
    </div>
    <div className="flex ms-4">
    </div>
    <div className=" mt-8 flex flex-wrap md:px-4 px-5 gap-4">
      {
        userPosts?.map(item => {
          return (
            <img key={item._id} className="h-[200px] object-contain rounded-md" src={item.photo} alt="" />
          )
        })
      }
    </div>
  </div>
</div>
  )
}

export default UserProfile