import { CloseIcon, Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MovieCardModal } from "./movieCardModal";
export default function SearchMovie(props: any): ReactElement {
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length > 0) {
      searchMovies(query);
    }
  };

  const searchMovies = async (query) => {
    setLoading(true);
    const temp = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
    ).then((res) => res.json());

    if (temp.results) {
      setMovies(temp.results);
    }

    setLoading(false);
  };
  return (
    <Box>
      <Box w={["100%", "50%"]} margin="auto" my={2}>
        <Flex align="center" justify="center">
          <InputGroup size="sm" maxW="70%">
            <InputRightElement>
              <Icon
                as={BsSearch}
                onClick={(e) => handleSearch(e)}
                _hover={{ cursor: "pointer" }}
              />
            </InputRightElement>
            <Input
              rounded="md"
              placeholder="Search movies"
              _placeholder={{
                opacity: 1,
                color: "gray.400",
              }}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
            />
          </InputGroup>

          {query.length > 0 && (
            <Button
              mx={2}
              size="sm"
              leftIcon={<CloseIcon />}
              onClick={() => {
                setQuery(""), setMovies(null);
              }}
              _hover={{ cursor: "pointer" }}
              mr={2}
            >
              Clear
            </Button>
          )}
        </Flex>
      </Box>
      <Box>
        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <Box>
            {movies && movies.length > 0 && (
              <Box ml="20px">
                <Heading textAlign="left" fontSize="2xl">
                  Search Results
                </Heading>
                <Flex overflowY="hidden" overflowX="scroll" p="20px">
                  {movies.map((movie) => {
                    return (
                      <MovieCardModal
                        key={movie.id}
                        movie={movie}
                        isLargeRow
                        lists={props.lists}
                        user={props.user}
                        fetchLists={props.fetchLists}
                      />
                    );
                  })}
                </Flex>
              </Box>
            )}
            {movies && movies.length == 0 && (
              <Box>No results found, try a different search</Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
