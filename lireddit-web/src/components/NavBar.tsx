import { Box, Center, Flex } from "@chakra-ui/layout";
import { Button, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (fetching) {
    // data loading
  } else if (!data?.me) {
    // not logged in
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={"2"}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    );
  } else {
    // logged in
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button variant="link">Log out</Button>
      </Flex>
    );
  }
  return (
    <Flex bg="teal" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
