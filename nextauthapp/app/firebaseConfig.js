import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB2r3NIFEatUTHdnNB77FQu9-FD2A7-ql0",
  authDomain: "auth-example-419418.firebaseapp.com",
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
