import firebase_app from "../config";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { inspect } from 'util';

const db = firebase_app ? getFirestore(firebase_app) : undefined;

export default async function getDocuments(
  email: string,  
) {
  if (!db) { 
    return { 
      error: 'no db connection',
    }; 
  }
  
  const q = query(collection(db, 'myCollection'), where("email", "==", email));

  let result: any[] = [];
  let error = null;

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      console.log(`doc.data() = ${inspect(doc.data())}`);
      result.push(doc.data().value);
    });

  } catch (e) {
    error = e;
  }

  return { result, error };
}