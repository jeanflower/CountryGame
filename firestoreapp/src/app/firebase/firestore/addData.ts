
import firebase_app from "../config";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";

const db = firebase_app ? getFirestore(firebase_app) : undefined;

export default async function addData(
  email: string,
  purpose: string,
) {
  if (!db) { 
    return { 
      error: 'no db connection',
    }; 
  }
  let result = null;
  let error = null;

  try {
    const newDocRef = doc(collection(db, 'myCollection'));

    result = await setDoc(newDocRef, {
      email: email,
      purpose: purpose,
    }, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}