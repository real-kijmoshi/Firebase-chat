import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home({ db, auth, bottom }) {
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");

  const send = () => {
    if (message.length === 0) return alert("Message is empty");
    if (message.length > 1000) return alert("Message is too long");

    addDoc(collection(db, "messages"), {
      content: message,
      photo: user.photoURL,
      uid: user.uid,
      created: serverTimestamp(),
    });

    setMessage("");
    bottom.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex justify-bettwen align-center  mb-0 pb-0 mt-3 h-[10%] nowrap">
      <input
        type="text"
        className="bg-transparent w-full rounded m-1 border-[1px] border-gray-400 px-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={send}
        placeholder="message"
        className="flex flex-col justify-center mx-3 h-full"
      >
        Send
      </button>
    </div>
  );
}
