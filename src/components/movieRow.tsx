import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MovieCardModal } from "./movieCardModal";
import "./movieRow.module.css";

export default function MovieRow({
  title,
  fetchUrl,
  isLargeRow = false,
  lists,
  user,
  fetchLists,
}: any) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(fetchUrl).then((res) => res.json());
      // console.log(request);
      setMovies(request.results);
      return request;
      console.log(request.results[0]);
    }

    fetchData();
  }, [fetchUrl]);

  return (
    <>
      <Box ml="20px">
        <Heading textAlign="left" fontSize="2xl">
          {title}
        </Heading>
        <Flex overflowY="hidden" overflowX="scroll" p="20px">
          {movies.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <MovieCardModal
                  movie={movie}
                  key={movie.id}
                  lists={lists}
                  user={user}
                  fetchLists={fetchLists}
                />
              )
          )}
        </Flex>
      </Box>
    </>
  );
}
