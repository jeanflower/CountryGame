'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { inspect } from 'util';
import getDocuments from "../firebase/firestore/getData";
import AddDataPanel from "../components/AddDataPanel";
import ClearDataPanel from "../components/ClearDataPanel";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (user === null) {
      router.push("/");
    } else {
      console.log(`got user ${inspect(user.email)}`);

      getDocuments(user.email).then(docs => {
        if (!docs.result) {
          console.log('error!');
          return;
        }
        console.log(`got docs = ${inspect(docs)}`);
        setData(docs.result);
      });

    }
  }, [user, router]);


  return (user && user.email ?
    <div>
      <h1>Working with your data</h1>
      <div>
      <h1 className="mt-60 mb-30">Your data</h1>
      Here&apos;s your data from the DB
      <div>
        {inspect(data)}
      </div>
      </div>
      <AddDataPanel
        email={user.email}
        refreshPage={(newElt: any) => {
          console.log(`refreshing page after adding data`);
          const newData = [...data];
          newData.push(newElt);
          setData(newData);
        }}
      />
      <ClearDataPanel 
        email={user.email}
        refreshPage={()=>{
          console.log(`refreshing page after clearing data`);
          setData([]);
        }}
      />
    </div>
    :
    <>Redirecting...</>
  );
}

export default Page;
