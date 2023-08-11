import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInAnonymously
} from "firebase/auth";

export default function Login({ auth }) {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="grid h-screen place-items-center">
      <div>
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

        <button
          onClick={signInWithGithub}
          className="flex h-fit w-fit no-wrap bg-black p-3 rounded shadow hover:bg-[#141414] mt-5"
        >
          <img className="w-5" src="/github-mark-white.svg" alt="" />
          <p className="mx-2 text-white">Sign in with Github</p>
        </button>

        <div>
          <button
            onClick={() => signInAnonymously(auth)}
            className="flex h-fit w-fit no-wrap bg-gray-700 p-3 rounded shadow hover:bg-gray-800 mt-5"
          >
            <p className="mx-2 text-white">Sign in Anonymously</p>
          </button>
        </div>
      </div>
    </div>
  );
}
