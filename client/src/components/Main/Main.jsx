import React, { useEffect, useState } from 'react'

const Main = () => {
    const [data, setData] = useState();

    useEffect(() => {
        fetch('http://localhost:5000/api/post/allpost', {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      }).then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.log(err))
    }, [])
    
  return (
    <div className='h-auto py-10 md:w-[80vh] w-[50vh] mx-auto shadow-lg mt-[20px]'>
        {
            data?.map(item => {
                return (
<div key={item._id} className='flex flex-col'>
            <div className='flex px-4'>
                <img className='h-[50px] w-[50px] rounded-full object-cover' src={item.postedBy.photo} alt="" />
            <span className='px-2 mt-[10px] text-1xl'>{item.postedBy.username}</span>
            </div>
            <img className='h-[300px] md:mt-[30px] object-contain' src={item.photo} alt="" />
            <span className='md:mt-[20px] px-5 text-2xl'>{item.title}</span>
            <p className='mt-2 px-5 text-1xl'>{item.body}</p>
        </div>
                )
            })
        }
            
    </div>
  )
}

export default Main