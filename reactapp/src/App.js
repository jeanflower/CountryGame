import {
  GameInput
} from './GameInput';
import { useState } from 'react';

function getPath(start, end) {
  // Given this is a react app
  // running on the browser
  // we can't access any server-side logic to
  // find a path
  return `some path from ${start} to ${end}`;
}

function App() {
  // this component keeps track of s start and end for the path
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');  

  // upon a compute, it uses the start and end values to set a pathToShow
  const [pathToShow, setPathToShow] = useState('');  

  return (
    <div>
      <h2>Countries game</h2>
      <GameInput
        labelText='Start of path'
        setValue={setStart}
      ></GameInput>
      <GameInput
        labelText='End of path'
        setValue={setEnd}
      ></GameInput>
      <button type="button" onClick={()=>{
        setPathToShow(getPath(start, end));
      }}>Get path</button>
      <div>{pathToShow}</div>
    </div>
  );
}

export default App;
