'use client';
import { auth } from '../firebaseConfig';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { inspect } from 'util';

import { signOut } from 'firebase/auth';

inspect;

export default function DoUsefulThings() {
  const router = useRouter();

  const [loggedInEmail, setLoggedInEmail] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        // if you're not logged in, go to home page
        console.log('no user logged in');
        router.push('/');
      } else {
        setLoggedInEmail(user.email);
      }
    });
  }, []);

  const signOutAnyone = async () => {
    try {
      await signOut(auth);
      setLoggedInEmail('');

      console.log('Signed out');
    } catch (err) {
      console.log('Unexpected error: ', err);
    }
  }

  if (loggedInEmail === '') {
    return <>'Loading...'</>;
  }

  return (    
    <div>
      <h1>Useful things page</h1>
      Hello {loggedInEmail}

      <br/>
      <button onClick={() => signOutAnyone()}>
        Sign out
      </button>

      <br/>
      <a href='/'>Go to home page</a>

    </div>
  )
}
