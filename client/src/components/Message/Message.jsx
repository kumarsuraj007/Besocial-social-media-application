import { format } from "timeago.js";

const Message = ({ message, own }) => {
  return (
    <div >
      {message && (
        <div
          className={
            own
              ? "bg-blue-100 rounded-lg max-w-xs py-2 px-3 my-2 ml-auto text-black"
              : "bg-gray-100 rounded-lg max-w-xs py-2 px-3 my-2 mr-auto"
          }
        >
          <p className="text-sm">{message.text}</p>
          <span className="text-xs text-gray-400 block mt-1">
            {format(message.createdAt)}
          </span>
        </div>
      )}
    </div>
  );
};

export default Message;
