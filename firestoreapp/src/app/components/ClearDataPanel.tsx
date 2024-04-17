import { useRouter } from "next/navigation";
import React from "react";
import clearData from "../firebase/firestore/clearData";

export default function ClearDataPanel({
  email,
  refreshPage,
}: any) {
  const router = useRouter();

  
  const handleForm = async (event: any) => {
    event.preventDefault();
    await clearData(email);
    alert('data cleared');
    refreshPage();
  }

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Clear data</h1>
        <form onSubmit={handleForm} className="form">
          <button type="submit">Clear data</button>
        </form>
      </div>
    </div>
  );
}
