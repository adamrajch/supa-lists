import { supabase } from "../../client";
import LoginForm from "../components/loginform/App";

export default function Login(): JSX.Element {
  return <LoginForm />;
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return { props: {}, redirect: { destination: "/dashboard" } };
  }

  return { props: { user } };
}
