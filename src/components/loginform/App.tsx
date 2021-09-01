import { Box, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { Card } from "./Card";
import EmailLoginForm from "./EmailLoginForm";
import { Logo } from "./Logo";

export default function LoginForm() {
  return (
    <Box
      as="section"
      bgGradient={{ md: "linear(to-r, blue.600, purple.600)" }}
      py="20"
      height="100%"
    >
      <Card maxW="2xl" mx="auto" textAlign="center">
        <Stack maxW="xs" mx="auto" spacing="8">
          <Logo />
          <Stack spacing="3">
            <Heading as="h1" letterSpacing="tight">
              All your recommendations in one place
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
        <Text
          mt="16"
          fontSize="xs"
          mx="auto"
          maxW="md"
          color={useColorModeValue("gray.600", "gray.400")}
        >
          By continuing, you acknowledge that you have read, understood, and
          agree to our terms and condition
        </Text>
      </Card>
    </Box>
  );
}
