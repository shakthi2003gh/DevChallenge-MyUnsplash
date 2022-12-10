import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseInit";

const provider = new GoogleAuthProvider();

export const signIn = async () => {
  return await signInWithPopup(auth, provider)
    .then((result) => {
      localStorage.setItem(
        "unsplash-user",
        JSON.stringify({ id: result.user.uid })
      );

      return result.user.uid;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};
