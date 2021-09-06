import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import React from "react";
import {
  useMeQuery,
  useDeletePostMutation,
  PostSnippetFragment,
} from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface DeletePostButtonProps {
  post: PostSnippetFragment;
}

export const DeletePostButton: React.FC<DeletePostButtonProps> = ({ post }) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  const [, deletePost] = useDeletePostMutation();

  let body = null;
  if (fetching) {
  } else if (!data?.me) {
  } else if (post.creatorId !== data.me.id) {
  } else {
    body = (
      <IconButton
        ml="auto"
        onClick={() => {
          deletePost({ id: post.id });
        }}
        aria-label="delete post"
        icon={<DeleteIcon />}
        colorScheme="red"
      />
    );
  }
  return body;
};
