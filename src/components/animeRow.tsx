import { Box, Heading, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MediaCard } from "./mediaCard";
// import "./Row.css";

export default function AnimeRow({
  title,
  fetchUrl,
  lists,
  mediaList,
  createMedia,
}: any) {
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    if (fetchUrl) {
      fetchData();
    }
  }, []);

  async function fetchData() {
    const temp = await fetch(fetchUrl).then((res) => res.json());

    if (temp.anime) {
      setAnime(temp.anime.slice(0, 20));
    }

    return temp;
  }

  return (
    <Box my={2}>
      <Heading textAlign="left" fontSize="2xl">
        {title}
      </Heading>
      <HStack
        spacing={2}
        overflowY="hidden"
        overflowX="scroll"
        css={{
          "&::-webkit-scrollbar": {
            width: " 0.2em",
          },
          "&:: -webkit-scrollbar-track": {
            backgroundColor: "#121129",
            borderRadius: "0px",
          },
          "&:: -webkit-scrollbar-thumb": {
            backgroundColor: "#6c63ff",
            borderRadius: "80px",
          },
        }}
      >
        {fetchUrl && !mediaList ? (
          <>
            {anime.map((show, i) => {
              return (
                <MediaCard
                  key={i}
                  show={show}
                  lists={lists}
                  createMedia={createMedia}
                />
              );
            })}
          </>
        ) : (
          <>
            {mediaList.map((m) => (
              <MediaCard
                key={m.id}
                show={m}
                lists={lists}
                createMedia={createMedia}
              />
            ))}
          </>
        )}
      </HStack>
    </Box>
  );
}
