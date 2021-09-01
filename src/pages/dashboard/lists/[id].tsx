// posts will be populated at build time by getStaticProps()

import { supabase } from "../../../../client";

export default function IndividualList({ user }: any) {
  console.log(user);
  return <div>{user}</div>;
}

export async function getServerSideProps({ req, params }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  //   const user = await supabase.auth.user();
  console.log(user);
  //   if (!user) {
  //     return {
  //       props: {},
  //       redirect: { destination: "/dashboard/lists", permanent: false },
  //     };
  //   }
  //   const lists = await supabase.from("lists").select().eq("user_id", user.id);
  return {
    props: {
      user,
    },
  };
}
