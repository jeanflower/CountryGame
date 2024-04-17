import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth, signOut, sendEmailVerification } from "firebase/auth";

const auth = firebase_app ? getAuth(firebase_app) : undefined;

const signinUrl = process.env.NEXT_PUBLIC_SIGNIN_URL;

export default async function signIn(email: string, password: string) {
  if (!auth) {
    return {
      result: undefined,
      error: 'no connection to auth', 
    }
  }
  if (!signinUrl) {
    return {
      result: undefined,
      error: 'no sign in url', 
    }
  }
  let result = true;
  let error = null;
  try {
    const creds = await signInWithEmailAndPassword(auth, email, password);

    if (!creds.user.emailVerified) {
      alert(`please verify your email address - we've emailed you a link`);
      console.log(`signinUrl = ${signinUrl}`);

      await sendEmailVerification(creds.user, { url: signinUrl });

      await signOut(auth);
      result = false;
    }

  } catch (e) {
    error = e;
  }

  return { result, error };
}