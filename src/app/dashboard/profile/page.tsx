"use client";

import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session, status } = useSession();



  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1>Profile</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </div>
  );
};
export default Profile;
