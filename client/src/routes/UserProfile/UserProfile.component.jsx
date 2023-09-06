import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import { MessageSquare } from "lucide-react";

const UserProfile = () => {
  const { userId } = useParams();
  const { setCurrentUser, currentUser } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState(null);
  const [checkButton, setCheckButton] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/profile/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const { findUser, postedByUser } = result;
        setUserProfile(findUser);
        setUserPosts(postedByUser);
      });
  }, []);

  const followUser = () => {
    fetch("http://localhost:5000/api/auth/follow", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          return alert(result.error);
        } else {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(result));
          const updatedUser = JSON.parse(localStorage.getItem("user"));
          setCurrentUser(updatedUser);
          window.location.reload();
        }
      });
  };

  const unFollowUser = () => {
    fetch("http://localhost:5000/api/auth/unfollow", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        unFollowId: userId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          return alert(result.error);
        } else {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(result));
          const updatedUser = JSON.parse(localStorage.getItem("user"));
          setCurrentUser(updatedUser);
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    const user = currentUser?.following;
    user?.forEach((item) => {
      return setCheckButton(item == userId);
    });
  }, [currentUser]);

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
                {checkButton ? (
                  <button
                    onClick={() => unFollowUser()}
                    className="mt-3 py-2 px-3 bg-gray-500 text-white hover:bg-gray-400 transition-all cursor-pointer md:px-5 md:py-2"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="mt-3 py-2 px-3 bg-blue-600 text-white hover:bg-blue-500 transition-all cursor-pointer md:px-5 md:py-2"
                    onClick={() => followUser()}
                  >
                    Follow
                  </button>
                )}
                {
                  checkButton ? 
                  <span className="mt-3 py-2 px-1 cursor-pointer">
                    <Link to='/chat'>
                    <MessageSquare />
                    </Link>
                  </span>
                   : null
                }
              </div>

              <p className="md:mt-[10px] ps-1 mt-0 md:text-[15px] text-[10px] text-gray-500">
                Hey there
              </p>
              <div className="ps-1 md:mt-[20px] mt-5 flex md:gap-4 gap-2">
                <h4 className="md:text-xl text-[15px] text-center">
                  {userPosts?.length} Posts
                </h4>
                <h4 className="md:text-xl text-[15px] text-center">
                  {userProfile?.followers.length} Followers
                </h4>
                <h4 className="md:text-xl text-[15px] text-center">
                  {userProfile?.following.length} Following
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="flex ms-4"></div>
        <div className=" mt-8 flex flex-wrap md:px-4 px-5 gap-4">
          {checkButton
            ? userPosts?.map((item) => {
                return (
                  <img
                    key={item._id}
                    className="h-[200px] object-contain rounded-md"
                    src={item.photo}
                    alt=""
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
