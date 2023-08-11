import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Pages/Login";
import Chat from "./Pages/Chat";

const app = initializeApp({
  apiKey: process.env.VITE_apiKey,
  authDomain: process.env.VITE_authDomain,
  projectId: process.env.VITE_projectId,
  messagingSenderId: process.env.VITE_messagingSenderId,
  appId: process.env.VITE_appId,
  measurementId: process.env.VITE_measurementId,
});

const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [user] = useAuthState(auth);

  return (
    <div>{user ? <Chat auth={auth} db={db} /> : <Login auth={auth} />}</div>
  );
}

export default App;
