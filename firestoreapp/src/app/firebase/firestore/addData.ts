
import firebase_app from "../config";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import getDocuments from "./getData";

const db = firebase_app ? getFirestore(firebase_app) : undefined;

export default async function addData(
  email: string,
  value: string,
) {
  if (!db) { 
    return { 
      error: 'no db connection',
    }; 
  }

  let result = null;
  let error = null;

  const docs = await getDocuments(email);
  console.log(`docs.result = ${docs.result}`);
  if (docs.result && docs.result.length > 3) {
    error = 'database is full';
  } else {
    try {
      const newDocRef = doc(collection(db, 'myCollection'));

      result = await setDoc(newDocRef, {
        email: email,
        value: value,
      }, {
        merge: true,
      });
    } catch (e) {
      error = e;
    }
  }

  return { result, error };
}