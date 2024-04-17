import firebase_app from "../config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = firebase_app ? getAuth(firebase_app) : undefined;

export default async function sendReset(email: string) {
  if (!auth) {
    return {
      result: undefined,
      error: 'no connection to auth', 
    }
  }
  let result = null,
    error = null;
  try {
    result = await sendPasswordResetEmail(auth, email);
  } catch (e) {
    error = e;
  }

  return { result, error };
}