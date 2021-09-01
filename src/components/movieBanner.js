import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import requests from "./movieConstants";

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const baseUrl = "https://api.themoviedb.org/3";
  const bannerUrl = baseUrl + requests[0].url;

  useEffect(() => {
    async function fetchData() {
      const temp = await fetch(bannerUrl).then((res) => res.json());

      setMovie(
        temp.results[Math.floor(Math.random() * temp.results.length - 1)]
      );
      return temp;
    }

    fetchData();
  }, []);

  console.log(movie);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <Box
      pos="relative"
      h="448px"
      objectFit="contain"
      bgSize="cover"
      bgImage={`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`}
      bgPos="center center"
      textAlign="left"
    >
      <Box ml="60px" pt="180px" h="190px">
        <Heading
          fontSize="3.5rem"
          fontWeight="extrabold"
          pb="0.3rem"
          textShadow="white 0px 0px 2px"
        >
          {movie?.title || movie?.name || movie?.original_name}
        </Heading>
        <Button>Add To List</Button>
        <Text
          w="45rem"
          lineHeight="1.3"
          pt="1rem"
          fontSize="1.4rem"
          maxW="660px"
          h="80px"
          textShadow="white 0px 0px 2px"
        >
          {truncate(movie?.overview, 150)}
        </Text>
      </Box>
      <Box
        pos="absolute"
        bottom="0"
        height="10rem"
        w="100%"
        bgGradient="linear(to-t, #111, rgba(37, 37, 37, 0.6), transparent)"
      />
    </Box>
  );
}
