import { format } from "timeago.js";
const Message = ({ message, own }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col p-4">
        <div
          className={
            own
              ? "flex items-center self-end rounded-xl rounded-tr bg-blue-500 py-2 px-3 text-white"
              : "flex items-center self-start rounded-xl rounded-tl bg-gray-300 py-2 px-3"
          }
        >
          <p>{message?.text}</p>
        </div>
        <span
          className={
            own ? "text-[12px] flex self-end" : "text-[12px] flex self-"
          }
        >
          {format(message?.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Message;
