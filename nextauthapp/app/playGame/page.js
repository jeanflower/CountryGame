'use client';
import { auth } from '../firebaseConfig';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { inspect } from 'util';

import { signOut } from 'firebase/auth';
import styles from '../../styles/playGameStyle.module.css';

inspect;

// Beginning of javascript code
async function getPath() {
  console.log('in getPath');

  const startElement = document.getElementById('start');
  const endElement = document.getElementById('end');

  const pathStart = startElement.value;
  const pathEnd = endElement.value;

  const sendFakeData = false;

  let pathResponseText = '';

  if (sendFakeData) {
    pathResponseText = `Some fake path from ${pathStart} to ${pathEnd}`;
    const pathElement = document.getElementById('path');
    pathElement.textContent = pathResponseText;
    return;
  } else {
  
    // const apiServerRoot = 'http://localhost:8000';
    const apiServerRoot = 'https://python-project-service-2ldm6ft3ha-uc.a.run.app';

    const pathUrl = `${apiServerRoot}/pathRaw?start=${pathStart}&end=${pathEnd}`
    console.log('url is ', pathUrl);

    const pathResponse = await fetch(pathUrl);
    pathResponseText = await pathResponse.text();
    console.log(pathResponseText);
  }

  const pathElement = document.getElementById('path');
  pathElement.textContent = pathResponseText;
}
// End of javascript code

export default function PlayGame() {
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
      <h1>Game page</h1>
      Hello {loggedInEmail}, you can play the game here.

      <div className={styles.style1}>

        {/* the js can refer to this element by its id to get content for start */}
        <label>Start:</label>
        <input type="text" id="start"/>
        
        {/* a line break */}
        <br/>

        {/* the js can refer to this element by its id to get content for end */}
        <label>End:</label>
        <input type="text" id="end"/>

        {/* a line break */}
        <br/>
        <button 
          type="button" 
          onClick={getPath}
        >Get path</button>

        <br/>

        {/* a div allows the js to refer to this element by its id to set content */}
        <div id="path"></div>

      </div>

      <br/>
      <button onClick={() => signOutAnyone()}>
        Sign out
      </button>

      <br/>
      <a href='/'>Go to home page</a>

    </div>
  )
}
