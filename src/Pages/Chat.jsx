import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import Message from "../Components/Message";
import Send from "../Components/Send";

export default function Chat({ auth, db }) {
  const [messages, setMessages] = useState([]);
  const [previousMessages, setPreviousMessages] = useState([]); // messages sent before the first loaded message
  const firstLoadedMessage = useRef();

  const bottom = useRef();
  const top = useRef();

  useEffect(() => {
    (async () => {
      //get first 20 messages
      const messagesQueryStart = query(
        collection(db, "messages"),
        orderBy("created", "desc"),
        limit(20)
      );
      const querySnapshot = await getDocs(messagesQueryStart);
      const msgList = querySnapshot.docs.map((doc) => doc.data());
      setMessages([...msgList.reverse()]);

      firstLoadedMessage.current = msgList[0];

      //lisen for new messages
      const q = query(
        collection(db, "messages"),
        orderBy("created", "desc"),
        where("created", ">=", firstLoadedMessage.current.created)
      );
      onSnapshot(q, (snapshot) => {
        const msgList = snapshot.docs.map((doc) => doc.data());

        setMessages([...previousMessages, ...msgList.reverse()]);
        bottom.current?.scrollIntoView({ behavior: "smooth" });
      });
    })();

    bottom.current?.scrollIntoView({ behavior: "smooth" });
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
          key={"messages"}
          className="flex flex-col chat-scroll max-h-[31rem] h-[90%] overflow-y-auto"
        >
          <div
            key={"top"}
            ref={top}
            className="text-center w-full text-xs mt-0"
          >
          </div>

          {messages.filter(m => m.uid && m.content).map((message, index) => (
            <Message auth={auth} message={message} index={index} />
          ))}
          <div key={"bottom"} ref={bottom}></div>
        </div>

        <Send auth={auth} db={db} bottom={bottom} />
      </div>
    </div>
  );
}
