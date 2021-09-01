import Account from "@components/Account/App";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../client";
export default function Profile() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <>hi </>
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}
