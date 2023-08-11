import moment from "moment";

export default function Message({ message, auth, index }) {
  const { content, photo, uid } = message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <div
      className={`flex no-wrap align-center m-4 ${messageClass}`}
      key={index}
    >
      <img src={photo} alt="avatar" className="w-6 h-6 rounded-full" />
      <p className="bg-blue-500 w-fit p-2 py-1 ml-2 rounded-2xl content">
        {content}
      </p>

      <p className="text-xs text-gray-400 flex flex-col justify-end">
        {message.created && moment(message.created.seconds).format("HH:ss")}
      </p>
    </div>
  );
}
