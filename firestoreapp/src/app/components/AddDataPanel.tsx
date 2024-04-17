import { useRouter } from 'next/navigation';
import addData from "../firebase/firestore/addData";
import React from "react";

// https://firebase.google.com/docs/firestore/manage-data/add-data

export default function AddDataPanel({
  email,
  refreshPage,
}: any) {
  const router = useRouter();

  const [newData, setNewData] = React.useState('');
  
  const handleForm = async (event: any) => {
    event.preventDefault();
    console.log(`add data ${newData}`);
    const response = await addData(email, newData);
    if (response.error) {
      alert(response.error);
    } else {
      alert('data added');
      setNewData('');
      refreshPage(newData);
    }
  }

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Add data</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <input 
              onChange={(e) => setNewData(e.target.value)}
              value={newData}
              required type="text" 
              name="data" 
              id="data" 
              placeholder="apple" 
              size={40}
            />
          </label>
          <button type="submit">Add data</button>
        </form>
      </div>
    </div>
  );
}
