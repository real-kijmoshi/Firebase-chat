import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Login({ auth }) {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="grid h-screen place-items-center">
      <button
        onClick={signInWithGoogle}
        className="flex h-fit w-fit no-wrap bg-white p-3 rounded shadow hover:bg-gray-100"
      >
        <img
          className="w-5"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
          alt=""
        />
        <p className="mx-2 text-black">Sign in with Google</p>
      </button>
    </div>
  );
}
