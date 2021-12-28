import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../client";
export default function EmailLoginForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  async function signIn(e) {
    e.preventDefault();
    if (!email) return;

    const { error, user, session } = await supabase.auth.signIn(
      { email },
      { redirectTo: "https://supa-lists.vercel.app/dashboard" }
    );
    console.log(user, session, error);
    if (error) {
      console.log("errorMessage: ", error.message);
      setError(error.message);
    } else {
      setSubmitted(true);
      setError(null);
    }
  }
  function handleChange(e) {
    e.preventDefault();

    setEmail(e.target.value);
  }

  useEffect(() => {
    console.log("error change:", error);
    console.log(error);
  }, [error]);
  return (
    <form>
      <FormControl>
        <Input
          type="email"
          placeholder="Email address"
          _placeholder={{
            color: useColorModeValue("gray.600", "gray.400"),
          }}
          value={email}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => e.key === "Enter" && signIn(e)}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
      <Text textAlign="left" color="red.400" fontSize="sm">
        {error}
      </Text>
      <Button
        mt="3"
        isFullWidth
        fontSize="sm"
        fontWeight="bold"
        colorScheme="teal"
        onClick={(e) => signIn(e)}
        isDisabled={submitted ? true : false}
      >
        {submitted ? "Check your email" : "Continue"}
      </Button>
    </form>
  );
}
