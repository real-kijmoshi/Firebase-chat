import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import Message from "../Components/Message";
import Send from "../Components/Send";

export default function Chat({ auth, db }) {
  const [messages, setMessages] = useState([]);

  const bottom = useRef();
  const top = useRef();

  const messagesQuery = query(
    collection(db, "messages"),
    limit(25),
    orderBy("created", "desc")
  );

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(messagesQuery);
      const msgList = querySnapshot.docs.map((doc) => doc.data());
      setMessages([...msgList.reverse()]);
    })();

    onSnapshot(messagesQuery, (snapshot) => {
      const msgList = snapshot.docs.map((doc) => doc.data());

      setMessages([...msgList.reverse()]);
      bottom.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  bottom.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      className="flex flex-col justify-center items-center h-screen"
      key={"chat"}
    >
      <h1 className="text-3xl m-2">Chat</h1>

      <button
        onClick={() => signOut(auth)}
        className="absolute top-0 right-0 m-10 p-1 rounded hover:bg-[#252525]"
      >
        Logout
      </button>

      <div className="mx-20 rounded-xl p-4 w-[30rem] bg-[#2a2a2a] h-3/4 drop-shadow-xl pb-3 ">
        <div
          key={"top"}
          ref={top}
          className="text-center w-full text-xs mt-0"
        ></div>
        <div
          key={"messages"}
          className="flex flex-col chat-scroll max-h-[31rem] h-[90%] overflow-y-auto"
        >
          {messages.map((message, index) => (
            <Message auth={auth} message={message} index={index} />
          ))}
          <div key={"bottom"} ref={bottom}></div>
        </div>

        <Send auth={auth} db={db} bottom={bottom} />
      </div>
    </div>
  );
}
