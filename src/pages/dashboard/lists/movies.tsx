import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import Banner from "@components/movieBanner";
import requests from "@components/movieConstants";
import MovieRecList from "@components/movieRecList";
import MovieRow from "@components/movieRow";
import SearchMovie from "@components/searchMovie";
import React, { ReactElement, useEffect, useState } from "react";
import { supabase } from "../../../../client";
export default function Movies(): ReactElement {
  useEffect(() => {}, []);

  const [lists, setLists] = useState([]);

  const [user, setUser] = useState(null);

  async function fetchUser() {
    const profileData = await supabase.auth.user();
    setUser(profileData);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchLists();
      subscribeLists();
      subscribeMedia();
    }
    console.log("hello:", user);
  }, [user]);

  function subscribeLists() {
    console.log("subscribing to movie lists");
    const moviesSubs = supabase
      .from(`movie_recs`)
      .on("*", (payload) => {
        console.log("Change received!", payload);
        fetchLists();
      })
      .subscribe();
  }

  function subscribeMedia() {
    console.log("subscribing to movies");
    const mediaSub = supabase
      .from(`movie`)
      .on("*", (payload) => {
        console.log("Change received!", payload);
        fetchLists();
      })
      .subscribe();
  }

  async function fetchLists() {
    const { data: movie_recs, error } = await supabase
      .from("movie_recs")
      .select(
        `id, title, movie(id, title, image_url, backdrop_url, runtime, release_date, budget, revenue, genres, synopsis, score)`
      )
      .eq("user_id", user.id)
      .order("id", { ascending: true });
    if (error) {
      console.log(error);
    }
    console.log("refetching lists: ", movie_recs);
    setLists(movie_recs);
  }
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index) => {
    setTabIndex(index);
  };
  return (
    <Layout>
      <Box w="100%">
        {/* <Banner /> */}
        <Tabs isFitted index={tabIndex} onChange={handleTabsChange}>
          <TabList>
            <Tab>My Recs</Tab>
            <Tab>Find Movies</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <MovieRecList
                lists={lists}
                user={user}
                fetchLists={fetchLists}
                handleTabsChange={handleTabsChange}
              />
            </TabPanel>
            <TabPanel p={0}>
              <Box>
                <Banner />
                <SearchMovie
                  lists={lists}
                  user={user}
                  fetchLists={fetchLists}
                />
                <Box>
                  {requests.map((m) => (
                    <MovieRow
                      key={m.url}
                      title={m.title}
                      fetchUrl={`https://api.themoviedb.org/3${m.url}`}
                      lists={lists}
                      user={user}
                      fetchLists={fetchLists}
                    />
                  ))}
                </Box>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
}
