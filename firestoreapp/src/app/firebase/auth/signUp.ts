import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { inspect } from 'util';

const auth = firebase_app ? getAuth(firebase_app) : undefined;

const signinUrl = process.env.NEXT_PUBLIC_SIGNIN_URL;

export default async function signUp(email: string, password: string) {
  if (!auth) {
    return {
      error: 'no connection to auth', 
    }
  }
  if (!signinUrl) {
    return {
      result: undefined,
      error: 'no sign in url', 
    }
  }

  console.log(`sign up ${email}`);
  
  let result = false;
  let error = null;
  try {
    const creds = await createUserWithEmailAndPassword(auth, email, password);
    if (!creds.user) {
      alert(`Failed to create a new account`);
    } else {
      await sendEmailVerification(creds.user, { url: signinUrl });

      alert(`Please verify your email address - we've emailed you a link`);
    }
  } catch (err: any) {
    if(err.code === 'auth/missing-password') {
      alert('missing password');
    } else if(err.code === 'auth/missing-email') {
      alert('missing email');
    } else if(err.code === 'auth/email-already-in-use') {
      alert('user with this email already registered');
    } else if (err.code === 'auth/network-request-failed') {
      alert('no network connection');
    } else {
      alert('add user failed');
      console.log(`err = ${inspect(err)}`)
    }
    error = 'failed to create account';
  }

  return { result, error };
}
