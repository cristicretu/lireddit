import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { PostsQuery } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostsQuery["posts"]["posts"][0];
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({}) => {
  return (
    <Flex direction="column" align="center">
      <IconButton
        colorScheme="orange"
        aria-label="Upvote Post"
        size="xs"
        icon={<ChevronUpIcon />}
      />
      <Text> {p.points}</Text>
      <IconButton
        colorScheme="orange"
        aria-label="Downvote Post"
        size="xs"
        icon={<ChevronDownIcon />}
      />
    </Flex>
  );
};
