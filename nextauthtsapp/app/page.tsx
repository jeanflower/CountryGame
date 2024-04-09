'use client';
import { useState } from 'react';
import { auth } from './firebaseConfig';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { inspect } from 'util';

export default function Home() {
  const router = useRouter();

  const signinUrl = process.env.NEXT_PUBLIC_SIGNIN_URL;
  if (!signinUrl) {
    console.log(`Error, undefined NEXT_PUBLIC_SIGNIN_URL`);
    return <>Error, undefined NEXT_PUBLIC_SIGNIN_URL</>;
  }

  // input fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');

  // feedback on screen
  const [addUserMsg, setAddUserMsg] = useState('');
  const [signInMsg, setSignInMsg] = useState('');

  const [loggedInEmail, setLoggedInEmail] = useState('');

  const addUser = async (email: string, password: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await signOut(auth);
      setLoggedInEmail('');

      console.log(`signinUrl = ${signinUrl}`);

      await sendEmailVerification(cred.user, { url: signinUrl });

      setAddUserMsg('Please verify your email before signing in');
      setNewUserEmail('');
      setNewUserPassword('');
    } catch (err: any) {
      if(err.code === 'auth/missing-password') {
        setAddUserMsg('missing password');
      } else if(err.code === 'auth/missing-email') {
        setAddUserMsg('missing email');
      } else if(err.code === 'auth/email-already-in-use') {
        setAddUserMsg('user with this email already registered');
      } else if (err.code === 'auth/network-request-failed') {
        setSignInMsg('no netrowk connection');
      } else {
        setAddUserMsg('add user failed');
      }
      
      console.log('Unexpected error: ', err);
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        // see if they need to verify their email
        const { claims } = await auth.currentUser.getIdTokenResult(true);
        if (!claims.email_verified) {
          await sendEmailVerification(auth.currentUser, { url: signinUrl });
          setSignInMsg('Please verify your email before signing in. We have sent you another verification email');

          await signOut(auth);
          setLoggedInEmail('');
          return;
        }
      }
      router.push('/playGame');

    } catch (err: any) {
      if(err.code === 'auth/invalid-email') {
        setSignInMsg('invalid email');
      } else if(err.code === 'auth/missing-password') {
        setSignInMsg('missing password');
      } else if(err.code === 'auth/missing-email') {
        setSignInMsg('missing email');
      } else if(err.code === 'auth/invalid-login-credentials') {
        setSignInMsg('invalid credentials');
      } else if(err.code === 'auth/invalid-login-credentials') {
        setSignInMsg('invalid credentials');
      } else if (err.code === 'auth/network-request-failed') {
        setSignInMsg('no netrowk connection');
      } else {
        setSignInMsg('signin failed');
      }
      console.log('Unexpected error: ', inspect(err));
    }
  }

  const resetPasswordEmail = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Sent reset email');
      setSignInMsg('We have sent you another verification email');

    } catch (err: any) {
      if (email === '') {
        setSignInMsg('missing email');
      } else if (err.code === 'auth/network-request-failed') {
        setSignInMsg('no network connection');
      } else {
        setSignInMsg('reset password workflow failed');
      }
    }
  }

  const signOutAnyone = async () => {
    try {
      await signOut(auth);
      setLoggedInEmail('');

      console.log('Signed out');
    } catch (err: any) {
      if (err.code === 'auth/network-request-failed') {
        setSignInMsg('no network connection');
      } else {
        setSignInMsg('sign out failed');
      }
    }
  }

  console.log(`Logged in user = ${loggedInEmail}`);

  return (
    <div>
      <h1>Add user</h1>
      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={e => {
          setNewUserEmail(e.target.value)
          //console.log(`add user email ${newUserEmail}`);
        }}
        value={newUserEmail}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={e => setNewUserPassword(e.target.value)}
        value={newUserPassword}
        />
      <button onClick={() => addUser(newUserEmail, newUserPassword)}>
        Add
      </button>
      <div>{addUserMsg}</div>

      {loggedInEmail === '' 
      
        ?

        <>
        <h1>Sign in</h1>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={e => setSignInEmail(e.target.value)}
          value={signInEmail}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={e => setSignInPassword(e.target.value)}
          value={signInPassword}
        />
        <button onClick={() => signInWithEmail(signInEmail, signInPassword)}>
          Sign in
        </button>
        <br/>
        <button onClick={() => resetPasswordEmail(signInEmail)}>
          Forgot password
        </button>

        <div>{signInMsg}</div>
        </> 
        
        :
        
        <>
        <h1>Hello {loggedInEmail}</h1>        
        <button onClick={() => signOutAnyone()}>
        Sign out
        </button>
        </>
      }
    </div>
  )
}
