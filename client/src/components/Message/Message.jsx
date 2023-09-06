import React from 'react'

const Message = ({message, own}) => {
  return (
    <div className="flex bg-gray-100 h-screen flex-col w-full">
  <div className="flex-grow overflow-y-auto">
    <div className="flex flex-col space-y-2 p-4">
      
      <div className="flex items-center self-start rounded-xl rounded-tl bg-gray-300 py-2 px-3">
        <p>{message?.text}</p>
      </div>
      <div className="flex items-center self-end rounded-xl rounded-tr bg-blue-500 py-2 px-3 text-white">
        <p>hi</p>
      </div>
    </div>
  </div>
  <div className="flex items-center p-4">
    <input type="text" placeholder="Type your message..." className="w-full rounded-lg border border-gray-300 px-4 py-2" />
    <button className="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white">Send</button>
  </div>
</div>
  )
}

export default Message