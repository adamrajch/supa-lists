import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { supabase } from "../../client";
import { Chakra } from "../../styles/chakra";
import "../../styles/global.css";
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setAuthenticatedState("authenticated");
          router.push("/dashboard");
        }
        if (event === "SIGNED_OUT") {
          setAuthenticatedState("not-authenticated");
        }
      }
    );
    checkUser();
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      setAuthenticatedState("authenticated");
    }
  }
  async function handleAuthChange(event, session) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }
  return (
    <React.Fragment>
      <Head>
        <title>Recs</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/homer.png" />
      </Head>

      <Chakra cookies={pageProps.cookies}>
        <Component {...pageProps} />
      </Chakra>
    </React.Fragment>
  );
}

export default MyApp;
