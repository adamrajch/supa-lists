import Layout from "@components/dashboard/layout";
import React, { ReactElement } from "react";
import { supabase } from "../../../client";

export default function index({ user }: any): ReactElement {
  console.log(user);
  return <Layout user={user}>dash home</Layout>;
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/login" } };
  }

  return { props: { user } };
}
