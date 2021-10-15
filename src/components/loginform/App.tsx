import { Box, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { Card } from "./Card";
import EmailLoginForm from "./EmailLoginForm";

export default function LoginForm() {
  return (
    <Box
      as="section"
      bgGradient={"linear(to-r, blue.600, purple.600)"}
      py="20"
      height="100%"
    >
      <Card maxW="2xl" mx="auto" textAlign="center">
        <Stack maxW="xs" mx="auto" spacing="8">
          <Stack spacing="3">
            <Heading as="h1" letterSpacing="tight">
              Keep all your favorite movies and recommendations in one place
            </Heading>
            <Text
              fontWeight="medium"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              Login with MagicLink
            </Text>
          </Stack>

          <EmailLoginForm />
        </Stack>
      </Card>
    </Box>
  );
}
