import { CognitoUser } from "@aws-amplify/auth";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useColorModeValue as mode,
  useToast,
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/AuthContext";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  code: string;
}

export default function Signup(): JSX.Element {
  const { user } = useUser();
  const [signUpError, setSignUpError] = useState<string>("");
  const [showCode, setShowCode] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const toast = useToast();

  useEffect(() => {
    if (signUpError) {
      toast({
        title: "Error",
        description: `${signUpError}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [signUpError]);

  const onSubmit = async (data: any) => {
    try {
      if (showCode) {
        confirmSignUp(data);
      } else {
        await signUpWithEmailAndPassword(data);
        setShowCode(true);
      }
    } catch (err) {
      console.error(err);
      setSignUpError(err.message);
    }
  };

  async function signUpWithEmailAndPassword(
    data: IFormInput
  ): Promise<CognitoUser> {
    const { username, password, email } = data;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
        },
      });
      console.log("Signed up a user: ", user);
      return user;
    } catch (error) {
      throw error;
    }
  }
  console.log("The value of the user from the hook is ", user);

  async function confirmSignUp(data: IFormInput) {
    const { username, password, code } = data;
    try {
      await Auth.confirmSignUp(username, code);
      const amplifyUser = await Auth.signIn(username, password);
      console.log("success , signed in a user :", user);
      if (amplifyUser) {
        router.push("/dashboard");
      } else {
        throw new Error("something went wrong :(");
      }
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="4">
        <FormControl id="name" isInvalid={errors.username ? true : false}>
          <FormLabel mb={1}>Username</FormLabel>
          <Input
            autoComplete="name"
            {...register("username", {
              required: {
                value: true,
                message: "Please enter a username",
              },
              minLength: {
                value: 3,
                message: "Please enter a username between 3-16 characters",
              },
              maxLength: {
                value: 16,
                message: "Please enter a username between 3-16 characters",
              },
            })}
          />
          <FormErrorMessage>
            {errors.username ? errors.username.message : null}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="email" isInvalid={errors.email ? true : false}>
          <FormLabel mb={1}>Email</FormLabel>
          <Input
            autoComplete="email"
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Please enter a email",
              },
            })}
          />
          <FormErrorMessage>
            {errors.email ? errors.email.message : null}
          </FormErrorMessage>
        </FormControl>
        <FormControl isValid={errors.password ? true : false}>
          <Flex align="baseline" justify="space-between">
            <FormLabel mb={1}>Password</FormLabel>
            <Box
              as="a"
              href="/forgot"
              fontWeight="semibold"
              fontSize="sm"
              color={mode("blue.600", "blue.200")}
            >
              Forgot Password?
            </Box>
          </Flex>

          <Input
            type="password"
            autoComplete="name"
            {...register("password", {
              required: {
                value: true,
                message: "Please enter a password",
              },
              minLength: {
                value: 8,
                message: "Please enter a stronger password.",
              },
            })}
          />
          <FormErrorMessage>
            {errors.password ? errors.password.message : null}
          </FormErrorMessage>
        </FormControl>

        {showCode && (
          <FormControl isValid={errors.code ? true : false}>
            <Input
              id="code"
              label="Verification Code"
              type="code"
              {...register("code", {
                required: {
                  value: true,
                  message: "Please enter a code",
                },
                minLength: {
                  value: 6,
                  message: "Your verification code is 6 characters long",
                },
                maxLength: {
                  value: 6,
                  message: "Your verification code is 6 characters long",
                },
              })}
            />
            <FormErrorMessage>
              {errors.code ? errors.code.message : null}
            </FormErrorMessage>
          </FormControl>
        )}

        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          {showCode ? "Confirm Code" : "Sign up"}
        </Button>
      </Stack>
    </form>
  );
}
