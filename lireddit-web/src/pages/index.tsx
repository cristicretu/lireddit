import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
} from "../generated/graphql";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import React, { useState } from "react";
import { Flex, Heading, Link, Stack, Box, Text } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/react";
import { UpdootSection } from "../components/UpdootSection";
import { NoFragmentCyclesRule } from "graphql";
import { isServer } from "../utils/isServer";
import { DeletePostButton } from "../components/DeletePostButton";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  // const [{ data }] = useMeQuery({
  //   pause: isServer(),
  // });

  // const [, deletePost] = useDeletePostMutation();

  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />
                <Box pl="8px" flex={1}>
                  <NextLink href="post/[id]" as={`post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>{" "}
                    </Link>
                  </NextLink>
                  <Text>posted by {p.creator.username}</Text>
                  <Flex align="center">
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>
                    {/* <IconButton
                    ml="auto"
                    onClick={() => {
                      // deletePost({ id: p.id });
                    }}
                    aria-label="delete post"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                  /> */}
                    <DeletePostButton post={p} />
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
