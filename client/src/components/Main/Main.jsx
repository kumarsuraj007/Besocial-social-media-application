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

  const commentPost = (text, postId) => {
    fetch('http://localhost:5000/api/post/comment', {
      method: "put",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify({
        text,
        postId
      })
    }).then(res => res.json()).then(result => {
      console.log(result)
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

  return (
    <div className="h-auto py-5 md:w-[80vh] w-[50vh] mx-auto mt-[20px]">
      {data?.map((item) => {
        return (
          <>
      <hr className="mb-9" />
          <div key={item._id} className="grid pb-[50px]">
            <div className="flex px-4">
              <img
                className="h-[50px] w-[50px] rounded-full object-cover"
                src={item.postedBy.photo}
                alt=""
              />
              <div className="flex flex-col">
              <span className="px-2 mt-[10px] text-1xl">
                {item.postedBy.username}
              </span>
              <span className="text-[10px] px-2 text-gray-400">{item.title}</span>
              </div>
              
              <div onClick={() => deletePost(item._id)} className="md:ps-[350px] ps-[150px] mx-2 mt-[10px] cursor-pointer">
              { 
              item.postedBy._id == currentUser._id && <Trash2/>
              }
              </div>
            </div>
            <div className="flex justify-center">
            <img
              className="h-auto py-5 mt-[20px] md:mt-[30px] object-contain"
              src={item.photo}
              alt=""
            />
            </div>
            
            <div className="md:mt-[10px] ps-[20px] py-1">
              <div className="">
              {
                  item.likes?.includes(currentUser._id) ? <span onClick={() => unLikePost(item._id)} ><span className="text-xl cursor-pointer">{item.likes.length} Likes</span>
                  </span>  : <span onClick={() => likePost(item._id)} ><ThumbsUp /></span>
              }
              </div> 
              </div>
            <p className="px-5 mt-[20px] md:mt-0 text-1xl">{item.body}</p>
            <div className="mt-[5px]">
            {
                item.comments.map(record=>{
                  return(
                    <h6 className="ps-[20px]" key={record._id}><span className="font-bold">{record.postedBy.username}</span> {record.text}</h6>
                  )
                })
              }
            </div>
              <form action="" onSubmit={(e) => {
                e.preventDefault();
                commentPost(e.target[0].value, item._id)
                e.target[0].value = '';
              }}>
              <input className="ms-[15px] ps-[5px] mt-[10px] outline-0" type="text" placeholder="add a comment" />
              </form>
            <hr className="mt-4" />
          </div>
          </>
        );
      })}
    </div>
  );
};

export default Main;
