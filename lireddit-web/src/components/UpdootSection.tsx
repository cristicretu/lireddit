import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutationVariables,
} from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [_, vote] = useVoteMutation();
  return (
    <Flex direction="column" align="center">
      <IconButton
        colorScheme="orange"
        onClick={async () => {
          setLoadingState("updoot-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
        aria-label="Upvote Post"
        size="xs"
        isLoading={loadingState === "updoot-loading"}
        icon={<ChevronUpIcon />}
      />
      <Text> {post.points}</Text>
      <IconButton
        colorScheme="orange"
        onClick={async () => {
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        aria-label="Downvote Post"
        size="xs"
        isLoading={loadingState === "downdoot-loading"}
        icon={<ChevronDownIcon />}
      />
    </Flex>
  );
};
