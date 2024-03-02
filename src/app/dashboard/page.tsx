"use client";

import ListCats from '@/components/table_cats/list.cats';
import 'bootstrap/dist/css/bootstrap.min.css';



import { useSession } from "next-auth/react";
import { useState } from 'react';

const Dashboard = () => {
  const { data: session, status } = useSession();

  const [showCats, setShowCats] = useState<boolean>(false);

  const [catsData, setCatsData] = useState("");



  if (status === "loading") {
    return <p>Loading...</p>;
  }
  //console.log(session?.user?.token);

  const getCats = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    const data = await res.json();
    setCatsData(data);
    setShowCats(!showCats);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <button onClick={getCats} className={`btn ${showCats ? 'btn-danger' : 'btn-primary'}`}>
        {showCats ? 'Hide Cats' : 'Get Cats'}
      </button>
      <br /><br /><br />
      {showCats && <ListCats catsData={catsData} />}
    </div>
  );
};
export default Dashboard;
