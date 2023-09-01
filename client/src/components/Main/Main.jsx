import React, { useEffect, useState, useContext } from "react";
import {UserContext} from '../../context/user.context'
import {Trash2, ThumbsUp, ThumbsDown} from 'lucide-react'
import { Link } from "react-router-dom";

const Main = () => {
  const {currentUser} = useContext(UserContext)
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/api/post/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, []);

  const likePost = (id) => {
    fetch('http://localhost:5000/api/post/like', {
      method: "put",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json()).then(result => {
      const newData = data.map(item => {
        if (item._id == result._id) {
          return result
        } else {
          return item
        }
      })
      setData(newData)
    }).catch(err => {
      console.log(err)
    })
  }

  const unLikePost = (id) => {
    fetch('http://localhost:5000/api/post/unlike', {
      method: "put",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json()).then(result => {
      const newData = data.map(item => {
        if (item._id == result._id) {
          return result
        } else {
          return item
        }
      })
      setData(newData)
    }).catch(err => {
      console.log(err)
    })
  }

  const deletePost = (id) => {
    fetch(`http://localhost:5000/api/post/delete/${id}`, {
        method: "delete",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.error) {
            return alert(result.error)
          } else {
            window.location.reload()
            return alert(result.message)
          }
        })
  }

  return (
    <div className="h-auto py-10 md:w-[80vh] w-[50vh] mx-auto mt-[20px]">
      {data?.map((item) => {
        return (
          <div key={item._id} className="grid pb-[100px]">
            <div className="flex px-4">
              <img
                className="h-[50px] w-[50px] rounded-full object-cover"
                src={item.postedBy.photo}
                alt=""
              />
              <div className="flex flex-col">
              <Link to='/profile'>
              <span className="px-2 mt-[10px] text-1xl">
                {item.postedBy.username}
              </span>
              </Link>
              <span className="text-[10px] px-2 text-gray-400">{item.title}</span>
              </div>
              
              <div onClick={() => deletePost(item._id)} className="md:ps-[350px] ps-[200px] mx-2 mt-[10px]  cursor-pointer">
              { 
              item.postedBy._id == currentUser._id && <Trash2/>
              }
              </div>
            </div>
            <img
              className="h-[300px] md:mt-[30px] object-contain"
              src={item.photo}
              alt=""
            />
            <div className="mt-[10px] ps-[20px]">
                {
                  item.likes?.includes(currentUser._id) ? <span onClick={() => unLikePost(item._id)} ><ThumbsDown /></span>  : <span onClick={() => likePost(item._id)} ><ThumbsUp /></span>
                }
              </div>
            <span className="md:mt-[20px] px-5 text-2xl">{item.title}</span>
            <p className="mt-2 px-5 text-1xl text-gray-400">{item.body}</p>
            <hr className="mt-4" />
          </div>
        );
      })}
    </div>
  );
};

export default Main;
