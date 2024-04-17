
import { inspect } from "util";
import firebase_app from "../config";
import { getFirestore, collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";

const db = firebase_app ? getFirestore(firebase_app) : undefined;

export default async function clearData(
  email: string,
) {
  if (!db) { 
    return { 
      error: 'no db connection',
    }; 
  }

  const q = query(collection(db, 'myCollection'), where("email", "==", email));

  let error = null;

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (myDoc: any) => {
      console.log(`doc.data() = ${inspect(myDoc.data())}`);
      await deleteDoc(doc(db, 'myCollection', myDoc.id));
    });
  } catch(err) {
    error = 'Caught errror during delete';
  }

  return { error };
}