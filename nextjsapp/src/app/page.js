'use client';

// Make a call to our server-side API to get some data
async function getData(start, end) {
  const pathResponse = await fetch(`/api/path?start=${start}&end=${end}`);
  if (!pathResponse.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return pathResponse.json()
}

// define the HTML we'll return to the client browser
export default function Home() {
  return (
    <>
      <h1>Countries and paths</h1>
      <br/>
      <label>Start:</label>
      <input type="text" id="start" name="start" required size="20" />
      
      <br/>
      <label>End:</label>
      <input type="text" id="end" name="end" required size="20" />
  
      <br/>
      <button type="button" onClick={async () => {
        const start = document.getElementById("start").value;
        const end = document.getElementById("end").value;
        console.log(`start = ${start}`);
        console.log(`end = ${end}`);
        const resultObj = await getData(start, end);
        const resultString = JSON.stringify(resultObj);
        console.log(`resultString = ${resultString}`);
        document.getElementById("path").textContent = resultString;
      }}>Get path</button>
  
      <br/>
      <div id="path"></div>
    </>
  )
}
