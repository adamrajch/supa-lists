import { Button, FormControl, Input } from "@chakra-ui/react";
import { chakra, useColorModeValue } from "@chakra-ui/system";
import React, { useState } from "react";
import { supabase } from "../../../client";
export default function EmailLoginForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function signIn() {
    if (!email) return;
    const { error, user, session } = await supabase.auth.signIn(
      { email },
      { redirectTo: "localhost:3000/dashboard" }
    );
    console.log(user, session);
    if (error) {
      console.log({ error });
    } else {
      setSubmitted(true);
    }
  }
  return (
    <chakra.form width="full">
      <FormControl>
        <Input
          placeholder="Email address"
          _placeholder={{
            color: useColorModeValue("gray.600", "gray.400"),
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <Button
        mt="3"
        isFullWidth
        fontSize="sm"
        fontWeight="bold"
        colorScheme="gray"
        onClick={() => signIn()}
        isDisabled={submitted ? true : false}
      >
        {submitted ? "Check your email" : "Continue"}
      </Button>
    </chakra.form>
  );
}
